'use client';

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { find } from 'lodash';
import { FullMessageType } from '@/app/types';
import useConversation from '@/app/hooks/useConversatiton';
import { pusherClient } from '@/app/libs/pusher';
import MessageBox from '../MessageBox';
interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessage] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      setMessage((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessage((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
          return currentMessage;
        })
      );
    };

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('messages:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('messages:update', updateMessageHandler);
    };
  }, [conversationId]);
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => {
        return (
          <MessageBox
            key={message.id}
            isLast={i === messages.length - 1}
            data={message}
          />
        );
      })}
      <div
        ref={bottomRef}
        className="pt-24"
      />
    </div>
  );
};

export default Body;
