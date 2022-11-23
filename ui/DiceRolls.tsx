'use client';

import { Database } from '@/lib/database.types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

export const DiceRolls: React.FC<{ channelId: number }> = ({ channelId }) => {
  const supabaseClient = useSupabaseClient();

  const [diceRolls, setDiceRolls] = useState<
    Array<Database['public']['Tables']['dice_rolls']['Row']>
  >([]);

  useEffect(() => {
    supabaseClient
      .channel('public:dice_rolls')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          table: 'dice_rolls',
          schema: 'public',
          filter: `channel_id=eq.${channelId}`,
        },
        (payload) => {
          setDiceRolls((currentValue) => [
            payload.new as Database['public']['Tables']['dice_rolls']['Row'],
            ...currentValue,
          ]);
        },
      )
      .subscribe();
  });

  return <p>{JSON.stringify(diceRolls)}</p>;
};
