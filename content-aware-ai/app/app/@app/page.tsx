'use client';

import { HashtagIcon, MegaphoneIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { conversations } from '@/lib/data';
import { Chat } from './Chat';
import { Messages } from './Messages';

interface Params {
  searchParams: {
    conversation: string;
    state: string;
  };
}

export const dynamic = 'force-dynamic';
// Allow streaming responses up to 300 seconds
export const maxDuration = 300;

export default function Home({
  searchParams: { conversation: conversationId, state },
}: Params) {
  const currentConversation =
    conversations[conversationId] || Object.values(conversations)[0];

  return (
    <main className="flex grow row items-stretch overflow-hidden min-h-0 min-w-0">
      <aside className="border-r min-w-[280px] flex flex-col overflow-hidden bg-secondary py-4 gap-4">
        <div className="px-4 text-lg font-semibold">🌶️ Spicy Chat</div>

        <div className="h-full overflow-y-auto px-4 flex gap-2 flex-col">
          <nav className="flex flex-col items-start font-medium">
            {Object.values(conversations)
              .filter((c) => c.states.includes(state))
              .map((conversation) => (
                <Link
                  key={conversation.id}
                  href={`?conversation=${conversation.id}&state=${state}`}
                  prefetch={false}
                  className={cn(
                    'flex items-center rounded-lg px-2 py-1 gap-2',
                    conversationId === conversation.id
                      ? 'text-primary'
                      : 'text-muted-foreground transition-all hover:text-primary',
                  )}
                >
                  {conversation.type === 'channel' ? (
                    <MegaphoneIcon className="size-4" />
                  ) : (
                    <HashtagIcon className="size-4" />
                  )}
                  {conversation.title}
                </Link>
              ))}
          </nav>
          <div className="grow" />
          <div className="text-muted-foreground">using mode: {state}</div>
        </div>
      </aside>

      {currentConversation?.type === 'conversation' ? (
        <Chat />
      ) : (
        <Messages
          conversation={conversationId}
          accelerated={state !== '0' && state !== '1'}
        />
      )}
    </main>
  );
}
