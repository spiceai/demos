import {
  InboxIcon,
  ChatBubbleLeftIcon,
  HashtagIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { conversations } from "@/lib/data";
import { Chat } from "./Chat";
import { Messages } from "@/components/Messages";

interface Params {
  params: {
    conversation: string;
  };
}

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Home({ params }: Params) {
  const currentConversation = conversations[params.conversation];

  if (!currentConversation) {
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
      <aside className="border-r min-w-[280px] flex flex-col overflow-hidden bg-secondary">
        <div className="h-full overflow-y-auto p-4 flex gap-2 flex-col">
          <span className="font-semibold text-muted-foreground">
            Conversations
          </span>
          <nav className="flex flex-col items-start font-medium">
            {Object.values(conversations).map((conversation) => (
              <Link
                key={conversation.id}
                href={`/${conversation.id}`}
                prefetch={false}
                className={cn(
                  "flex items-center rounded-lg px-2 py-1 gap-2",
                  params.conversation === conversation.id
                    ? "text-primary"
                    : "text-muted-foreground transition-all hover:text-primary",
                )}
              >
                {conversation.type === "channel" ? (
                  <MegaphoneIcon className="size-4" />
                ) : (
                  <HashtagIcon className="size-4" />
                )}
                {conversation.title}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {currentConversation?.type === "conversation" ? (
        <Chat />
      ) : (
        <Messages dataset={currentConversation.dataset} />
      )}

      {/* <div className="grow min-w-0 h-full overflow-hidden flex flex-col">
        <div className="h-full overflow-y-auto">

          <Messages dataset={currentConversation.dataset} />
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
       */}
    </main>
  );
}
