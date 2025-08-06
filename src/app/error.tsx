'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application Error:', error);
  }, [error]);

  const handleReset = () => {
    reset();
  };

  const handleHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          오류가 발생했습니다
        </h1>
        <p className="text-gray-600 mb-6">
          페이지를 로드하는 중 문제가 발생했습니다.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleReset}
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg"
          >
            다시 시도
          </button>
          
          <button
            type="button"
            onClick={handleHome}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}