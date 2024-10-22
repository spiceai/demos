import './globals.css';

import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Provider } from './provider';

export const metadata: Metadata = {
  title: 'Spice AI Demo',
};

export default function RootLayout({
  slides,
  app,
}: Readonly<{
  slides: React.ReactNode;
  app: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="overscroll-none bg-gray-200 text-foreground h-screen flex flex-col gap-4">
        <Provider>
          {slides}
          {app}
        </Provider>
      </body>
    </html>
  );
}
