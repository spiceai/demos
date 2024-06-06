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
import { MessageComponent } from '@/components/message-component';
import { useAnimationStore } from '@/lib/store';

export function Chat() {
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

  const { messages: preloadedMessages } = useConversationMessages(
    'archive',
    true,
  );

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
    <div className="grow min-w-0 h-full overflow-hidden flex flex-col">
      <div
        className="h-full overflow-y-auto py-4 space-y-4"
        ref={chatContainerRef}
      >
        {(preloadedMessages || []).map((message: any, i) => (
          <div key={i} className="px-4 flex items-center gap-3">
            <div className="size-10 self-start text-2xl text-center bg-secondary border rounded-xl flex-shrink-0 flex items-center justify-center">
              <img src={`https://robohash.org/${message.user}.png`} />
              {/* <MegaphoneIcon className="size-6" /> */}
            </div>
            <div className=" max-w-full overflow-hidden">
              <div className="font-semibold text-sm">
                <span className="text-secondary-foreground text-xs">
                  {message.username}
                </span>
              </div>
              <div className="whitespace-pre-wrap">{message.answer}</div>
            </div>
          </div>
        ))}

        {(messages || []).map((m, i) => (
          <MessageComponent
            key={i}
            avatar={
              <div
                className={cn(
                  'size-10 self-start text-2xl overflow-hidden text-center bg-secondary border rounded-xl flex-shrink-0 flex items-center justify-center',
                  m.role === 'user' ? 'bg-blue-200' : 'bg-red-200',
                )}
              >
                {m.role === 'user' ? (
                  <img src="https://avatars.githubusercontent.com/u/23766767?v=4" />
                ) : (
                  '🌶️'
                )}
              </div>
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

      <div className="flex-shrink-0 min-w-0 w-full min-h-0 pb-4 px-4 text-xl">
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
            className="resize-none text-lg"
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
            <span className="font-normal">Send</span>
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
