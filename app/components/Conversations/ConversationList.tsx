'use client';

import { useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import clsx from 'clsx';
import { FullConversationType } from '@/app/types';

import { useRouter } from 'next/navigation';
import useConversation from '@/app/hooks/useConversatiton';

import ConversationBox from './ConversationBox';
import GroupChatModal from '../GroupChatModal/GroupChatModal';
import { User } from '@prisma/client';

interface ConversationListProps {
  conversations: FullConversationType[];
  users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  users,
}) => {
  const [conversationItems, setConversationsItems] = useState(conversations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `
            fixed 
            inset-y-0
            pb-20
            lg:pb-0
            lg:left-20
            lg:w-80
            lg:block
            overflow-y-auto 
            border-r
            border-gray-200
        `,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 p-t4">
            <div className="text-2xl font-bold text-neuttral-800">Messages</div>
            <div
              className="
              rounded-full  
              p-2
              bg-gray100
              text-gray-600
              cursor-pointer
              hover:opacity-75
              transition
            "
              onClick={() => setIsModalOpen(true)}
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {conversationItems.map((item) => {
            return (
              <ConversationBox
                key={item.id}
                data={item}
                selected={conversationId === item.id}
              />
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
