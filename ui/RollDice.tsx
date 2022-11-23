'use client';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Inputs {
  notation: string;
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

  const onSubmit: SubmitHandler<Inputs> = async ({ notation }) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group">
        <input
          type="text"
          className="input-bordered input"
          {...register('notation', { required: true })}
        />
        <button className="btn-primary btn-active btn">Roll</button>
      </div>
    </form>
  );
};
