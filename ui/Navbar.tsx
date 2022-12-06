'use client';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { drawerId } from './drawerId';

export const Navbar: FC = () => {
  const pathname = usePathname();
  const isHero = pathname === '/';
  const isNotHero = pathname !== '/';

  return (
    <div
      className={classNames(
        'navbar',
        isNotHero && 'bg-neutral shadow-xl',
        isHero && 'fixed top-0 z-10',
      )}
    >
      <div className="flex-1">
        {isNotHero && (
          <a className="btn btn-ghost normal-case text-xl font-hero">Ivory</a>
        )}
      </div>
      <div className="flex-none">
        <label htmlFor={drawerId} className="btn btn-square btn-ghost">
          <Bars3Icon />
        </label>
      </div>
    </div>
  );
};
