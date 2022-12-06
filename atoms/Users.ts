import { User } from '@/lib/types';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

export const usersAtom = atom<Record<User['id'], User>>({});
export const userAtom = atomFamily((id: User['id']) =>
  atom((get) => get(usersAtom)[id]),
);
