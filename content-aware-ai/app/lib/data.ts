export interface Conversation {
  id: string;
  title: string;
  dataset: string;
}

export const conversations: Record<string, Conversation> = {
  conversation1: {
    id: "conversation1",
    title: "Conversation 1 (slow 🐢)",
    dataset: "federated_dataset",
  },
  conversation2: {
    id: "conversation2",
    title: "Conversation 2 (fast 🚀)",
    dataset: "accelerated_dataset",
  },
};
