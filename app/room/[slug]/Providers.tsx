'use client';

import { User } from '@/lib/types';
import { usersAtom } from 'atoms/Users';
import { Provider } from 'jotai';
import { FC, ReactNode } from 'react';

interface ProvidersProps {
  users: Array<User>;
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ users, children }) => {
  const mappedUsers: Record<User['id'], User> = users.reduce(
    (previous, user) => ({ ...previous, [user.id]: user }),
    {},
  );

  const initialUsersAtom: [typeof usersAtom, Record<User['id'], User>] = [
    usersAtom,
    mappedUsers,
  ];

  return <Provider initialValues={[initialUsersAtom]}>{children}</Provider>;
};
