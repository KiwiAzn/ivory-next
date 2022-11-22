import { Database } from '@/lib/database.types';
import { DiceRolls } from '@/ui/DiceRolls';
import { RollDice } from '@/ui/RollDice';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

//@ts-ignore
export default async function Page({ params }) {
  const supabaseClient = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  let { data: channel, error } = await supabaseClient
    .from('channels')
    .select()
    .eq('slug', params.slug)
    .single();

  if (!channel) {
    const { data: newChannel, error: newChannelError } = await supabaseClient
      .from('channels')
      .insert({ slug: params.slug, created_by: user!.id })
      .select()
      .single();

    channel = newChannel;
  }

  // Add current user to channel

  await supabaseClient.from('channel_members').upsert(
    {
      channel_id: channel!.id,
      user_id: user!.id,
    },
    {
      ignoreDuplicates: true,
    },
  );

  return (
    <>
      <DiceRolls channelId={channel!.id} />
      <RollDice channelId={channel!.id} userId={user!.id} />
    </>
  );
}
