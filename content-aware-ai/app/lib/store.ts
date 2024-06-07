import { create } from 'zustand';
import { createContext, useContext } from 'react';

interface AnimationState {
  started: boolean;
  animateOpeanai: boolean;
  animatedEdges: Record<string, number>;

  setStarted: (started: boolean) => void;
  setAnimateOpeanai: (animateOpeanai: boolean) => void;
  isAnimatedEdge: (id: string) => boolean;
  setAnimatedEdge: (id: string, animated: boolean) => void;
}

export const createAnimationStore = create<AnimationState>((set, get) => ({
  started: false,
  animateOpeanai: false,
  animatedEdges: {},

  setStarted: (started: boolean) => set({ started }),
  setAnimateOpeanai: (animateOpeanai: boolean) => set({ animateOpeanai }),
  isAnimatedEdge: (id: string) => get().animatedEdges[id] > 0,
  setAnimatedEdge: (id: string, animated: boolean) =>
    set((state) => {
      const currentValue = state.animatedEdges[id] || 0;
      return {
        animatedEdges: {
          ...state.animatedEdges,
          [id]: Math.max(currentValue + (animated ? 1 : -1), 0),
        },
      };
    }),
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
