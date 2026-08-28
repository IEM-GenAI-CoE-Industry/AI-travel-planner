import React from 'react';
import { ChatWindow } from '../components/chat/ChatWindow';

export const ChatPage = () => {
  return (
    <div className="bg-background min-h-[calc(100vh-4rem)]">
      <ChatWindow />
    </div>
  );
};
