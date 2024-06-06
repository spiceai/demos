export interface Conversation {
  id: string;
  title: string;
  type: "conversation" | "channel";
  sql?: string;
  sql_accelerated?: string;
}

export const conversations: Record<string, Conversation> = {
  daily_journal: {
    id: "daily_journal",
    title: "daily-journal",
    type: "channel",
    sql: `SELECT id, timestamp, question, answer FROM daily_journal order by "timestamp" desc limit 1000`,
    sql_accelerated: `SELECT id, timestamp, question, answer FROM daily_journal_accelerated order by "timestamp" desc limit 1000`,
  },
  archive: {
    id: "archive",
    title: "archive",
    type: "channel",
    sql: `select ts, "user", text as answer from messages where text is not null limit 100`,
    sql_accelerated: `select ts, "user", text as answer from messages_accelerated where text is not null limit 100`,
  },
  general: {
    id: "general",
    title: "general",
    type: "conversation",
  },
};
