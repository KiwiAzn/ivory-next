'use client';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Inputs {
  diceNotation: string;
}

export interface RollDiceProps {
  channelId: number;
  userId: string;
}

export const RollDice: React.FC<RollDiceProps> = ({ channelId, userId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const supabaseClient = useSupabaseClient();

  const onSubmit: SubmitHandler<Inputs> = async ({ diceNotation }) => {
    await supabaseClient.from('dice_rolls').insert({
      dice_notation: diceNotation,
      channel_id: channelId,
      user_id: userId,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group">
        <input
          type="text"
          className="input-bordered input"
          {...register('diceNotation', { required: true })}
        />
        <button className="btn-primary btn-active btn">Roll</button>
      </div>
    </form>
  );
};
