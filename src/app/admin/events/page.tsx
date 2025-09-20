'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CalendarDaysIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

interface Event {
  id: number;
  title: string;
  periodStart: string;
  periodEnd: string;
  posterUrl?: string;
  status: 'ongoing' | 'upcoming' | 'ended';
  viewCount: number;
  content?: string;
  createdAt: string;
  updatedAt: string;
}


const statusConfig = {
  ongoing: { 
    label: '진행중', 
    color: 'bg-green-100 text-green-800',
    borderColor: 'border-green-200'
  },
  upcoming: { 
    label: '진행예정', 
    color: 'bg-blue-100 text-blue-800',
    borderColor: 'border-blue-200'
  },
  ended: { 
    label: '종료', 
    color: 'bg-gray-100 text-gray-800',
    borderColor: 'border-gray-200'
  }
};

export default function EventsManagementPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch events from API
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/events', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setEvents(data.data);
      } else {
        console.error('이벤트 데이터 로드 실패:', data.message);
      }
    } catch (error) {
      console.error('이벤트 데이터 로드 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // 필터링 로직
  useEffect(() => {
    let filtered = events;

    // 검색어 필터
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 상태 필터
    if (statusFilter !== 'all') {
      filtered = filtered.filter(event => event.status === statusFilter);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, statusFilter, events]);

  // 상태별 카운트 (필터링된 데이터 기준)
  const statusCounts = {
    all: filteredEvents.length,
    ongoing: filteredEvents.filter(e => e.status === 'ongoing').length,
    upcoming: filteredEvents.filter(e => e.status === 'upcoming').length,
    ended: filteredEvents.filter(e => e.status === 'ended').length
  };

  const handleDelete = async (id: number) => {
    if (confirm('정말 이 이벤트를 삭제하시겠습니까?')) {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/admin/events/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        if (data.success) {
          setEvents(events.filter(event => event.id !== id));
        } else {
          console.error('이벤트 삭제 실패:', data.message);
        }
      } catch (error) {
        console.error('Failed to delete event:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">이벤트 관리</h1>
          <p className="text-sm text-gray-600 mt-1">
            총 {events.length}개의 이벤트가 등록되어 있습니다
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/events/new"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            <span>새 이벤트</span>
          </Link>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <CalendarDaysIcon className="w-8 h-8 text-blue-500" />
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
                placeholder="이벤트 제목, 내용으로 검색..."
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
              <option value="ongoing">진행중</option>
              <option value="upcoming">진행예정</option>
              <option value="ended">종료</option>
            </select>
          </div>
        </div>
      </div>

      {/* 이벤트 목록 */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <CalendarDaysIcon className="mx-auto w-12 h-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {searchTerm || statusFilter !== 'all' 
                ? '검색 조건에 맞는 이벤트가 없습니다.' 
                : '등록된 이벤트가 없습니다.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이벤트 정보
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이벤트 기간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    조회수
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    등록일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {event.posterUrl ? (
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              <PhotoIcon className="w-8 h-8 text-gray-400" />
                            </div>
                          ) : (
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              <CalendarDaysIcon className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 line-clamp-2">
                            {event.title}
                          </p>
                          {event.content && (
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {event.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {event.periodStart} ~ {event.periodEnd}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${statusConfig[event.status].color} ${statusConfig[event.status].borderColor}`}>
                        {statusConfig[event.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        {event.viewCount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {event.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={`/events/${event.id}`}
                          target="_blank"
                          className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                        >
                          <EyeIcon className="w-4 h-4" />
                          <span>보기</span>
                        </Link>
                        <Link
                          href={`/admin/events/${event.id}/edit`}
                          className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                        >
                          <PencilIcon className="w-4 h-4" />
                          <span>수정</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(event.id)}
                          disabled={isLoading}
                          className="text-red-600 hover:text-red-900 flex items-center space-x-1 disabled:opacity-50"
                        >
                          <TrashIcon className="w-4 h-4" />
                          <span>삭제</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 이벤트 상담 신청 현황 */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">이벤트 상담 신청 현황</h2>
          <p className="text-sm text-gray-600 mt-1">각 이벤트별 상담 신청 건수를 확인하세요</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이벤트명
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  총 신청
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  대기중
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  확정
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  완료
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.filter(event => event.status === 'ongoing' || event.status === 'upcoming').map((event) => {
                // 해당 이벤트의 상담 신청 통계 (실제로는 API에서 가져와야 함)
                const eventConsultations = {
                  total: event.id === 1 ? 3 : event.id === 2 ? 2 : 0,
                  pending: event.id === 1 ? 1 : event.id === 2 ? 0 : 0,
                  confirmed: event.id === 1 ? 1 : event.id === 2 ? 1 : 0,
                  completed: event.id === 1 ? 1 : event.id === 2 ? 1 : 0
                };
                
                return (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {event.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {event.periodStart} ~ {event.periodEnd}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {eventConsultations.total}건
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {eventConsultations.pending}건
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {eventConsultations.confirmed}건
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {eventConsultations.completed}건
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/admin/consultations?eventId=${event.id}`}
                        className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span>상담 보기</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}