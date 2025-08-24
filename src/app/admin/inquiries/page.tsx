'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail } from 'lucide-react';

interface ConsultationRequest {
  id: number;
  personalInfo: {
    name: string;
    phone: string;
    email: string;
  };
  selectedProcedures: string[];
  message: string;
  preferredDate: string;
  preferredTime: string;
  createdAt: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export default function InquiriesPage() {
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await fetch('/api/consultations');
      const result = await response.json();
      if (result.success) {
        setConsultations(result.data);
      }
    } catch (error) {
      console.error('상담 요청 조회 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredConsultations = consultations.filter(consultation => {
    if (statusFilter === 'all') return true;
    return consultation.status === statusFilter;
  });

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredConsultations.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredConsultations.map(c => c.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const formatTime = (timeCode: string) => {
    const timeMap: { [key: string]: string } = {
      morning: '오전 (10:00-12:00)',
      afternoon: '오후 (14:00-17:00)',
      evening: '저녁 (17:00-19:00)'
    };
    return timeMap[timeCode] || timeCode;
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: '대기중', color: 'bg-yellow-100 text-yellow-800' },
      completed: { label: '답변완료', color: 'bg-green-100 text-green-800' },
      cancelled: { label: '취소됨', color: 'bg-red-100 text-red-800' }
    };
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-gray-500">상담 요청을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">문의관리</h2>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">상담문의 목록</h3>
              <p className="text-sm text-gray-600">총 문의건수: {consultations.length}건</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                엑셀 다운로드
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
                답변하기
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="all">전체</option>
                <option value="pending">대기중</option>
                <option value="completed">답변완료</option>
                <option value="cancelled">취소됨</option>
              </select>
              <input 
                type="text" 
                placeholder="이름, 연락처, 내용 검색"
                className="border border-gray-300 rounded-md px-3 py-2 w-64"
              />
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
                검색
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={selectedItems.length === filteredConsultations.length && filteredConsultations.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    번호
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이름
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    연락처
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    선택 시술
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    희망 날짜/시간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    등록일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredConsultations.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                      등록된 상담 요청이 없습니다.
                    </td>
                  </tr>
                ) : (
                  filteredConsultations.map((consultation) => (
                    <tr key={consultation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          className="rounded"
                          checked={selectedItems.includes(consultation.id)}
                          onChange={() => toggleSelect(consultation.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {consultation.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1 text-gray-400" />
                          {consultation.personalInfo.name}
                        </div>
                        {consultation.personalInfo.email && (
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Mail className="w-3 h-3 mr-1" />
                            {consultation.personalInfo.email}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1 text-gray-400" />
                          {consultation.personalInfo.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                        <div className="space-y-1">
                          {consultation.selectedProcedures.slice(0, 2).map((procedure, index) => (
                            <div key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block mr-1">
                              {procedure}
                            </div>
                          ))}
                          {consultation.selectedProcedures.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{consultation.selectedProcedures.length - 2}개 더
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center text-xs">
                          <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                          {formatDate(consultation.preferredDate)}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTime(consultation.preferredTime)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(consultation.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(consultation.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-2">답변</button>
                        <button className="text-gray-600 hover:text-gray-900 mr-2">보기</button>
                        <button className="text-red-600 hover:text-red-900">삭제</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <select className="border border-gray-300 rounded-md px-3 py-2">
                <option>선택된 항목에 대해</option>
                <option>답변완료로 변경</option>
                <option>대기중으로 변경</option>
                <option>삭제</option>
              </select>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm">
                실행
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">이전</button>
              <button className="px-3 py-2 text-sm bg-indigo-600 text-white rounded">1</button>
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">2</button>
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">3</button>
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">다음</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}