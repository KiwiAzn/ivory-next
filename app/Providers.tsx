'use client';
import {
  createBrowserSupabaseClient,
  Session,
} from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import React, { useState } from 'react';

export const Providers: React.FC<{
  children: React.ReactNode;
  initialSession: Session | null;
}> = ({ children, initialSession }) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={initialSession}
    >
      {children}
    </SessionContextProvider>
  );
};
