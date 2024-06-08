'use client';

import { FC } from 'react';
import { Slide } from '../@slides/slides';
import { useAnimationStore } from '@/lib/store';

interface StatsProps {
  slide: Slide;
}

export const Stats: FC<StatsProps> = () => {
  const store = useAnimationStore();
  return (
    <div className="bg-red-500 rounded p-4 text-lg max-w-full overflow-hidden">
      <pre className="whitespace-pre-wrap text-xs">
        {JSON.stringify(store, null, 2)}
      </pre>
    </div>
  );
};
