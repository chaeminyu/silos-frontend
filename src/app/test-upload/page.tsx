'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';

export default function TestUploadPage() {
  const [profileImage] = useState<string>('');
  const [beforeImage] = useState<string>('');
  const [afterImage] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleUploadSuccess = (type: string) => (imageUrl: string) => {
    setMessage(`${type} 이미지 업로드 성공: ${imageUrl}`);
    console.log(`${type} uploaded:`, imageUrl);
  };

  const handleUploadError = (type: string) => (error: string) => {
    setMessage(`${type} 이미지 업로드 실패: ${error}`);
    console.error(`${type} upload error:`, error);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">이미지 업로드 테스트</h1>
      
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes('실패') 
            ? 'bg-red-100 border border-red-400 text-red-700'
            : 'bg-green-100 border border-green-400 text-green-700'
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 프로필 이미지 업로드 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">프로필 이미지</h2>
          <ImageUpload
            folder="profiles"
            onUploadSuccess={handleUploadSuccess('프로필')}
            onUploadError={handleUploadError('프로필')}
            placeholder="프로필 이미지를 업로드하세요"
            currentImageUrl={profileImage}
          />
        </div>

        {/* Before 이미지 업로드 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Before 이미지</h2>
          <ImageUpload
            folder="before-after"
            onUploadSuccess={handleUploadSuccess('Before')}
            onUploadError={handleUploadError('Before')}
            placeholder="시술 전 이미지를 업로드하세요"
            currentImageUrl={beforeImage}
          />
        </div>

        {/* After 이미지 업로드 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">After 이미지</h2>
          <ImageUpload
            folder="before-after"
            onUploadSuccess={handleUploadSuccess('After')}
            onUploadError={handleUploadError('After')}
            placeholder="시술 후 이미지를 업로드하세요"
            currentImageUrl={afterImage}
          />
        </div>
      </div>

      {/* 업로드된 이미지 URL 표시 */}
      <div className="mt-8 bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">업로드된 이미지 URL</h3>
        <div className="space-y-2 text-sm">
          <div>
            <strong>프로필:</strong> 
            <span className="ml-2 text-gray-600 break-all">{profileImage || '없음'}</span>
          </div>
          <div>
            <strong>Before:</strong> 
            <span className="ml-2 text-gray-600 break-all">{beforeImage || '없음'}</span>
          </div>
          <div>
            <strong>After:</strong> 
            <span className="ml-2 text-gray-600 break-all">{afterImage || '없음'}</span>
          </div>
        </div>
      </div>

      {/* API 상태 표시 */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          업로드 API: {process.env.NEXT_PUBLIC_API_URL}/files/upload
        </p>
      </div>
    </div>
  );
}