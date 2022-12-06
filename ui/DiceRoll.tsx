`use client`;

import { DiceRoll as DiceRollType } from '@/lib/types';
import { userAtom } from 'atoms/Users';
import { useAtom } from 'jotai';

export interface DiceRollProps
  extends Pick<DiceRollType, 'total' | 'notation' | 'breakdown'> {
  userId: DiceRollType['user_id'];
}

export const DiceRoll: React.FC<DiceRollProps> = ({
  total,
  notation,
  breakdown,
  userId,
}) => {
  const [user] = useAtom(userAtom(userId));

  return (
    <div>
      <div>
        <p className="text-base">{user.display_name}</p>
      </div>
      <div>
        <p className="text-base">{notation}</p>
        <p className="text-base">{total}</p>
      </div>
      <div>
        <p className="text-base">{breakdown}</p>
      </div>
    </div>
  );
};
