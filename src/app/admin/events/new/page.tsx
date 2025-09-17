'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  PhotoIcon,
  CalendarDaysIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

interface EventForm {
  title: string;
  periodStart: string;
  periodEnd: string;
  content: string;
  posterFile: File | null;
  status: 'ongoing' | 'upcoming' | 'ended';
}

export default function NewEventPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<EventForm>({
    title: '',
    periodStart: '',
    periodEnd: '',
    content: '',
    posterFile: null,
    status: 'upcoming'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof EventForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // 에러 메시지 클리어
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePosterUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, poster: '파일 크기는 5MB 이하여야 합니다.' }));
        return;
      }

      // 파일 타입 확인
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, poster: '이미지 파일만 업로드 가능합니다.' }));
        return;
      }

      setFormData(prev => ({ ...prev, posterFile: file }));
      
      // 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        setPosterPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // 에러 클리어
      setErrors(prev => ({ ...prev, poster: '' }));
    }
  };

  const removePoster = () => {
    setFormData(prev => ({ ...prev, posterFile: null }));
    setPosterPreview(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = '이벤트 제목을 입력해주세요.';
    }

    if (!formData.periodStart) {
      newErrors.periodStart = '시작일을 선택해주세요.';
    }

    if (!formData.periodEnd) {
      newErrors.periodEnd = '종료일을 선택해주세요.';
    }

    if (formData.periodStart && formData.periodEnd && formData.periodStart > formData.periodEnd) {
      newErrors.periodEnd = '종료일은 시작일보다 늦어야 합니다.';
    }

    if (!formData.content.trim()) {
      newErrors.content = '이벤트 내용을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // 실제로는 FormData로 API 호출
      // const formDataToSend = new FormData();
      // formDataToSend.append('title', formData.title);
      // formDataToSend.append('periodStart', formData.periodStart);
      // formDataToSend.append('periodEnd', formData.periodEnd);
      // formDataToSend.append('content', formData.content);
      // formDataToSend.append('status', formData.status);
      // if (formData.posterFile) {
      //   formDataToSend.append('poster', formData.posterFile);
      // }
      // 
      // await createEvent(formDataToSend);
      
      // 임시 처리: 성공했다고 가정
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('이벤트가 성공적으로 생성되었습니다.');
      router.push('/admin/events');
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('이벤트 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/events"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">새 이벤트 생성</h1>
            <p className="text-sm text-gray-600 mt-1">
              새로운 이벤트를 등록하고 관리하세요
            </p>
          </div>
        </div>
      </div>

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 메인 정보 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 기본 정보 */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h2>
              
              {/* 이벤트 제목 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이벤트 제목 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="예: 실로스 실리프팅 특별 이벤트"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* 이벤트 기간 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    시작일 *
                  </label>
                  <input
                    type="date"
                    value={formData.periodStart}
                    onChange={(e) => handleInputChange('periodStart', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.periodStart ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.periodStart && (
                    <p className="text-red-600 text-sm mt-1">{errors.periodStart}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    종료일 *
                  </label>
                  <input
                    type="date"
                    value={formData.periodEnd}
                    onChange={(e) => handleInputChange('periodEnd', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.periodEnd ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.periodEnd && (
                    <p className="text-red-600 text-sm mt-1">{errors.periodEnd}</p>
                  )}
                </div>
              </div>

              {/* 상태 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이벤트 상태
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="upcoming">진행예정</option>
                  <option value="ongoing">진행중</option>
                  <option value="ended">종료</option>
                </select>
              </div>

              {/* 이벤트 내용 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이벤트 내용 *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={6}
                  placeholder="이벤트에 대한 상세 설명을 입력하세요..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                    errors.content ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.content && (
                  <p className="text-red-600 text-sm mt-1">{errors.content}</p>
                )}
              </div>
            </div>
          </div>

          {/* 포스터 업로드 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">포스터 이미지</h2>
              
              {posterPreview ? (
                <div className="relative">
                  <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gray-100 mb-4">
                    <img 
                      src={posterPreview} 
                      alt="포스터 미리보기" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removePoster}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      {formData.posterFile?.name}
                    </p>
                    <label className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors">
                      <PhotoIcon className="w-4 h-4 mr-1" />
                      다른 이미지 선택
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePosterUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="aspect-[4/5] rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
                    <div>
                      <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">포스터 이미지</p>
                    </div>
                  </div>
                  <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                    <PhotoIcon className="w-4 h-4 mr-2" />
                    이미지 업로드
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePosterUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
              
              {errors.poster && (
                <p className="text-red-600 text-sm mt-2">{errors.poster}</p>
              )}
              
              <div className="mt-4 text-xs text-gray-500">
                <p>• 권장 크기: 4:5 비율</p>
                <p>• 최대 파일 크기: 5MB</p>
                <p>• 지원 형식: JPG, PNG, GIF</p>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Link
            href="/admin/events"
            className="flex items-center space-x-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
            <span>취소</span>
          </Link>
          
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <CheckIcon className="w-4 h-4" />
            <span>{isLoading ? '생성 중...' : '이벤트 생성'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}