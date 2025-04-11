"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Chat from '../components/Chat';
import ChatInput from '../components/ChatInput';
import { Message } from '../types/chat';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(() => {
    // 로컬 스토리지에서 이전 메시지 불러오기 (브라우저 새로고침시 대화 유지)
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chatMessages');
      return savedMessages ? JSON.parse(savedMessages) : [];
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 메시지가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // 메시지가 변경될 때마다 스크롤 아래로 이동
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // useCallback으로 함수 메모이제이션하여 불필요한 리렌더링 방지
  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // 사용자 메시지 추가
    const userMessage: Message = {
      role: 'user',
      content,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || '서버 응답 오류');
      }
      
      const data = await response.json();
      
      // AI 응답 추가
      const aiMessage: Message = {
        role: 'assistant',
        content: data.response,
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('채팅 오류:', error);
      // 오류 메시지 추가
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `죄송합니다. 응답을 생성하는 중 오류가 발생했습니다. (${error instanceof Error ? error.message : '알 수 없는 오류'})`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 대화 내용 초기화 함수
  const handleClearChat = useCallback(() => {
    if (window.confirm('대화 내용을 모두 삭제하시겠습니까?')) {
      setMessages([]);
      localStorage.removeItem('chatMessages');
    }
  }, []);

  // 로딩 상태 UI를 메모이제이션
  const loadingIndicator = useMemo(() => {
    if (!isLoading) return null;
    
    return (
      <div className="flex items-center space-x-2 p-2">
        <div className="animate-pulse flex space-x-1">
          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
        </div>
        <p className="text-sm text-gray-500">생각 중...</p>
      </div>
    );
  }, [isLoading]);

  return (
    <main className="flex flex-col h-screen p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold text-center">Gemini 채팅</h1>
        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            className="text-sm text-red-500 hover:text-red-700"
          >
            대화 지우기
          </button>
        )}
      </div>
      
      <div className="flex-grow overflow-auto mb-4 p-4 border rounded-lg shadow-sm">
        <Chat messages={messages} />
        {loadingIndicator}
        <div ref={bottomRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </main>
  );
} 