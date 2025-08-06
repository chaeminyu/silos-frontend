'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';

// 개발 환경에서만 DevTools 동적 임포트
let ReactQueryDevtools: any = null;
if (process.env.NODE_ENV === 'development') {
  try {
    const devtools = require('@tanstack/react-query-devtools');
    ReactQueryDevtools = devtools.ReactQueryDevtools;
  } catch (error) {
    console.warn('React Query DevTools를 찾을 수 없습니다. 개발 도구 없이 진행합니다.');
  }
}

// React Query 클라이언트 설정
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 데이터 캐싱 시간 (5분)
        staleTime: 5 * 60 * 1000,
        // 캐시 유지 시간 (10분)
        gcTime: 10 * 60 * 1000,
        // 에러 재시도 설정
        retry: (failureCount, error: any) => {
          // 네트워크 에러나 서버 에러인 경우에만 재시도
          if (error?.response?.status >= 400 && error?.response?.status < 500) {
            return false; // 4xx 에러는 재시도하지 않음
          }
          return failureCount < 3; // 최대 3번까지 재시도
        },
        // 재시도 간격 (지수 백오프)
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
        // 백그라운드에서 자동 리페치 비활성화 (성능 최적화)
        refetchOnWindowFocus: false,
        // 네트워크 재연결 시 리페치
        refetchOnReconnect: true,
      },
      mutations: {
        // 뮤테이션 에러 재시도 (1번만)
        retry: 1,
      },
    },
  });
};

interface ReactQueryProviderProps {
  children: ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  // 클라이언트 사이드에서만 QueryClient 인스턴스 생성
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 개발 환경에서만 React Query DevTools 표시 (설치된 경우에만) */}
      {process.env.NODE_ENV === 'development' && ReactQueryDevtools && (
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom-right"
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
}

// 전역 에러 핸들러
export const setupGlobalErrorHandler = () => {
  if (typeof window !== 'undefined') {
    // React Query 전역 에러 처리
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled Promise Rejection:', event.reason);
      
      // API 에러인 경우 사용자에게 알림
      if (event.reason?.userMessage) {
        // 토스트 알림 등으로 사용자에게 표시
        window.dispatchEvent(new CustomEvent('api-error', {
          detail: {
            message: event.reason.userMessage,
            type: 'error',
          },
        }));
      }
    });
  }
};

export default ReactQueryProvider;