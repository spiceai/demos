'use client';

import { FC } from 'react';
import { Slide } from '../@slides/slides';
import { useAnimationStore } from '@/lib/store';
import { Loader2, LucideTimer } from 'lucide-react';

interface StatsProps {
  slide: Slide;
}

export const Stats: FC<StatsProps> = ({ slide }) => {
  const store = useAnimationStore();
  return (
    <div className="bg-gray-600 rounded p-4 max-w-full overflow-hidden text-xl font-semibold">
      <div
        className={
          'flex items-center gap-2 ' +
          (store.duration < 3 || slide.accelerated
            ? 'text-green-500'
            : 'text-red-500')
        }
      >
        {store.isLoading() ? (
          <Loader2 className="size-6 animate-spin" />
        ) : (
          <LucideTimer className="size-6" />
        )}{' '}
        {store.duration} sec
      </div>
    </div>
  );
};
