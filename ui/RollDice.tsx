'use client';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Inputs {
  notation: string;
}

export interface RollDiceProps {
  channelName: string;
}

export const RollDice: React.FC<RollDiceProps> = ({ channelName }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ notation }) => {
    await axios.post(`/api/room/${channelName}/roll-dice`, { notation });
  };

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
