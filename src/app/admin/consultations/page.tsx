'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  ChatBubbleLeftEllipsisIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  XCircleIcon,
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
  isRegistered: boolean;
  // 이벤트 상담 관련 필드
  isEventConsultation?: boolean;
  eventId?: string;
  eventTitle?: string;
}


const statusConfig = {
  waiting: { 
    label: '대기 중', 
    color: 'bg-yellow-100 text-yellow-800',
    icon: ExclamationTriangleIcon 
  },
  completed: { 
    label: '접수 완료', 
    color: 'bg-green-100 text-green-800',
    icon: CheckCircleIcon 
  }
};

const timeSlots = {
  morning: '오전 (10:00-12:00)',
  afternoon: '오후 (14:00-17:00)', 
  evening: '저녁 (17:00-19:00)'
};

export default function ConsultationsPage() {
  const searchParams = useSearchParams();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [filteredConsultations, setFilteredConsultations] = useState<Consultation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch consultations from API
  const fetchConsultations = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/consultations', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setConsultations(data.data);
      } else {
        console.error('상담 데이터 로드 실패:', data.message);
      }
    } catch (error) {
      console.error('상담 데이터 로드 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load consultations on component mount
  useEffect(() => {
    fetchConsultations();
  }, []);
  
  // URL 파라미터에서 필터 정보 가져오기
  const userIdFilter = searchParams.get('userId');
  const eventIdFilter = searchParams.get('eventId');

  // 필터링 로직
  useEffect(() => {
    let filtered = consultations;

    // URL 파라미터 필터 (userId 또는 eventId)
    if (userIdFilter) {
      // 특정 회원의 상담 이력만 필터링 (실제로는 API에서 userId로 매칭해야 함)
      // 여기서는 mock 데이터에서 이름으로 매칭
      const userNames = ['김민지', '박지원', '이서연', '정하림']; // userId별 매핑 필요
      const userNameMap: { [key: string]: string } = {
        'minji123': '김민지',
        'jiwon456': '박지원', 
        'seoyeon789': '이서연',
        'harim999': '정하림'
      };
      const userName = userNameMap[userIdFilter];
      if (userName) {
        filtered = filtered.filter(consultation => consultation.name === userName);
      }
    }
    
    if (eventIdFilter) {
      // 특정 이벤트의 상담만 필터링
      filtered = filtered.filter(consultation => 
        consultation.isEventConsultation && consultation.eventId === eventIdFilter
      );
    }

    // 검색어 필터
    if (searchTerm) {
      filtered = filtered.filter(consultation =>
        consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.phone.includes(searchTerm) ||
        consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.procedures.some(proc => 
          proc.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // 상태 필터
    if (statusFilter !== 'all') {
      filtered = filtered.filter(consultation => consultation.status === statusFilter);
    }

    setFilteredConsultations(filtered);
  }, [searchTerm, statusFilter, consultations, userIdFilter, eventIdFilter]);

  // 상태별 카운트 (필터링된 데이터 기준)
  const statusCounts = useMemo(() => ({
    all: filteredConsultations.length,
    waiting: filteredConsultations.filter(c => c.status === 'waiting').length,
    completed: filteredConsultations.filter(c => c.status === 'completed').length
  }), [filteredConsultations]);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {userIdFilter ? `회원별 상담 이력` : eventIdFilter ? `이벤트별 상담 신청` : '상담 신청 관리'}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {userIdFilter ? (
              <>
                {userIdFilter}님의 상담 이력 - 총 {filteredConsultations.length}건
                {filteredConsultations.length > 0 && (
                  <Link href="/admin/consultations" className="ml-2 text-blue-600 hover:text-blue-800 text-xs">
                    [전체 상담 보기]
                  </Link>
                )}
              </>
            ) : eventIdFilter ? (
              <>
                해당 이벤트 상담 신청 - 총 {filteredConsultations.length}건
                <Link href="/admin/consultations" className="ml-2 text-blue-600 hover:text-blue-800 text-xs">
                  [전체 상담 보기]
                </Link>
              </>
            ) : (
              `총 ${filteredConsultations.length}건의 상담 신청이 있습니다`
            )}
          </p>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div
            key={status}
            className={`bg-white rounded-lg border p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
              statusFilter === status ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setStatusFilter(status)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {status === 'all' ? '전체' : statusConfig[status as keyof typeof statusConfig]?.label}
                </p>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* 검색 */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="이름, 전화번호, 이메일, 시술명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* 상태 필터 */}
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">전체 상태</option>
              <option value="waiting">대기 중</option>
              <option value="completed">접수 완료</option>
            </select>
          </div>
        </div>
      </div>

      {/* 상담 목록 */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {filteredConsultations.length === 0 ? (
          <div className="text-center py-12">
            <ChatBubbleLeftEllipsisIcon className="mx-auto w-12 h-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {searchTerm || statusFilter !== 'all' 
                ? '검색 조건에 맞는 상담 신청이 없습니다.' 
                : '아직 상담 신청이 없습니다.'
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    신청자 정보
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    희망 시술
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상담 희망일시
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    신청일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredConsultations.map((consultation) => {
                  const StatusIcon = statusConfig[consultation.status].icon;
                  return (
                    <tr key={consultation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <UserIcon className="w-8 h-8 text-gray-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-gray-900">
                                {consultation.name}
                              </p>
                              {consultation.isRegistered && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                  회원
                                </span>
                              )}
                              {consultation.isEventConsultation && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                  이벤트
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-1 mt-1">
                              <PhoneIcon className="w-4 h-4 text-gray-400" />
                              <p className="text-sm text-gray-600">{consultation.phone}</p>
                            </div>
                            <div className="flex items-center space-x-1 mt-1">
                              <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                              <p className="text-sm text-gray-600">{consultation.email}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {consultation.procedures.map((procedure, index) => (
                            <span
                              key={index}
                              className={`inline-block px-2 py-1 text-xs font-medium rounded-full mr-1 ${
                                consultation.isEventConsultation 
                                  ? 'bg-indigo-100 text-indigo-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {procedure}
                            </span>
                          ))}
                          {consultation.isEventConsultation && (
                            <div className="text-xs text-gray-500 mt-1">
                              이벤트: {consultation.eventTitle}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1 text-sm text-gray-900">
                          <CalendarDaysIcon className="w-4 h-4 text-gray-400" />
                          <span>{consultation.preferredDate}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                          <ClockIcon className="w-4 h-4 text-gray-400" />
                          <span>{timeSlots[consultation.preferredTime as keyof typeof timeSlots]}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <StatusIcon className="w-4 h-4" />
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[consultation.status].color}`}>
                            {statusConfig[consultation.status].label}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {consultation.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            href={`/admin/consultations/${consultation.id}`}
                            className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                          >
                            <EyeIcon className="w-4 h-4" />
                            <span>상세보기</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}