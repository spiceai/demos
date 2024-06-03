export interface Thread {
  id: string;
  title: string;
  dataset: string;
}

export const threads: Record<string, Thread> = {
  thread1: {
    id: 'thread1',
    title: 'Thread 1 (slow 🐢)',
    dataset: 'federated_dataset',
  },
  thread2: {
    id: 'thread2',
    title: 'Thread 2 (fast 🚀)',
    dataset: 'accelerated_dataset',
  },
};
