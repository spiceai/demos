"use client";

import * as dayjs from "dayjs";
import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { MegaphoneIcon } from "@heroicons/react/24/outline";

function useConversationMessages(conversation: string, accelerated?: boolean) {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setMessages([]);
    setLoading(true);
    fetch(`/api/conversations/${conversation}?accelerated=${accelerated}`)
      .then((r) => r.json())
      .then((response: any[]) => {
        setLoading(false);
        setMessages(response);
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
      <div className="p-4 flex flex-col gap-4">
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
      </div>
    );
  }

  return (
    <div className="grow min-w-0 h-full overflow-hidden flex flex-col">
      <div
        className="h-full overflow-y-auto py-4 space-y-4"
        ref={chatContainerRef}
      >
        {(messages || []).map((message: any, i) => (
          <div key={i} className="px-4 flex items-center gap-3">
            <div className="size-10 self-start text-2xl text-center bg-secondary border rounded-xl flex-shrink-0 flex items-center justify-center">
              <MegaphoneIcon className="size-6" />
            </div>
            <div>
              <div className="font-semibold text-sm">
                <span className="text-secondary-foreground text-xs">
                  {/* @ts-ignore */}
                  {dayjs(message.timestamp).format("YYYY-MM-DD hh:mm")}
                </span>
              </div>
              <div className="whitespace-pre-wrap">{message.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
