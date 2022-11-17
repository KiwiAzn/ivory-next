import '@/styles/dist.css';
import React from 'react';
import { AccountWizard } from '@/ui/AccountWizard';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/database.types';
import { cookies } from 'next/headers';

const supabaseAdmin = createClient<Database>(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
);

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const nextCookies = cookies();
  const supabaseAuthToken = nextCookies.get('supabase-auth-token')?.value;

  if (!supabaseAuthToken) {
    return <AccountWizard />;
  }

  // supabase-auth-token has the jwt as the first element
  const jwt = JSON.parse(supabaseAuthToken)[0];
  const { data } = await supabaseAdmin.auth.getUser(jwt);

  return !data.user ? <AccountWizard /> : children;
}
