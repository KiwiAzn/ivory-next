'use client';

import { addDiceRoll, upsertChannel } from '@/lib/store';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Inputs {
  diceNotation: string;
}

export interface RollDiceProps {
  channelSlug: string;
}

export const RollDice: React.FC<RollDiceProps> = ({ channelSlug }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [channelId, setChannelId] = useState<number | undefined>();

  useEffect(() => {
    const init = async () => {
      const { id } = (await upsertChannel(channelSlug)) ?? { id: -1 };
      setChannelId(id);
    };
    init();
  });

  const onSubmit: SubmitHandler<Inputs> = ({ diceNotation }) => {
    channelId && addDiceRoll(diceNotation, channelId);
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
