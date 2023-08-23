'use client';

import { FullMessageType } from '@/app/types';
import { useEffect, useRef, useState } from 'react';
import useConversation from '@/app/hooks/useConversatiton';
import MessageBox from '../MessageBox/MessageBox';
import axios from 'axios';
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
