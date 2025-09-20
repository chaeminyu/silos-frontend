'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  EyeIcon,
  DocumentTextIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface CompletedConsultation {
  id: number;
  // 상담 신청 정보 (consultation/request)
  name: string;
  phone: string;
  email: string;
  procedures: string[];
  message: string;
  preferredDate: string;
  preferredTime: string;
  
  // 관리 정보
  completedDate: string;
  adminComment?: string; // 고객에게 보이는 코멘트
  adminMemo?: string; // 관리자 전용 메모
  needsFollowUp?: boolean; // 단순 플래그
  isRegistered: boolean;
  createdAt: string;
}

const mockCompletedConsultations: CompletedConsultation[] = [
  {
    id: 3,
    name: '이서연',
    phone: '010-5555-7777',
    email: 'seoyeon@example.com',
    procedures: ['콜라겐 필러', '레디어스'],
    message: '볼륨 개선 시술 상담 희망합니다.',
    preferredDate: '2025-01-18',
    preferredTime: 'morning',
    completedDate: '2025-01-18',
    adminComment: '상담 완료. 시술 예약은 별도 연락드리겠습니다.',
    adminMemo: '알레르기 반응 주의',
    needsFollowUp: true,
    isRegistered: true,
    createdAt: '2025-01-10 16:45'
  },
  {
    id: 5,
    name: '정하윤',
    phone: '010-7777-8888',
    email: 'hayoon@example.com',
    procedures: ['스킨보톡스', '물광주사'],
    message: '피부 보습과 탄력 개선을 위해 상담받고 싶습니다.',
    preferredDate: '2025-01-16',
    preferredTime: 'afternoon',
    completedDate: '2025-01-16',
    adminComment: '피부 상태 양호. 2주 후 재방문 권유.',
    adminMemo: '민감성 피부로 주의 필요',
    needsFollowUp: false,
    isRegistered: false,
    createdAt: '2025-01-12 11:20'
  },
  {
    id: 6,
    name: '김수진',
    phone: '010-2222-3333',
    email: 'sujin@example.com',
    procedures: ['실로스 실리프팅'],
    message: '얼굴 전체 리프팅에 대해 상담받고 싶습니다.',
    preferredDate: '2025-01-15',
    preferredTime: 'morning',
    completedDate: '2025-01-15',
    adminComment: '상담 완료. 시술 일정 조율 중.',
    needsFollowUp: true,
    isRegistered: true,
    createdAt: '2025-01-08 09:15'
  },
  {
    id: 7,
    name: '박민수',
    phone: '010-4444-5555',
    email: 'minsu@example.com',
    procedures: ['미니리프팅', '콜라겐 필러'],
    message: '자연스러운 리프팅과 볼륨감을 원합니다.',
    preferredDate: '2025-01-12',
    preferredTime: 'evening',
    completedDate: '2025-01-12',
    adminComment: '상담 후 시술 보류. 재상담 예정.',
    adminMemo: '예산 고려 중, 3월 재접촉 예정',
    needsFollowUp: true,
    isRegistered: false,
    createdAt: '2025-01-05 14:30'
  }
];

export default function CompletedConsultationsPage() {
  const consultations = mockCompletedConsultations;
  const [filteredConsultations, setFilteredConsultations] = useState<CompletedConsultation[]>(mockCompletedConsultations);
  const [searchTerm, setSearchTerm] = useState('');
  const [followUpFilter, setFollowUpFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<'all' | 'week' | 'month' | '3months'>('all');

  // 필터링 로직
  useEffect(() => {
    let filtered = consultations;

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

    // 후속 조치 필터
    if (followUpFilter !== 'all') {
      filtered = filtered.filter(consultation => 
        followUpFilter === 'required' ? consultation.needsFollowUp : !consultation.needsFollowUp
      );
    }

    // 날짜 범위 필터
    if (dateRange !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (dateRange) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case '3months':
          cutoffDate.setMonth(now.getMonth() - 3);
          break;
      }
      
      filtered = filtered.filter(consultation => 
        new Date(consultation.completedDate) >= cutoffDate
      );
    }

    setFilteredConsultations(filtered);
  }, [searchTerm, followUpFilter, dateRange, consultations]);

  // 통계 계산
  const stats = {
    total: consultations.length,
    thisMonth: consultations.filter(c => {
      const completedDate = new Date(c.completedDate);
      const now = new Date();
      return completedDate.getMonth() === now.getMonth() && 
             completedDate.getFullYear() === now.getFullYear();
    }).length,
    followUpRequired: consultations.filter(c => c.needsFollowUp).length,
    registeredMembers: consultations.filter(c => c.isRegistered).length
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">상담 완료 내역</h1>
          <p className="text-sm text-gray-600 mt-1">
            완료된 상담의 결과와 후속 조치를 관리합니다
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/consultations/analytics"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ChartBarIcon className="w-4 h-4" />
            <span>상담 분석</span>
          </Link>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">총 완료 상담</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <CalendarDaysIcon className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">이번 달</p>
              <p className="text-2xl font-bold text-gray-900">{stats.thisMonth}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <ClockIcon className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">후속 조치 필요</p>
              <p className="text-2xl font-bold text-gray-900">{stats.followUpRequired}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <UserIcon className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">회원 상담</p>
              <p className="text-2xl font-bold text-gray-900">{stats.registeredMembers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg border p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 검색 */}
          <div className="lg:col-span-2">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="이름, 전화번호, 이메일로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* 후속 조치 필터 */}
          <div>
            <select
              value={followUpFilter}
              onChange={(e) => setFollowUpFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">모든 상태</option>
              <option value="required">후속 조치 필요</option>
              <option value="completed">완료</option>
            </select>
          </div>

          {/* 날짜 범위 필터 */}
          <div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">전체 기간</option>
              <option value="week">최근 1주일</option>
              <option value="month">최근 1개월</option>
              <option value="3months">최근 3개월</option>
            </select>
          </div>
        </div>
      </div>

      {/* 상담 완료 목록 */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {filteredConsultations.length === 0 ? (
          <div className="text-center py-12">
            <DocumentTextIcon className="mx-auto w-12 h-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {searchTerm || followUpFilter !== 'all' || dateRange !== 'all'
                ? '검색 조건에 맞는 완료된 상담이 없습니다.'
                : '아직 완료된 상담이 없습니다.'
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    고객 정보
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상담 내용
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    완료일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    후속 조치
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredConsultations.map((consultation) => (
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
                          </div>
                          <p className="text-sm text-gray-600">{consultation.phone}</p>
                          {consultation.adminMemo && (
                            <p className="text-xs text-orange-600 mt-1">
                              📝 {consultation.adminMemo}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {consultation.procedures.map((procedure, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mr-1"
                          >
                            {procedure}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600">{consultation.completedDate}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {consultation.needsFollowUp ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          조치 필요
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          완료
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/admin/consultations/${consultation.id}`}
                        className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span>상세보기</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}