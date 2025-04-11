import React, { memo } from 'react';
import { Message } from '../types/chat';

interface ChatProps {
  messages: Message[];
}

// 개별 메시지 컴포넌트를 분리하여 성능 최적화
const ChatMessage = memo(({ message, index }: { message: Message; index: number }) => {
  const isUser = message.role === 'user';
  
  return (
    <div
      key={index}
      className={`p-3 rounded-lg ${
        isUser
          ? 'bg-blue-100 ml-auto max-w-[80%]'
          : 'bg-gray-100 mr-auto max-w-[80%]'
      }`}
    >
      <p className="text-sm font-semibold mb-1">
        {isUser ? '사용자' : 'Gemini'}
      </p>
      <div className="whitespace-pre-wrap break-words">{message.content}</div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

// React.memo로 감싸서 props가 변경되지 않으면 리렌더링 방지
const Chat = memo(({ messages }: ChatProps) => {
  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          Gemini에게 질문하세요.
        </div>
      ) : (
        messages.map((message, index) => (
          <ChatMessage key={index} message={message} index={index} />
        ))
      )}
    </div>
  );
});

Chat.displayName = 'Chat';

export default Chat; 