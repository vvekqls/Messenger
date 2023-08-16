import Sidebar from '@/app/components/Sidebar/Sidebar';
import ConversationList from '@/app/components/Conversations/ConversationList';
import getConversations from '@/app/api/actions/getConversations';

export default async function ConversaionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList conversations={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
