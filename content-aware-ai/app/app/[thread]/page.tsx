import { PaperAirplaneIcon, InboxIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { threads } from "@/lib/data";
import { Messages } from "@/components/Messages";

interface Params {
  params: {
    thread: string;
  };
}

export const dynamic = "force-dynamic";

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
      <aside className="border-r min-w-[220px] flex flex-col overflow-hidden bg-secondary">
        <div className="h-full overflow-y-auto p-4 flex gap-2 flex-col">
          <span className="font-semibold text-muted-foreground">Threads</span>
          <nav className="flex flex-col items-start font-medium">
            {Object.values(threads).map((thread) => (
              <Link
                key={thread.id}
                href={`/${thread.id}`}
                prefetch={false}
                className={cn(
                  "flex items-center rounded-lg px-2 py-1 gap-1",
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
          <Messages dataset={currentThread.dataset} />
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
              <span className="font-normal">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
