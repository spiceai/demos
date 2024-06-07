'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const maxState = 7;

export const Switcher = () => {
  const router = useRouter();
  const params = useSearchParams();
  const state = parseInt(params.get('state') || '0');

  useEffect(() => {
    if (!params.has('state')) {
      const newParams = new URLSearchParams(params);
      newParams.set('state', '0');
      router.push(`?${newParams.toString()}`);
    }
  }, []);

  const toState = (d: number) => {
    const next = state + d;
    if (next < 0 || next > maxState) {
      return;
    }
    const newParams = new URLSearchParams(params);
    newParams.set('state', String(next));
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="absolute top-6 right-6 flex items-center gap-1">
      <Button disabled={state <= 0} variant="ghost" onClick={() => toState(-1)}>
        <ChevronLeftIcon className="w-6 h-6" />
      </Button>

      <Button
        disabled={state >= maxState}
        variant="ghost"
        onClick={() => toState(1)}
      >
        <ChevronRightIcon className="w-6 h-6" />
      </Button>
    </div>
  );
};
