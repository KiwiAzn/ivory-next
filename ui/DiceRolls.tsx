'use client';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';

export const DiceRolls: React.FC<{ channelId: number }> = ({ channelId }) => {
  const supabaseClient = useSupabaseClient();

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
          console.log('Change received!', payload);
        },
      )
      .subscribe();
  });

  return <p>DiceRolls</p>;
};
