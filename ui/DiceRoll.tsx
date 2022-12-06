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
    <li className="p-4 grid grid-cols-2 gap-4">
      <div className="text-base self-center">
        {user.display_name} rolled {notation}
      </div>
      <div className="flex flex-row justify-end">
        <div
          className="flex-none font-bold text-2xl self-center tooltip"
          data-tip={breakdown}
        >
          {total}
        </div>
      </div>
    </li>
  );
};
