export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* 로딩 스피너 */}
        <div className="relative mb-4">
          <div className="w-16 h-16 border-4 border-primary-200 rounded-full animate-spin border-t-primary-500 mx-auto"></div>
        </div>
        
        {/* 로딩 텍스트 */}
        <h2 className="text-lg font-medium text-gray-900 mb-2">
          로딩 중...
        </h2>
        <p className="text-sm text-gray-600">
          잠시만 기다려주세요
        </p>
        
        {/* 실로스 브랜드 로고 영역 (나중에 실제 로고로 교체) */}
        <div className="mt-8">
          <div className="w-8 h-8 bg-primary-400 rounded-lg mx-auto mb-2"></div>
          <p className="text-xs text-gray-500">실로스 성형외과</p>
        </div>
      </div>
    </div>
  );
}