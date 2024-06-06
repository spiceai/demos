import { create } from 'zustand';
import { createContext, useContext } from 'react';

interface AnimationState {
  started: boolean;
  animateOpeanai: boolean;
  animatedEdges: Record<string, boolean>;

  setStarted: (started: boolean) => void;
  setAnimateOpeanai: (animateOpeanai: boolean) => void;
  setAnimatedEdge: (id: string, animated: boolean) => void;
}

export const createAnimationStore = create<AnimationState>((set) => ({
  started: false,
  animateOpeanai: false,
  animatedEdges: {},

  setStarted: (started: boolean) => set({ started }),
  setAnimateOpeanai: (animateOpeanai: boolean) => set({ animateOpeanai }),
  setAnimatedEdge: (id: string, animated: boolean) =>
    set((state) => ({
      animatedEdges: { ...state.animatedEdges, [id]: animated },
    })),
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
