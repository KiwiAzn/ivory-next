import { Database } from '@/lib/database.types';

export interface DiceRollProps
  extends Pick<
    Database['public']['Tables']['dice_rolls']['Row'],
    'total' | 'notation' | 'breakdown'
  > {}

export const DiceRoll: React.FC<DiceRollProps> = ({
  total,
  notation,
  breakdown,
}) => {
  return (
    <div>
      <p className="text-base">{total}</p>
      <p className="text-base">{notation}</p>
      <p className="text-base">{breakdown}</p>
    </div>
  );
};
