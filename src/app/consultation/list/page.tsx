'use client';

import { useState } from 'react';
import PageLayout from '../../../components/PageLayout';
import { Calendar, Clock, CheckCircle, AlertCircle, MessageSquare, User, Eye, EyeOff } from 'lucide-react';

// Mock consultation data
const mockConsultations = [
  {
    id: '1',
    userId: 'user1',
    userName: '김*희',
    date: '2024-01-15',
    preferredDate: '2024-01-20',
    preferredTime: '오후',
    procedures: ['실로스 실리프팅', '울쎄라'],
    message: '턱라인과 목주름이 고민입니다. 어떤 시술이 좋을까요?',
    status: 'confirmed',
    adminResponse: '안녕하세요. 상담 예약이 확정되었습니다. 1월 20일 오후 2시에 뵙겠습니다.',
    isPublic: true,
    views: 124
  },
  {
    id: '2',
    userId: 'user2',
    userName: '이*수',
    date: '2024-01-14',
    preferredDate: '2024-01-19',
    preferredTime: '오전',
    procedures: ['실로팻 - 복부', '실로팻 - 팔라인'],
    message: '복부와 팔 지방 제거를 동시에 하고 싶습니다.',
    status: 'pending',
    adminResponse: null,
    isPublic: true,
    views: 89
  },
  {
    id: '3',
    userId: 'user3',
    userName: '박*영',
    date: '2024-01-13',
    preferredDate: '2024-01-18',
    preferredTime: '오후',
    procedures: ['이마 눈썹 리프팅'],
    message: '이마 주름과 처진 눈썹이 고민입니다.',
    status: 'confirmed',
    adminResponse: '상담 예약 확정되었습니다. 추가 문의사항은 전화로 연락드리겠습니다.',
    isPublic: false,
    views: 0
  }
];

export default function ConsultationListPage() {
  const [consultations] = useState(mockConsultations);
  const [selectedConsultation, setSelectedConsultation] = useState<typeof mockConsultations[0] | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed'>('all');
  
  // Simulate current user
  const currentUserId = 'user1';
  const isAdmin = false; // Change to true to see admin view

  const filteredConsultations = consultations.filter(consultation => {
    if (!isAdmin && !consultation.isPublic && consultation.userId !== currentUserId) {
      return false;
    }
    if (filterStatus === 'all') return true;
    return consultation.status === filterStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            접수 완료
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            대기중
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-light text-slate-800 mb-4">
              상담 문의
            </h1>
            <div className="w-24 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-6"></div>
            <p className="text-lg font-elegant-sans font-light text-slate-700">
              {isAdmin ? '모든 상담 신청 내역을 확인하실 수 있습니다' : '상담 신청 현황을 확인하실 수 있습니다'}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white/70 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-white/50">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-6 py-2 rounded-lg font-elegant-sans text-sm transition-all ${
                  filterStatus === 'all'
                    ? 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-6 py-2 rounded-lg font-elegant-sans text-sm transition-all ${
                  filterStatus === 'pending'
                    ? 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                대기중
              </button>
              <button
                onClick={() => setFilterStatus('confirmed')}
                className={`px-6 py-2 rounded-lg font-elegant-sans text-sm transition-all ${
                  filterStatus === 'confirmed'
                    ? 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                접수 완료
              </button>
            </div>
          </div>

          {/* Consultation List */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-teal-smoke-50 to-elegant-50 border-b border-teal-smoke-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-elegant font-medium text-slate-700 uppercase tracking-wider">
                      번호
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-elegant font-medium text-slate-700 uppercase tracking-wider">
                      작성자
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-elegant font-medium text-slate-700 uppercase tracking-wider">
                      시술 내역
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-elegant font-medium text-slate-700 uppercase tracking-wider">
                      희망 날짜
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-elegant font-medium text-slate-700 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-elegant font-medium text-slate-700 uppercase tracking-wider">
                      공개
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-elegant font-medium text-slate-700 uppercase tracking-wider">
                      조회
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-smoke-100">
                  {filteredConsultations.map((consultation, index) => (
                    <tr
                      key={consultation.id}
                      onClick={() => setSelectedConsultation(consultation)}
                      className="hover:bg-teal-smoke-50/50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-elegant-sans">
                        {filteredConsultations.length - index}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-teal-smoke-400 mr-2" />
                          <span className="text-sm text-slate-700 font-elegant-sans">
                            {consultation.userName}
                          </span>
                          {consultation.userId === currentUserId && (
                            <span className="ml-2 text-xs text-teal-smoke-500 font-elegant-sans">(내 글)</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-700 font-elegant-sans">
                          {consultation.procedures.slice(0, 2).join(', ')}
                          {consultation.procedures.length > 2 && ` 외 ${consultation.procedures.length - 2}개`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-slate-600 font-elegant-sans">
                          <Calendar className="w-4 h-4 mr-1" />
                          {consultation.preferredDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(consultation.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {consultation.isPublic ? (
                          <Eye className="w-4 h-4 text-teal-smoke-400" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-teal-smoke-300" />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-elegant-sans">
                        {consultation.views}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Consultation Detail */}
          {selectedConsultation && (
            <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-display font-light text-slate-800 mb-2">
                    상담 상세 내용
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 font-elegant-sans">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {selectedConsultation.userName}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {selectedConsultation.date}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {selectedConsultation.views}회
                    </span>
                  </div>
                </div>
                {getStatusBadge(selectedConsultation.status)}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-elegant font-medium text-slate-700 mb-2">
                    희망 상담 일정
                  </h3>
                  <div className="flex items-center space-x-4 text-slate-600 font-elegant-sans">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {selectedConsultation.preferredDate}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedConsultation.preferredTime}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-elegant font-medium text-slate-700 mb-2">
                    상담 희망 시술
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedConsultation.procedures.map((procedure, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-teal-smoke-100 to-elegant-100 text-slate-700 rounded-lg text-sm font-elegant-sans"
                      >
                        {procedure}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-elegant font-medium text-slate-700 mb-2">
                    <MessageSquare className="inline w-4 h-4 mr-1" />
                    상담 내용
                  </h3>
                  <p className="text-slate-600 font-elegant-sans bg-teal-smoke-50 rounded-xl p-4">
                    {selectedConsultation.message}
                  </p>
                </div>

                {selectedConsultation.adminResponse && (
                  <div>
                    <h3 className="text-sm font-elegant font-medium text-slate-700 mb-2">
                      <CheckCircle className="inline w-4 h-4 mr-1 text-green-600" />
                      병원 답변
                    </h3>
                    <p className="text-slate-600 font-elegant-sans bg-green-50 rounded-xl p-4">
                      {selectedConsultation.adminResponse}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedConsultation(null)}
                className="mt-6 px-6 py-2 bg-teal-smoke-200 text-slate-700 rounded-xl font-elegant-sans hover:bg-teal-smoke-300 transition-colors"
              >
                닫기
              </button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}