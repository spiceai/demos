'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MegaphoneIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import {
  MessageComponent,
  MessageSkeleton,
} from '@/components/message-component';
import { useAnimationStore } from '@/lib/store';
import { conversations } from '@/lib/data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function useConversationMessages(
  conversation: string,
  accelerated?: boolean,
  edge_ids?: string[],
) {
  const store = useAnimationStore();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);

  const updateAnimation = useCallback(
    (v: boolean) => {
      if (!accelerated) {
        const list =
          (edge_ids ? edge_ids : conversations[conversation]?.edge_ids) || [];
        list?.forEach((id) => {
          store.setAnimatedEdge(id, v);
        });
      } else {
        store.setAnimatedEdge('e-spice', v);
      }
    },
    [conversation, edge_ids, accelerated],
  );

  useEffect(() => {
    store.reset();
    store.startTimer();
    updateAnimation(true);
    setMessages([]);
    setLoading(true);
    fetch(`/api/conversations/${conversation}?accelerated=${accelerated}`, {
      signal: store.controller?.signal,
    })
      .then((r) => r.json())
      .then((response: any[]) => {
        setLoading(false);
        setMessages(response);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return;
        }
      })
      .finally(() => {
        setLoading(false);
        // updateAnimation(false);
        store.reset();
      });
  }, [conversation]);

  return { messages, loading };
}

export const Messages = ({
  conversation,
  accelerated,
}: {
  conversation: string;
  accelerated?: boolean;
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { messages, loading } = useConversationMessages(
    conversation,
    accelerated,
  );

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="py-4 flex gap-4 flex-col-reverse">
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
      </div>
    );
  }

  return (
    <div className="grow min-w-0 overflow-hidden flex flex-col">
      <div
        className="h-full overflow-y-auto py-4 space-y-4"
        ref={chatContainerRef}
      >
        {(messages || []).map((message: any, i) => (
          <MessageComponent
            key={i}
            avatar={
              <Avatar>
                <AvatarFallback>
                  <MegaphoneIcon className="size-6" />
                </AvatarFallback>
              </Avatar>
            }
            header={
              <span className="text-secondary-foreground text-xs">
                {/* @ts-ignore */}
                {dayjs(message.timestamp).format('YYYY-MM-DD hh:mm')}
              </span>
            }
            content={message.answer}
          />
        ))}
      </div>
    </div>
  );
};
