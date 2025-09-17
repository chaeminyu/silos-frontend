'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  ClockIcon,
  ChatBubbleLeftEllipsisIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Consultation {
  id: number;
  name: string;
  phone: string;
  email: string;
  procedures: string[];
  message: string;
  preferredDate: string;
  preferredTime: string;
  status: 'waiting' | 'completed';
  createdAt: string;
  updatedAt: string;
  adminComment?: string;
  needsFollowUp?: boolean;
  isRegistered: boolean;
}


const statusConfig = {
  waiting: { 
    label: '대기 중', 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    buttonColor: 'bg-yellow-600 hover:bg-yellow-700'
  },
  completed: { 
    label: '접수 완룼', 
    color: 'bg-green-100 text-green-800 border-green-200',
    buttonColor: 'bg-green-600 hover:bg-green-700'
  }
};

const timeSlots = {
  morning: '오전 (10:00-12:00)',
  afternoon: '오후 (14:00-17:00)', 
  evening: '저녁 (17:00-19:00)'
};

interface ConsultationDetailProps {
  params: {
    id: string;
  };
}

export default function ConsultationDetail({ params }: ConsultationDetailProps) {
  const router = useRouter();
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState('');
  const [editedStatus, setEditedStatus] = useState<string>('');
  const [editedFollowUp, setEditedFollowUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch consultation data
  const fetchConsultation = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/consultations/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.success && data.data) {
        const consultationData = data.data;
        setConsultation(consultationData);
        setEditedComment(consultationData.adminComment || '');
        setEditedStatus(consultationData.status);
        setEditedFollowUp(consultationData.needsFollowUp || false);
      }
    } catch (error) {
      console.error('상담 데이터 로드 오류:', error);
    }
  };

  useEffect(() => {
    fetchConsultation();
  }, [params.id]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/consultations/${params.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: editedStatus,
          adminComment: editedComment,
          needsFollowUp: editedFollowUp
        })
      });
      
      const data = await response.json();
      if (data.success) {
        if (consultation) {
          setConsultation({
            ...consultation,
            status: editedStatus as any,
            adminComment: editedComment,
            needsFollowUp: editedFollowUp,
            updatedAt: new Date().toLocaleString('ko-KR')
          });
        }
        setIsEditing(false);
      } else {
        console.error('상담 업데이트 실패:', data.message);
      }
    } catch (error) {
      console.error('Failed to update consultation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (consultation) {
      setEditedComment(consultation.adminComment || '');
      setEditedStatus(consultation.status);
      setEditedFollowUp(consultation.needsFollowUp || false);
    }
    setIsEditing(false);
  };

  if (!consultation) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/consultations"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              상담 신청 상세보기 #{consultation.id}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {consultation.createdAt}에 신청됨
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusConfig[consultation.status].color}`}>
            {statusConfig[consultation.status].label}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 메인 정보 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 신청자 정보 */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">신청자 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <UserIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">이름</p>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">{consultation.name}</p>
                    {consultation.isRegistered && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        회원
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">연락처</p>
                  <p className="font-medium">{consultation.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 md:col-span-2">
                <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">이메일</p>
                  <p className="font-medium">{consultation.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 상담 정보 */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">상담 정보</h2>
            
            {/* 희망 시술 */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">희망 시술</h3>
              <div className="flex flex-wrap gap-2">
                {consultation.procedures.map((procedure, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full"
                  >
                    {procedure}
                  </span>
                ))}
              </div>
            </div>

            {/* 희망 일시 */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">희망 상담 일시</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{consultation.preferredDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">
                    {timeSlots[consultation.preferredTime as keyof typeof timeSlots]}
                  </span>
                </div>
              </div>
            </div>

            {/* 상담 메시지 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">상담 메시지</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-900 leading-relaxed">{consultation.message}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 관리자 작업 패널 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border p-6 sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">관리자 작업</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                {/* 상태 변경 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    상태 변경
                  </label>
                  <select
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="waiting">대기 중</option>
                    <option value="completed">접수 완료</option>
                  </select>
                </div>

                {/* 관리자 코멘트 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    관리자 코멘트
                  </label>
                  <textarea
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                    rows={4}
                    placeholder="상담 관련 메모나 고객에게 전달할 메시지를 입력하세요..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>

                {/* 후속 조치 필요 */}
                {editedStatus === 'completed' && (
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={editedFollowUp}
                        onChange={(e) => setEditedFollowUp(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">후속 조치 필요</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      상담 완료 후 추가 연락이나 관리가 필요한 경우 체크하세요.
                    </p>
                  </div>
                )}

                {/* 버튼 */}
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    <CheckIcon className="w-4 h-4" />
                    <span>{isLoading ? '저장중...' : '저장'}</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center space-x-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                    <span>취소</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 현재 상태 */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">현재 상태</h3>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${statusConfig[consultation.status].color}`}>
                    {statusConfig[consultation.status].label}
                  </span>
                </div>

                {/* 관리자 코멘트 */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">관리자 코멘트</h3>
                  {consultation.adminComment ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-900">{consultation.adminComment}</p>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-500">아직 코멘트가 없습니다.</p>
                    </div>
                  )}
                </div>

                {/* 후속 조치 상태 */}
                {consultation.status === 'completed' && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">후속 조치</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      consultation.needsFollowUp 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {consultation.needsFollowUp ? '조치 필요' : '완료'}
                    </span>
                  </div>
                )}

                {/* 최종 수정일 */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">최종 수정일</h3>
                  <p className="text-sm text-gray-600">{consultation.updatedAt}</p>
                </div>
              </div>
            )}

            {/* 빠른 작업 버튼들 */}
            {!isEditing && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">빠른 작업</h3>
                <div className="space-y-2">
                  {consultation.status === 'waiting' && (
                    <button
                      onClick={() => {
                        setEditedStatus('completed');
                        setIsEditing(true);
                      }}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      상담 접수 완료
                    </button>
                  )}
                  {consultation.status === 'completed' && (
                    <button
                      onClick={() => {
                        setEditedStatus('waiting');
                        setIsEditing(true);
                      }}
                      className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                    >
                      대기 상태로 변경
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}