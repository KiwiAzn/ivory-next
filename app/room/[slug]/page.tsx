import { Database } from '@/lib/database.types';
import { ChannelMembers } from '@/ui/ChannelMembers';
import { DiceRolls } from '@/ui/DiceRolls';
import { RollDice } from '@/ui/RollDice';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

/* @ts-expect-error Server Component */
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
      <div className="lg:max-xl:container lg:mx-auto max-w-screen-lg">
        <div className="grid grid-cols-3 gap-8 mt-16">
          <div className="col-span-1">
            <ChannelMembers channelId={channel!.id} />
          </div>
          <div className="col-span-2">
            <RollDice channelName={params.slug} />
            <DiceRolls channelId={channel!.id} diceRolls={diceRolls ?? []} />
          </div>
        </div>
      </div>
    </>
  );
}
