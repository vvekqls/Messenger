'use client';
import { User } from '@prisma/client';
import useRoutes from '@/app/hooks/useRoutes';
import React, { useState } from 'react';

import Avatar from '../../Avatar/Avatar';
import DesktopSidebarItem from './DesktopSidebarItem';
interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setItsOpen] = useState(false);

  return (
    <div
      className="
        hidden 
        lg:fixed
        lg:inset-y-0
        lg:left-0
        lg:z-40
        lg:w-20
        xl:px-6
        lg:verflow-y-auto 
        lg:bg-white
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between 
      "
    >
      <nav className="mt-4 flex flex-col justify-between">
        <ul
          role="list"
          className="
            flex  
            flex-col  
            items-center  
            space-y-1
          "
        >
          {routes.map((route) => {
            return (
              <DesktopSidebarItem
                key={route.label}
                href={route.href}
                label={route.label}
                icon={route.icon}
                active={route.active}
                onClick={route.onClick}
              />
            );
          })}
        </ul>
      </nav>
      <nav
        className="
          mt-4
          flex
          flex-col
          justify-between
          items-center
      "
      >
        <div
          onClick={() => setItsOpen(true)}
          className="
            cursor-pointer
            hover:opacity-75
            transition
          "
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
