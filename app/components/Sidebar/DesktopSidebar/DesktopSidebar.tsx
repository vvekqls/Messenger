'use client';
import { User } from '@prisma/client';
import useRoutes from '@/app/hooks/useRoutes';
import React, { useState } from 'react';

import Avatar from '../../Avatar';
import DesktopSidebarItem from './DesktopSidebarItem';
import SettingModal from '../SettingModal/SettingModal';
interface DesktopSidebarProps {
  currentUser: User | null;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
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
            onClick={() => setIsOpen(true)}
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
    </>
  );
};

export default DesktopSidebar;
