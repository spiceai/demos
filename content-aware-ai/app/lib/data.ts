export interface Conversation {
  id: string;
  title: string;
  type: 'conversation' | 'channel';
  sql?: string;
  sql_accelerated?: string;
  states: string[];
  edge_ids: string[];
}

export const conversations: Record<string, Conversation> = {
  daily_journal: {
    id: 'daily_journal',
    title: 'daily-journal',
    type: 'channel',
    sql: `SELECT id, timestamp, question, answer FROM daily_journal order by "timestamp" desc limit 1000`,
    sql_accelerated: `SELECT id, timestamp, question, answer FROM daily_journal_accelerated order by "timestamp" desc limit 1000`,
    states: ['0', '1', '2', '3', '4', '5'],
    edge_ids: ['e-datalake', 'e-spice'],
  },
  archive: {
    id: 'archive',
    title: 'archive',
    type: 'conversation',
    sql: `select ts, "user", text as answer from messages where text is not null and channel_id = 'C0170U650CQ' limit 100`,
    sql_accelerated: `select ts, "user", text as answer from messages_accelerated where text is not null and channel_id = 'C0170U650CQ' limit 100`,
    states: ['0', '1', '2', '3', '4', '5'],
    edge_ids: ['e-postgres', 'e-spice'],
  },
  general: {
    id: 'general',
    title: 'general',
    type: 'conversation',
    states: ['0', '1', '2', '3', '4', '5'],
    edge_ids: ['e-postgres', 'e-spice'],
  },
};
