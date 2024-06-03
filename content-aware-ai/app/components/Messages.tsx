"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function useThreadMessages(thread: string) {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/threads/${thread}`)
      .then((r) => r.json())
      .then((response: any[]) => {
        setLoading(false);
        setMessages(response);
      });
  }, [thread]);

  return { messages, loading };
}

export const Messages = ({ dataset }: { dataset: string }) => {
  const { messages, loading } = useThreadMessages(dataset);

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

  return messages.map((message: any, i) => (
    <div key={i} className="px-4 py-8">
      <pre className="whitespace-pre">{JSON.stringify(message, null, 2)}</pre>
    </div>
  ));
};
