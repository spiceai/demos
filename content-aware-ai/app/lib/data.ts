export interface Thread {
  id: string;
  title: string;
  dataset: string;
}

export const threads: Record<string, Thread> = {
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
