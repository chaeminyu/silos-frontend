'use client';

import { useState, useEffect } from 'react';
import { 
  CalendarIcon,
  ArrowTrendingUpIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isLoading, setIsLoading] = useState(false);
  const [statistics, setStatistics] = useState<any>({
    totalConsultations: 0,
    waitingConsultations: 0,
    completedConsultations: 0,
    totalMembers: 0,
    activeMembers: 0,
    activePromotions: 0,
    monthlyTrends: []
  });

  // 통계 데이터 가져오기
  const fetchStatistics = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/statistics?type=overview', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setStatistics(data.data);
      } else {
        console.error('통계 데이터 로드 실패:', data.message);
      }
    } catch (error) {
      console.error('통계 데이터 로드 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  // 전체 통계 카드 데이터
  const statsCards = [
    {
      title: '전체 상담',
      value: statistics.totalConsultations,
      icon: ChatBubbleLeftIcon,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: '대기 중 상담',
      value: statistics.waitingConsultations,
      icon: ClockIcon,
      color: 'bg-yellow-500',
      change: ''
    },
    {
      title: '완료된 상담',
      value: statistics.completedConsultations,
      icon: CheckCircleIcon,
      color: 'bg-green-500',
      change: ''
    },
    {
      title: '진행중 이벤트',
      value: statistics.activePromotions,
      icon: CalendarIcon,
      color: 'bg-pink-500',
      change: ''
    }
  ];

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">통계 / 분석</h1>
          <p className="text-sm text-gray-600 mt-1">
            상담 및 회원 현황을 한눈에 확인하세요
          </p>
        </div>
        
        {/* 새로고침 버튼 */}
        <button
          onClick={fetchStatistics}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? '로딩중...' : '새로고침'}
        </button>
      </div>

      {/* 전체 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg border p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  {stat.change && (
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 월별 트렌드 차트 */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">월별 트렌드</h2>
        
        {statistics.monthlyTrends && statistics.monthlyTrends.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* 간단한 막대 차트 */}
              <div className="space-y-4">
                {statistics.monthlyTrends.map((trend: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="w-24 text-sm text-gray-600">{trend.month}</div>
                    <div className="flex-1 flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">상담:</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                            <div 
                              className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                              style={{ width: `${Math.min(trend.consultations * 2, 100)}%` }}
                            >
                              <span className="text-xs text-white font-medium">{trend.consultations}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {isLoading ? '데이터를 불러오는 중...' : '트렌드 데이터가 없습니다.'}
          </div>
        )}
      </div>


      {/* 요약 정보 */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">요약</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">상담 완료율</span>
            <span className="text-lg font-semibold text-gray-900">
              {statistics.totalConsultations > 0 
                ? Math.round((statistics.completedConsultations / statistics.totalConsultations) * 100) 
                : 0}%
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">평균 대기 상담</span>
            <span className="text-lg font-semibold text-gray-900">
              {statistics.waitingConsultations}건
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}