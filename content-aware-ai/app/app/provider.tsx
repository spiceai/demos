'use client';

import { PropsWithChildren } from 'react';
import { AnimationStoreContext, createAnimationStore } from '@/lib/store';

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <AnimationStoreContext.Provider value={createAnimationStore()}>
      {children}
    </AnimationStoreContext.Provider>
  );
};
