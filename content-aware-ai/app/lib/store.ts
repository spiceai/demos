import { create } from 'zustand';
import { createContext, useContext } from 'react';

interface AnimationState {
  animatedEdges: Record<string, number>;
  start: number;
  duration: number;
  conversationId?: string;

  timer?: NodeJS.Timeout;
  timerStart?: number;

  isAnimatedEdge: (id: string) => boolean;

  reset: () => void;
  setAnimatedEdge: (id: string, animated: boolean) => void;
  isLoading: () => boolean;
  startTimer: () => void;
}

export const createAnimationStore = create<AnimationState>((set, get) => ({
  animatedEdges: {},
  duration: 0,
  start: 0,

  isAnimatedEdge: (id: string) => {
    return get().animatedEdges[id] > 0;
  },

  reset: () => {
    const timer = get().timer;

    if (timer) {
      clearInterval(timer);
    }

    set({ animatedEdges: {}, timer: undefined });
  },

  startTimer() {
    clearInterval(get().timer);
    set({
      start: Date.now(),
      timer: setInterval(() => {
        const d = (Date.now() - get().start) / 1000;
        set({
          duration: Number(
            d.toFixed(d > 0.1 ? 1 : d > 0.01 ? 2 : d > 0.001 ? 3 : 4),
          ),
        });
      }, 5),
    });
  },

  setAnimatedEdge: (id: string, animated: boolean) => {
    const s = get();
    const currentValue = s.animatedEdges[id];
    if ((animated && currentValue > 0) || (!animated && currentValue === 0)) {
      return;
    }

    set((state) => {
      const currentValue = state.animatedEdges[id] || 0;
      return {
        animatedEdges: {
          ...state.animatedEdges,
          [id]: Math.max(currentValue + (animated ? 1 : -1), 0),
        },
      };
    });
  },

  isLoading: () => {
    return !!get().timer;
  },
}));

export const AnimationStoreContext = createContext<AnimationState | undefined>(
  undefined,
);

export const useAnimationStore = () => {
  const store = useContext(AnimationStoreContext);
  if (!store) {
    throw new Error(
      'useAnimationStore must be used within a AnimationStoreProvider',
    );
  }
  return store;
};
