import { Database } from '@/lib/database.types';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { FC, ReactNode } from 'react';
import { drawerId } from './drawerId';
import UserIcon from '@heroicons/react/24/outline/UserIcon';

/* @ts-expect-error Server Component */
export const DrawerSide: FC = async () => {
  const supabaseClient = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const {
    data: { user: authenticatedUser },
  } = await supabaseClient.auth.getUser();

  const { data: user } = await supabaseClient
    .from('users')
    .select()
    .eq('id', authenticatedUser?.id)
    .single();

  return (
    <div className="drawer-side">
      <label htmlFor={drawerId} className="drawer-overlay" />
      <div className="menu p-4 w-80 bg-base-100 text-base-content">
        <span className="text-base p-4">
          Signed in as{' '}
          <span className="text-base font-bold">{user?.display_name}</span>
        </span>
        <ul>
          <li>
            <a>
              <UserIcon className="h-5 w-5" />
              Profile
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const DrawerToggle: FC = () => (
  <input id={drawerId} type="checkbox" className="drawer-toggle" />
);

export const DrawerContent: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="drawer-content">{children}</div>
);

export const DrawerRoot: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="drawer drawer-end">{children}</div>
);
