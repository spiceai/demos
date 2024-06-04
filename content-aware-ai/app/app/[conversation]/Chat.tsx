'use client';

import { type CoreMessage } from 'ai';
import { readStreamableValue } from 'ai/rsc';
import { useState, useEffect, useRef } from 'react';
import { continueConversation } from './actions';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UserIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Chat() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState('');
  const [showCompletions, setShowCompletions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<
    number | undefined | null
  >();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  async function submit() {
    const newMessages: CoreMessage[] = [
      ...messages,
      { content: input, role: 'user' },
    ];

    setMessages(newMessages);
    setInput('');

    if (input.toLowerCase().startsWith('@pepperai')) {
      const result = await continueConversation(newMessages);

      for await (const content of readStreamableValue(result)) {
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            content: content as string,
          },
        ]);
      }
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
      cursorPosition || 0
    )}`;
    setInput(newText);
    setShowCompletions(false);
  }

  return (
    <div className='grow min-w-0 h-full overflow-hidden flex flex-col'>
      <div
        className='h-full overflow-y-auto py-4 space-y-4'
        ref={chatContainerRef}
      >
        {messages.map((m, i) => (
          <div key={i} className='px-4 flex items-center gap-3'>
            <div
              className={cn(
                'size-10 self-start text-2xl text-center bg-secondary border rounded-xl flex-shrink-0 flex items-center justify-center',
                m.role === 'user' ? 'bg-blue-200' : 'bg-red-200'
              )}
            >
              {m.role === 'user' ? <UserIcon className='size-6' /> : '🌶️'}
            </div>
            <div>
              <div className='font-semibold text-sm'>
                {m.role === 'user' ? 'User' : '@Pepper AI'}
              </div>
              <div className='whitespace-pre-wrap'>{m.content as string}</div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex-shrink-0 min-w-0 w-full min-h-0 pb-4 px-4 text-xl'>
        <form className='relative' action={submit}>
          <DropdownMenu
            open={showCompletions}
            onOpenChange={setShowCompletions}
            modal={false}
          >
            <DropdownMenuTrigger></DropdownMenuTrigger>
            <DropdownMenuContent
              align='start'
              alignOffset={10}
              side='top'
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
            className='resize-none text-lg'
            value={input}
            placeholder='Say something...'
            onChange={onInputChange}
            onKeyDown={onKeyDown}
          />

          <Button
            className='absolute right-1 bottom-1 gap-1 text-muted-foreground transition-all hover:text-primary text-lg'
            variant='ghost'
            type='submit'
          >
            <PaperAirplaneIcon className='size-6' />
            <span className='font-normal'>Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
