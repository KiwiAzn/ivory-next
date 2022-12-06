'use client';
import { FC, ReactNode } from 'react';

export const drawerId = 'drawer';

export const DrawerSide: FC = () => {
  return (
    <div className="drawer-side">
      <label htmlFor={drawerId} className="drawer-overlay" />
      <ul className="menu p-4 w-80 bg-base-100 text-base-content">
        <li>
          <a>Sidebar Item 1</a>
        </li>
        <li>
          <a>Sidebar Item 2</a>
        </li>
      </ul>
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
