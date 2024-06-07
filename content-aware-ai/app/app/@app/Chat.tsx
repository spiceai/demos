'use client';

import { Message, type CoreMessage } from 'ai';
import { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useChat } from 'ai/react';
import { Loader2 } from 'lucide-react';
import type { SpiceAssistantRsult } from '../api/chat/route';
import { useConversationMessages } from './Messages';
import {
  MessageComponent,
  MessageSkeleton,
} from '@/components/message-component';
import { useAnimationStore } from '@/lib/store';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export function Chat({ accelerated }: { accelerated: boolean }) {
  const { messages, setMessages, append, input, setInput } = useChat({
    maxToolRoundtrips: 0,
    onToolCall: ({ toolCall }) => {
      console.log(toolCall);
    },
    onFinish: () => {
      store.setAnimatedEdge('e-openai', false);
    },
  });

  const [showCompletions, setShowCompletions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<
    number | undefined | null
  >();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const store = useAnimationStore();

  const { messages: preloadedMessages, loading } = useConversationMessages(
    'archive',
    accelerated,
  );

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, preloadedMessages]);

  async function submit() {
    if (input.toLowerCase().startsWith('@pepperai')) {
      store.setAnimatedEdge('e-openai', true);
      // store.setAnimatedEdge('spice', true);

      append({
        content: input,
        role: 'user',
      });
      setInput('');
    } else {
      const newMessages: Message[] = [
        ...messages,
        {
          content: input,
          role: 'user',
        } as any,
      ];
      setMessages(newMessages);
      setInput('');
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (
      (event.key === 'Enter' && event.metaKey) ||
      (event.key === 'Enter' && event.ctrlKey)
    ) {
      event.preventDefault();
      submit();
    }
  }

  function onInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    setInput(value);

    const cursorPos = textareaRef.current?.selectionStart;
    setCursorPosition(cursorPos);

    if (cursorPos !== undefined && cursorPos !== null && value.includes('@')) {
      const atIndex = value.lastIndexOf('@', cursorPos - 1);
      if (atIndex === cursorPos - 1) {
        setShowCompletions(true);
      } else {
        setShowCompletions(false);
      }
    }
  }

  function onCompletionSelect(completion: string) {
    const value = input;
    const atIndex = value.lastIndexOf('@', (cursorPosition || 0) - 1);
    const newText = `${value.slice(0, atIndex + 1)}${completion} ${value.slice(
      cursorPosition || 0,
    )}`;
    setInput(newText);
    setShowCompletions(false);
  }

  return (
    <div className="grow min-w-0 overflow-hidden flex flex-col">
      <div
        className="h-full overflow-y-auto py-4 space-y-4"
        ref={chatContainerRef}
      >
        {loading ? (
          <>
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
          </>
        ) : null}

        {(preloadedMessages || []).map((message: any, i) => (
          <MessageComponent
            key={i}
            avatar={
              <Avatar>
                <AvatarImage src={`https://robohash.org/${message.user}.png`} />
              </Avatar>
            }
            header={
              <span className="text-secondary-foreground text-xs">
                {/* @ts-ignore */}
                {/* {dayjs(message.timestamp).format('YYYY-MM-DD hh:mm')} */}
              </span>
            }
            content={message.answer}
          />
        ))}

        {(messages || []).map((m, i) => (
          <MessageComponent
            key={i}
            avatar={
              <Avatar>
                {m.role === 'user' ? (
                  <AvatarImage src="https://avatars.githubusercontent.com/u/23766767?v=4" />
                ) : (
                  <div className="text-center bg-red-200 text-3xl flex flex-col justify-center items-center w-full h-full">
                    🌶️
                  </div>
                )}
              </Avatar>
            }
            header={m.role === 'user' ? 'Jack' : '@Pepper AI'}
            content={m.content as string}
          >
            {m.toolInvocations?.slice(-1).map((invocation) => {
              const toolCallId = invocation.toolCallId;

              if (invocation.toolName === 'spiceAssist') {
                return (
                  <div key={toolCallId} className="flex items-center gap-2">
                    {'result' in invocation ? (
                      <span className="text-primary">
                        {invocation.result.text}
                      </span>
                    ) : (
                      <>
                        <span className="text-muted-foreground">
                          Searching in datasets:
                        </span>
                        <Loader2 className="size-4 animate-spin text-muted-foreground" />
                      </>
                    )}
                  </div>
                );
              }

              if (invocation.toolName === 'searchInDecisions') {
                return (
                  <div key={toolCallId} className="flex items-center gap-2">
                    {'result' in invocation ? (
                      <SpiceAssitanceCard result={invocation.result} />
                    ) : (
                      <>
                        <span className="text-muted-foreground">
                          Searching in sources:
                        </span>
                        <Loader2 className="size-4 animate-spin text-muted-foreground" />
                      </>
                    )}
                  </div>
                );
              }

              if (invocation.toolName === 'summarizeConversation') {
                return (
                  <div key={toolCallId} className="flex items-center gap-2">
                    {'result' in invocation ? (
                      invocation.result
                    ) : (
                      <>
                        <span className="text-muted-foreground">
                          Sumarizing:
                        </span>
                        <Loader2 className="size-4 animate-spin text-muted-foreground" />
                      </>
                    )}
                  </div>
                );
              }

              return invocation.toolName;
            })}
          </MessageComponent>
        ))}
      </div>

      <div className="flex-shrink-0 min-w-0 w-full min-h-0 pb-4 px-4 text-xl ">
        <form className="relative" action={submit}>
          <DropdownMenu
            open={showCompletions}
            onOpenChange={setShowCompletions}
            modal={false}
          >
            <DropdownMenuTrigger className="absolute" />
            <DropdownMenuContent
              align="start"
              alignOffset={10}
              side="top"
              sideOffset={4}
            >
              <DropdownMenuItem
                onSelect={() => {
                  onCompletionSelect('PepperAI');
                  textareaRef.current?.focus();
                }}
              >
                🌶️ @PepperAI
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Textarea
            ref={textareaRef}
            className="resize-none text-xl"
            value={input}
            placeholder="Say something..."
            onChange={onInputChange}
            onKeyDown={onKeyDown}
          />

          <Button
            className="absolute right-1 bottom-1 gap-1 text-muted-foreground transition-all hover:text-primary text-lg"
            variant="ghost"
            type="submit"
          >
            <PaperAirplaneIcon className="size-6" />
            <span className="font-normal text-xl">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

const SpiceAssitanceCard = ({ result }: { result: SpiceAssistantRsult }) => {
  console.log(result);
  return (
    <div className="flex flex-col gap-2">
      <div>{result.text}</div>

      {result.from
        ? Object.keys(result.from).map((from) => {
            const entries = result.from[from];
            return (
              <div key={from} className="flex flex-col gap-1">
                {from}:
                <div className="grid gap-1 grid-cols-3">
                  {entries.map((entry, i) => (
                    <div
                      className="border rounded-lg shadow-sm p-2 text-xs max-h-24 text-ellipsis min-w-0 overflow-hidden"
                      key={i}
                    >
                      {entry.content}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};
