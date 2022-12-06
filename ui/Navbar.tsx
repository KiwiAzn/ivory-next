'use client';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid';

export const Navbar: FC = () => {
  const pathname = usePathname();
  const isNotHero = pathname !== '/';

  return (
    <>
      {/*Duplicate div is created to ensure that there is enough space for the navbar in the document layout*/}
      <div className="navbar" />
      <div
        className={classNames(
          'navbar  fixed top-0 z-10',
          isNotHero && 'bg-neutral shadow-xl',
        )}
      >
        <div className="flex-1">
          {isNotHero && (
            <a className="btn btn-ghost normal-case text-xl font-hero">Ivory</a>
          )}
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <Bars3Icon />
          </button>
        </div>
      </div>
    </>
  );
};
