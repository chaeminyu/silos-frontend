'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AboutError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('About Page Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          페이지 오류
        </h1>
        <p className="text-gray-600 mb-6">
          About 페이지를 로드하는 중 문제가 발생했습니다.
        </p>
        <button
          onClick={reset}
          className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}