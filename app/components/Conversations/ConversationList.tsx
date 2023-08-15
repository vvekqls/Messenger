import { Conversation } from '@prisma/client';

interface ConversationListProps {
  conversations: Conversation[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
}) => {
  return <div>Conversation List</div>;
};

export default ConversationList;
