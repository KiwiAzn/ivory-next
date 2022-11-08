import '@/styles/dist.css';
import React from 'react';

import { Hero } from '@/ui/Hero';

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
        <Hero />
        <div className="container mx-auto">{children}</div>
      </body>
    </html>
  );
}
