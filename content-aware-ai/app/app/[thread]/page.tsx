import { PaperAirplaneIcon, InboxIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Params {
  params: {
    thread: string;
  };
}

interface Thread {
  id: string;
  title: string;
  dataset: string;
}

const threads: Record<string, Thread> = {
  thread1: {
    id: "thread1",
    title: "Thread 1 (slow 🐢)",
    dataset: "dataset1",
  },
  thread2: {
    id: "thread2",
    title: "Thread 2 (fast 🚀)",
    dataset: "dataset2",
  },
};

export default function Home({ params }: Params) {
  const currentThread = threads[params.thread];

  if (!currentThread) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <InboxIcon className="size-8 text-muted-foreground" />
          <span className="text-lg font-semibold text-muted-foreground">
            Select a thread
          </span>
        </div>
      </div>
    );
  }

  return (
    <main className="flex h-screen row items-stretch">
      <aside className="border-r min-w-[220px] flex flex-col overflow-hidden">
        <div className="h-full overflow-y-auto p-4 flex gap-2 flex-col">
          <span className="font-semibold text-sm text-muted-foreground">
            Threads
          </span>
          <nav className="flex flex-col items-start text-sm font-medium">
            {Object.values(threads).map((thread) => (
              <Link
                key={thread.id}
                href={`/${thread.id}`}
                className={cn(
                  "flex items-center rounded-lg px-2 py-1 gap-1  text-sm",
                  params.thread === thread.id
                    ? "text-primary"
                    : "text-muted-foreground transition-all hover:text-primary",
                )}
              >
                # {thread.title}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <div className="grow min-w-0 h-full overflow-hidden flex flex-col">
        <div className="h-full overflow-y-auto">
          <Suspense
            fallback={
              <div className="p-4 flex flex-col gap-4">
                <Skeleton className="h-8 w-32 rounded-md" />
                <Skeleton className="h-8 w-32 rounded-md" />
                <Skeleton className="h-8 w-32 rounded-md" />
                <Skeleton className="h-8 w-32 rounded-md" />
                <Skeleton className="h-8 w-32 rounded-md" />
                <Skeleton className="h-8 w-32 rounded-md" />
                <Skeleton className="h-8 w-32 rounded-md" />
              </div>
            }
          >
            <Messages dataset={currentThread.dataset} />
          </Suspense>
        </div>

        <div className="flex-shrink-0 min-w-0 w-full min-h-0 pb-4 px-4">
          <form className="relative">
            <Textarea className="resize-none" />
            <Button
              className="absolute right-1 bottom-1 gap-1 text-muted-foreground transition-all hover:text-primary"
              size="sm"
              variant="ghost"
              type="submit"
            >
              <PaperAirplaneIcon className="size-4" />
              <span className="text-xs font-normal">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

async function Messages({ dataset }: { dataset: string }) {
  const hash = Math.random().toString(36).substring(7);
  const request = await fetch("http://localhost:3001/v1/sql", {
    method: "POST",
    body: `SELECT * FROM ${dataset} limit 50`,
    cache: "no-store",
  });

  const response = (await request.json()) as any[];

  return response.map((message: any, i) => (
    <div key={i} className="px-4 py-8 text-xs">
      <pre className="whitespace-pre  ">{JSON.stringify(message, null, 2)}</pre>
    </div>
  ));
}
