'use client';

import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function SubmitButton({ children, ...props }: ButtonProps) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <Button {...props} type="submit" aria-disabled={pending}>
      {isPending ? <Loader2 className="size-4 animate-spin" /> : children}
    </Button>
  );
}
