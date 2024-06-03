"use client";

import { type CoreMessage } from "ai";
import { readStreamableValue } from "ai/rsc";
import { useState, useEffect, useRef } from "react";
import { continueConversation } from "./actions";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UserIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export function Chat() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState("");
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
      { content: input, role: "user" },
    ];

    setMessages(newMessages);
    setInput("");

    if (input.toLowerCase().startsWith("@pepperai")) {
      const result = await continueConversation(newMessages);

      for await (const content of readStreamableValue(result)) {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: content as string,
          },
        ]);
      }
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (
      (event.key === "Enter" && event.metaKey) ||
      (event.key === "Enter" && event.ctrlKey)
    ) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <div className="grow min-w-0 h-full overflow-hidden flex flex-col">
      <div
        className="h-full overflow-y-auto py-4 space-y-4"
        ref={chatContainerRef}
      >
        {messages.map((m, i) => (
          <div key={i} className="px-4 flex items-center gap-3">
            <div
              className={cn(
                "size-10 self-start text-2xl text-center bg-secondary border rounded-xl flex-shrink-0 flex items-center justify-center",
                m.role === "user" ? "bg-blue-200" : "bg-amber-500",
              )}
            >
              {m.role === "user" ? <UserIcon className="size-6" /> : "🤖"}
            </div>
            <div>
              <div className="font-semibold text-sm">
                {m.role === "user" ? "User: " : "@Pepper AI"}
              </div>
              <div className="whitespace-pre-wrap">{m.content as string}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-shrink-0 min-w-0 w-full min-h-0 pb-4 px-4">
        <form className="relative" action={submit}>
          <Textarea
            className="resize-none"
            value={input}
            placeholder="Say something..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <Button
            className="absolute right-1 bottom-1 gap-1 text-muted-foreground transition-all hover:text-primary"
            size="sm"
            variant="ghost"
            type="submit"
          >
            <PaperAirplaneIcon className="size-4" />
            <span className="font-normal">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
