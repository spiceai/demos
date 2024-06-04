export interface Conversation {
  id: string;
  title: string;
  dataset: string;
  type: "conversation" | "channel";
  sql?: string;
}

export const conversations: Record<string, Conversation> = {
  daily_journal: {
    id: "daily_journal",
    title: "daily-journal",
    dataset: "daily_journal",
    type: "channel",
    sql: `SELECT id, timestamp, question, answer FROM daily_journal order by "timestamp" desc limit 400`,
  },
  conversation1: {
    id: "conversation1",
    title: "archive (slow 🐢)",
    dataset: "federated_dataset",
    type: "conversation",
  },
  conversation2: {
    id: "conversation2",
    title: "general (fast 🚀)",
    dataset: "accelerated_dataset",
    type: "conversation",
  },
};
