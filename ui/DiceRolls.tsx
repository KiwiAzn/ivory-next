'use client';

import { Database } from '@/lib/database.types';
import { DiceRoll } from '@/lib/types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { DiceRoll as DiceRollUI } from './DiceRoll';

interface DiceRollsProps {
  channelId: number;
  diceRolls: Array<DiceRoll>;
}

export const DiceRolls: React.FC<DiceRollsProps> = ({
  channelId,
  diceRolls: initialDiceRolls = [],
}) => {
  const supabaseClient = useSupabaseClient();

  const [diceRolls, setDiceRolls] = useState<Array<DiceRoll>>(initialDiceRolls);

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
            payload.new as DiceRoll,
            ...currentValue,
          ]);
        },
      )
      .subscribe();
  });

  return (
    <div>
      {diceRolls.map(({ id, total, notation, breakdown, user_id }) => (
        <DiceRollUI
          key={id}
          total={total}
          notation={notation}
          breakdown={breakdown}
          userId={user_id}
        />
      ))}
    </div>
  );
};
