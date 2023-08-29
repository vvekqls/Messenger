'use client';

import { useEffect, useMemo, useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import clsx from 'clsx';
import { FullConversationType } from '@/app/types';

import { useRouter } from 'next/navigation';
import useConversation from '@/app/hooks/useConversatiton';

import ConversationBox from './ConversationBox';
import GroupChatModal from '../GroupChatModal/GroupChatModal';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';

interface ConversationListProps {
  conversations: FullConversationType[];
  users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  users,
}) => {
  const session = useSession();
  const [conversationItems, setConversationsItems] = useState(conversations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();
  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    const newHandler = (conversation: FullConversationType) => {
      setConversationsItems((prevConversationItems) => {
        if (find(prevConversationItems, { id: conversation.id })) {
          return prevConversationItems;
        }

        return [conversation, ...prevConversationItems];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setConversationsItems((prevConversaitonItems) =>
        prevConversaitonItems.map((prevConversationItem) => {
          if (prevConversationItem.id === conversation.id) {
            return {
              ...prevConversationItem,
              messages: conversation.messages,
            };
          }
          return prevConversationItem;
        })
      );
    };

    const removeHandler = (conversation: FullConversationType) => {
      setConversationsItems((prevConversation) => {
        return [
          ...prevConversation.filter((convo) => convo.id !== conversation.id),
        ];
      });

      if (conversationId === conversation.id) {
        router.push('/conversations');
      }
    };

    pusherClient.subscribe(pusherKey);
    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:remove', removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new', newHandler);
      pusherClient.unbind('conversation:update', updateHandler);
      pusherClient.unbind('conversation:remove', removeHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          ` fixed 
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
