'use client';

import Link from 'next/link';

export default function NotFound() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg mx-auto text-center">
        <div className="text-6xl font-bold text-teal-400 mb-4">404</div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          페이지를 찾을 수 없습니다
        </h1>
        
        <div className="space-y-3">
          <Link 
            href="/" 
            className="block w-full bg-teal-500 text-white py-2 px-4 rounded-lg"
          >
            홈으로 돌아가기
          </Link>
          
          <button
            type="button"
            onClick={handleBack}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
          >
            이전 페이지로
          </button>
        </div>
      </div>
    </div>
  );
}