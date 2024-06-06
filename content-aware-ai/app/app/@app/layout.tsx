import { PropsWithChildren } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="px-8 pt-8 pb-4 grow flex row items-stretch justify-center min-w-0 min-h-0">
      <div className="border rounded-lg overflow-hidden grow flex flex-col shadow-2xl shadow-gray-500 max-w-7xl">
        {children}
      </div>
    </div>
  );
}
