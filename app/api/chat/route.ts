import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { cache } from 'react';

// 환경 변수 검증
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY가 설정되지 않았습니다. .env.local 파일을 확인하세요.');
}

// API 키로 Gemini API 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// 모델 설정 - 앱 전체에서 재사용
const chatParams = {
  temperature: 0.7, // 창의성 (0.0 ~ 1.0)
  topK: 40,         // 다양성
  topP: 0.95,       // 확률 분포
  maxOutputTokens: 1000, // 최대 출력 길이
};

// 간단한 메시지 캐싱 (중복 요청 방지)
const messageCache = new Map<string, string>();

// 캐시된 모델 인스턴스 생성
const getModelInstance = cache(() => {
  return genAI.getGenerativeModel({ model: 'gemini-pro' });
});

export async function POST(request: NextRequest) {
  try {
    // CORS 헤더 설정
    const origin = request.headers.get('origin') || '';
    
    // 요청 데이터 파싱
    const data = await request.json().catch(error => {
      console.error('JSON 파싱 오류:', error);
      return null;
    });
    
    if (!data || !data.message) {
      return NextResponse.json(
        { error: '유효한 메시지가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }
    
    const { message } = data;
    
    // 캐시 확인 - 동일한 메시지에 대한 응답 재사용
    const cachedResponse = messageCache.get(message);
    if (cachedResponse) {
      return NextResponse.json({ response: cachedResponse }, { status: 200 });
    }
    
    // 메시지가 너무 길면 거부
    if (message.length > 4000) {
      return NextResponse.json(
        { error: '메시지가 너무 깁니다. 4000자 이내로 작성해주세요.' },
        { status: 400 }
      );
    }

    // Gemini Pro 모델 사용
    const model = getModelInstance();

    // 채팅 세션 생성
    const chat = model.startChat({
      generationConfig: chatParams,
      history: [],
    });

    // 메시지 전송 및 응답 받기
    const result = await chat.sendMessage(message);
    const response = result.response.text();
    
    // 캐시에 응답 저장 (1000개 제한)
    if (messageCache.size > 1000) {
      // 가장 오래된 항목 제거
      const firstKey = messageCache.keys().next().value;
      messageCache.delete(firstKey);
    }
    messageCache.set(message, response);

    return NextResponse.json({ response }, { 
      status: 200,
      headers: {
        'Cache-Control': 'private, max-age=3600',
        'Access-Control-Allow-Origin': origin,
      }
    });
  } catch (error) {
    console.error('Gemini API 오류:', error);
    
    // 오류 유형에 따른 응답
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'API 키가 유효하지 않습니다. .env.local 파일의 GEMINI_API_KEY를 확인하세요.' },
          { status: 401 }
        );
      } else if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'API 속도 제한에 도달했습니다. 잠시 후 다시 시도하세요.' },
          { status: 429 }
        );
      }
    }
    
    return NextResponse.json(
      { error: '응답을 생성하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 