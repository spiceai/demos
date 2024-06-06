import { FC, PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/lib/utils';

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
      {avatar}
      <div>
        <div className="font-semibold text-sm">{header}</div>
        <div className="whitespace-pre-wrap">{content}</div>
        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  );
};
