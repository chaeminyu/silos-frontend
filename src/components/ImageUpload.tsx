'use client';

import { useState } from 'react';
import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ImageUploadProps {
  folder?: string;
  onUploadSuccess?: (imageUrl: string) => void;
  onUploadError?: (error: string) => void;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  placeholder?: string;
  currentImageUrl?: string;
}

export default function ImageUpload({
  folder = 'general',
  onUploadSuccess,
  onUploadError,
  maxSizeMB = 10,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  placeholder = '이미지를 업로드하려면 클릭하거나 드래그하세요',
  currentImageUrl
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const [dragOver, setDragOver] = useState(false);

  const validateFile = (file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      return `지원되지 않는 파일 형식입니다. 지원 형식: ${acceptedFormats.join(', ')}`;
    }
    
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `파일 크기가 ${maxSizeMB}MB를 초과합니다.`;
    }
    
    return null;
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    
    try {
      const validationError = validateFile(file);
      if (validationError) {
        onUploadError?.(validationError);
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/upload`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setPreviewUrl(result.data.url);
        onUploadSuccess?.(result.data.url);
      } else {
        onUploadError?.(result.message || '업로드에 실패했습니다.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      onUploadError?.('업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
  };

  const removeImage = () => {
    setPreviewUrl(null);
    onUploadSuccess?.('');
  };

  return (
    <div className="w-full">
      {previewUrl ? (
        <div className="relative group">
          <img
            src={previewUrl}
            alt="업로드된 이미지"
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragOver
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept={acceptedFormats.join(',')}
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          
          <div className="space-y-2">
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            
            {isUploading ? (
              <div className="text-blue-600">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p>업로드 중...</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600">{placeholder}</p>
                <p className="text-xs text-gray-400">
                  최대 {maxSizeMB}MB, {acceptedFormats.map(format => format.split('/')[1]).join(', ')} 형식
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}