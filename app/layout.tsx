import { Database } from '@/lib/database.types';
import '@/styles/dist.css';
import {
  DrawerContent,
  DrawerRoot,
  DrawerSide,
  DrawerToggle,
} from '@/ui/Drawer';
import { Navbar } from '@/ui/Navbar';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import React from 'react';
import { Providers } from './Providers';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersAsKeyValue: Record<string, string> = {};

  headers().forEach((value, key) => {
    headersAsKeyValue[key] = value;
  });

  // Create authenticated Supabase Client
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html>
      <head>
        <title>Ivory Dice</title>
      </head>
      <body>
        <DrawerRoot>
          <DrawerToggle />
          <DrawerContent>
            <Navbar />
            <Providers initialSession={session}>{children}</Providers>
          </DrawerContent>
          <DrawerSide />
        </DrawerRoot>
      </body>
    </html>
  );
}
