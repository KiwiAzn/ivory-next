import '@/styles/dist.css';
import React from 'react';

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
      <body>{children}</body>
    </html>
  );
}
