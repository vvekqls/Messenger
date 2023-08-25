'use client';
import useOtherUser from '@/app/hooks/useOtherUser';
import { HiEllipsisHorizontal, HiChevronLeft } from 'react-icons/hi2';
import { FullConversationType } from '@/app/types';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import Avatar from '../Avatar/Avatar';
import ProfileDrawer from '../ProfileDrawer/ProfileDrawer';

interface HeaderProps {
  conversation: FullConversationType;
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return 'Active';
  }, [conversation]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className="
        bg-white 
          w-full 
          flex
          border-b-[1px]
          sm:px-4 
          py-3
          px-4 
          lg:px-6 
          justify-between 
          items-center 
          shadow-sm"
      >
        <div className="flex gap-3 items-center">
          <Link
            className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
            href="/conversations"
          >
            <HiChevronLeft size={32} />
          </Link>
          <Avatar user={otherUser} />
          <div className="flex flex-col">
            {conversation.name || otherUser.name}
          </div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
        <HiEllipsisHorizontal
          className="text-sky-500 cursor-pointer  hover:text-sky-600 transition"
          size={32}
          onClick={() => setDrawerOpen(true)}
        />
      </div>
    </>
  );
};

export default Header;
