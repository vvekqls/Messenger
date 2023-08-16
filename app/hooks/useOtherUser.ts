import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { FullConversationType } from '../types';
import { User, Conversation } from '@prisma/client';

const useOtherUser = (conversation: FullConversationType) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    const otherUser = conversation.users.filter(user => {
      return user.email !== currentUserEmail
    })

    return otherUser[0];
  }, [session?.data?.user?.email, conversation.users]);

  return otherUser
}

export default useOtherUser