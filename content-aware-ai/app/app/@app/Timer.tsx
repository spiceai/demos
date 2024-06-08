'use client';

import { TimerIcon } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';

interface TimerProps {
  completed?: boolean;
}

export const Timer: FC<TimerProps> = ({ completed }) => {
  const [time, setTime] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!completed) {
      timer.current = setInterval(() => {
        setTime((prev) => prev + 100);
      }, 100);
    }

    return () => {
      clearInterval(timer.current!);
    };
  }, []);

  useEffect(() => {
    if (completed) {
      clearInterval(timer.current!);
    }
  }, [completed]);

  return (
    <div className="text-muted-foreground flex items-center gap-1">
      <TimerIcon className="size-4" />
      {time / 1000} sec
    </div>
  );
};
