import Sidebar from '@/app/components/Sidebar/Sidebar';
import ConversationList from '@/app/components/Conversations/ConversationList';
import getConversations from '@/app/api/actions/getConversations';
import getUsers from '@/app/api/actions/getUsers';

export default async function ConversaionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList
          conversations={conversations}
          users={users}
        />
        {children}
      </div>
    </Sidebar>
  );
}
