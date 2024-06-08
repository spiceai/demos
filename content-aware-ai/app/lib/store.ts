import { create } from 'zustand';
import { createContext, useContext } from 'react';

interface AnimationState {
  animatedEdges: Record<string, number>;
  animationStarted?: Date;
  animationEnded?: Date;

  isAnimatedEdge: (id: string) => boolean;

  reset: () => void;
  setAnimatedEdge: (id: string, animated: boolean) => void;
  setAnimationStarted: () => void;
  setAnimationEnded: () => void;
}

export const createAnimationStore = create<AnimationState>((set, get) => ({
  animatedEdges: {},

  isAnimatedEdge: (id: string) => {
    console.log('test', id, get().animatedEdges[id]);
    return get().animatedEdges[id] > 0;
  },

  reset: () =>
    set({
      animatedEdges: {},
      animationStarted: undefined,
      animationEnded: undefined,
    }),

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

  setAnimationStarted: () => {
    set({ animationStarted: new Date() });
  },

  setAnimationEnded: () => set({ animationEnded: new Date() }),
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
