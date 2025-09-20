'use client';

import { useState, useEffect } from 'react';
import { 
  CalendarIcon,
  EyeIcon,
  FireIcon
  // ChartBarIcon - available if needed
} from '@heroicons/react/24/outline';

export default function EventAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [eventStats, setEventStats] = useState<any>({
    eventStats: []
  });

  // 이벤트 통계 데이터 가져오기
  const fetchEventStatistics = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/statistics?type=events', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setEventStats(data.data);
      } else {
        console.error('이벤트 통계 데이터 로드 실패:', data.message);
      }
    } catch (error) {
      console.error('이벤트 통계 데이터 로드 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEventStatistics();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">진행중</span>;
      case 'SCHEDULED':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">예정</span>;
      case 'ENDED':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">종료</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">이벤트 통계</h1>
          <p className="text-sm text-gray-600 mt-1">
            이벤트별 조회수 및 참여 현황을 확인하세요
          </p>
        </div>
        
        {/* 새로고침 버튼 */}
        <button
          onClick={fetchEventStatistics}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? '로딩중...' : '새로고침'}
        </button>
      </div>

      {/* 조회수 기준 인기 이벤트 TOP 5 */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">조회수 기준 인기 이벤트 TOP 5</h2>
        
        {eventStats.eventStats && eventStats.eventStats.length > 0 ? (
          <div className="space-y-4">
            {eventStats.eventStats.map((event: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{event.event}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <EyeIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">조회수: {event.viewCount}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {event.status && getStatusBadge(event.status)}
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{event.viewCount}</p>
                    <p className="text-xs text-gray-500">조회</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {isLoading ? '데이터를 불러오는 중...' : '이벤트 통계 데이터가 없습니다.'}
          </div>
        )}
      </div>

      {/* 참여/신청 기준 인기 이벤트 TOP 5 */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">참여/신청 기준 인기 이벤트 TOP 5</h2>
        
        {eventStats.eventParticipationStats && eventStats.eventParticipationStats.length > 0 ? (
          <div className="space-y-4">
            {eventStats.eventParticipationStats.map((event: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{event.event}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <FireIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">참여: {event.participationCount}건</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {event.status && getStatusBadge(event.status)}
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{event.participationCount}</p>
                    <p className="text-xs text-gray-500">참여</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {isLoading ? '데이터를 불러오는 중...' : '이벤트 참여 데이터가 없습니다.'}
          </div>
        )}
      </div>

      {/* 이벤트 요약 */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">이벤트 요약</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="w-8 h-8 text-blue-500" />
              <span className="text-sm text-gray-600">전체 이벤트</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">
              {eventStats.eventStats ? eventStats.eventStats.length : 0}개
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <EyeIcon className="w-8 h-8 text-green-500" />
              <span className="text-sm text-gray-600">총 조회수</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">
              {eventStats.eventStats ? eventStats.eventStats.reduce((sum: number, event: any) => sum + event.viewCount, 0) : 0}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FireIcon className="w-8 h-8 text-red-500" />
              <span className="text-sm text-gray-600">평균 조회수</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">
              {eventStats.eventStats && eventStats.eventStats.length > 0 
                ? Math.round(eventStats.eventStats.reduce((sum: number, event: any) => sum + event.viewCount, 0) / eventStats.eventStats.length)
                : 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}