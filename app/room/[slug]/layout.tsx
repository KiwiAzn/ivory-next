import '@/styles/dist.css';
import React from 'react';
import { AccountWizard } from '@/ui/AccountWizard';
import { Database } from '@/lib/database.types';
import { Providers } from './Providers';
import { cookies, headers } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@/lib/types';

export default async function Layout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const supabaseClient = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    return <AccountWizard />;
  }

  let { data: channel, error } = await supabaseClient
    .from('channels')
    .select()
    .eq('slug', params.slug)
    .single();

  if (!channel) {
    const { data: newChannel } = await supabaseClient
      .from('channels')
      .insert({ slug: params.slug, created_by: user!.id })
      .select()
      .single();

    channel = newChannel;
  }

  // Add current user to channel
  const result = await supabaseClient.from('channel_members').upsert(
    {
      channel_id: channel!.id,
      user_id: user!.id,
    },
    {
      ignoreDuplicates: true,
    },
  );

  // Get all users for the channel
  const usersResult = await supabaseClient
    .from('channel_members')
    .select('user:users(*)')
    .eq('channel_id', channel?.id);

  const users = usersResult.data?.map(({ user }) => user) as Array<User>;

  return (
    <Providers channelId={channel!.id} users={users}>
      {children}
    </Providers>
  );
}
