import getConversaionById from '@/app/api/actions/getConversationById';
import getMessages from '@/app/api/actions/getMessages';
import EmptyState from '@/app/components/EmptyState';
import Header from '@/app/components/Header/Header';
import Body from '@/app/components/Body/Body';
import Form from '@/app/components/Form/Form';

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversaionById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
