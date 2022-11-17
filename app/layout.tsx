import '@/styles/dist.css';
import React from 'react';
import { Providers } from './Providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Ivory Dice</title>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
