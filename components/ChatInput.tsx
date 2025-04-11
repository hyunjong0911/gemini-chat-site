import React, { useState, useCallback, memo, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = memo(({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  // 메시지 제출 함수 메모이제이션
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  }, [message, isLoading, onSendMessage]);

  // Shift+Enter가 아닌 Enter 키만 눌렀을 때 메시지 전송
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !isLoading) {
        onSendMessage(message);
        setMessage('');
      }
    }
  }, [message, isLoading, onSendMessage]);

  // 메시지 변경 함수 메모이제이션
  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <textarea
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요... (Enter: 전송, Shift+Enter: 줄바꿈)"
        className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none h-[60px] max-h-[200px] overflow-auto"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        보내기
      </button>
    </form>
  );
});

ChatInput.displayName = 'ChatInput';

export default ChatInput; 