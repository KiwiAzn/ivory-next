'use client';

import { useStore } from '@/lib/store';

export const DiceRolls: React.FC<{ channelSlug: string }> = ({
  channelSlug,
}) => {
  const store = useStore({ channelSlug });
  return <p>{JSON.stringify(store)}</p>;
};
