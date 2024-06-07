'use client';

import { HashtagIcon, MegaphoneIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { conversations } from '@/lib/data';
import { Chat } from './Chat';
import { Messages } from './Messages';
import { Input } from '@/components/ui/input';
import { slides } from '../@slides/slides';

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
  const slide = slides[state] || slides['0'];

  const currentConversation =
    conversations[conversationId] || Object.values(conversations)[0];

  if (slide.fullscreen) {
    return null;
  }

  return (
    <div className="px-4 pt-4 pb-4 grow flex row items-stretch justify-center min-w-0 min-h-0">
      <div className="border rounded-lg overflow-hidden grow flex flex-col shadow-xl max-w-6xl">
        <main className="flex grow row items-stretch overflow-hidden min-h-0 min-w-0">
          <aside className="border-r min-w-[280px] flex flex-col overflow-hidden bg-secondary py-4 gap-4 bg-gray-900 text-white dark">
            <div className="px-4 text-xl font-semibold">🌶️ Spicy Chat</div>

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
                        'flex items-center rounded-lg px-2 py-1 gap-2 text-xl',
                        conversationId === conversation.id
                          ? 'text-primary font-semibold'
                          : 'text-muted-foreground transition-all hover:text-primary',
                      )}
                    >
                      {conversation.type === 'channel' ? (
                        <MegaphoneIcon className="size-5" />
                      ) : (
                        <HashtagIcon className="size-5" />
                      )}
                      {conversation.title}
                    </Link>
                  ))}
              </nav>
              <div className="grow" />
              <div className="text-muted-foreground">using mode: {state}</div>
            </div>
          </aside>

          <div className="h-full grow flex flex-col overflow-hidden min-w-0 bg-[#1e293b]">
            <div className="dark bg-secondary text-white p-3 flex items-center justify-center">
              <Input className="h-8 w-96" placeholder="Search Spicy Chat" />
            </div>

            <div className="grow w-full bg-white light overflow-hidden flex flex-col min-w-0 rounded-tl-lg">
              {currentConversation?.type === 'conversation' ? (
                <Chat
                  key={currentConversation.id}
                  conversation={currentConversation.id}
                  accelerated={!!slide.accelerated}
                  augmented={!!slide.augmented}
                />
              ) : (
                <Messages
                  conversation={conversationId}
                  accelerated={state !== '0' && state !== '1'}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
