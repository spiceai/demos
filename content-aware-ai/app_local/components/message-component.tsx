import { FC, PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

export interface MessageComponentProps {
  className?: string;
  avatar: ReactNode;
  header: string | ReactNode;
  content: string | ReactNode;
}

export const MessageComponent: FC<PropsWithChildren<MessageComponentProps>> = ({
  children,
  className,
  avatar,
  header,
  content,
}) => {
  return (
    <div className={cn('px-4 flex items-center gap-3', className)}>
      <div className="self-start">{avatar}</div>
      <div>
        <div className="font-semibold text-lg">{header}</div>
        <div className="whitespace-pre-wrap text-lg">{content}</div>
        <div className="flex flex-col text-lg">{children}</div>
      </div>
    </div>
  );
};

export const MessageSkeleton = () => (
  <div className="px-4 flex items-center gap-3">
    <Skeleton className="size-14 rounded-2xl" />
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-12 rounded-lg" />
      <Skeleton className="h-6 w-64 rounded-lg" />
    </div>
  </div>
);
