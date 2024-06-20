export interface Conversation {
  id: string;
  title: string;
  type: 'conversation' | 'channel';
  sql?: string;
  sql_accelerated?: string;
  states: string[];
  edge_ids: string[];
  artifial_delay?: number;
}

export const conversations: Record<string, Conversation> = {
  daily_journal: {
    id: 'daily_journal',
    title: 'daily-journal',
    type: 'channel',
    sql: `SELECT id, timestamp, question, answer FROM daily_journal order by "timestamp" desc limit 1000`,
    sql_accelerated: `SELECT id, timestamp, question, answer FROM daily_journal_accelerated order by "timestamp" desc limit 1000`,
    states: ['0', '1', '2', '3', '4', '5', '6'],
    edge_ids: ['e-postgres', 'e-spice'],
  },
  archive: {
    id: 'archive',
    title: 'archive',
    type: 'conversation',
    sql: `
    select username, text from general
    union all
    select "user" as username, text from messages
    where text is not null limit 1000`,
    sql_accelerated: `
    select username, text from general_accelerated
    union all
    select "user" as username, text from messages_accelerated
    where text is not null limit 1000`,
    states: ['2', '3', '4', '5', '6'],
    edge_ids: ['e-datalake', 'e-postgres', 'e-spice'],
    artifial_delay: 8000,
  },
  general: {
    id: 'general',
    title: 'general',
    type: 'conversation',
    sql: `select username, text from general`,
    sql_accelerated: `select username, text from general_accelerated`,
    states: ['0', '1', '2', '3', '4', '5', '6'],
    edge_ids: ['e-postgres', 'e-spice'],
    artifial_delay: 1700,
  },
};
