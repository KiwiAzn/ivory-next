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

  let { data: channel } = await supabaseClient
    .from('channels')
    .select()
    .eq('slug', params.slug)
    .single();

  const { data: diceRolls } = await supabaseClient
    .from('dice_rolls')
    .select()
    .eq('channel_id', channel?.id)
    .order('inserted_at', { ascending: false });

  return (
    <>
      <RollDice channelName={params.slug} />
      <DiceRolls channelId={channel!.id} diceRolls={diceRolls ?? []} />
    </>
  );
}
