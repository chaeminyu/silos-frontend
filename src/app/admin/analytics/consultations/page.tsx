'use client';

import { useState, useEffect } from 'react';
// Icons available if needed in the future
// import { 
//   ChatBubbleLeftIcon,
//   ClockIcon,
//   CheckCircleIcon,
//   ChartBarIcon
// } from '@heroicons/react/24/outline';

export default function ConsultationAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [consultationStats, setConsultationStats] = useState<any>({
    procedureStats: [],
    dailyTrends: []
  });
  const [procedureViewStats, setProcedureViewStats] = useState<any>({
    procedureViewStats: []
  });

  // 상담 통계 데이터 가져오기
  const fetchConsultationStatistics = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // 상담 신청 기준 통계
      const consultationResponse = await fetch('/api/admin/statistics?type=consultations', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const consultationData = await consultationResponse.json();
      if (consultationData.success) {
        setConsultationStats(consultationData.data);
      }
      
      // 시술 조회수 기준 통계
      const procedureViewResponse = await fetch('/api/admin/statistics?type=procedures', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const procedureViewData = await procedureViewResponse.json();
      if (procedureViewData.success) {
        setProcedureViewStats(procedureViewData.data);
      }
      
    } catch (error) {
      console.error('상담 통계 데이터 로드 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultationStatistics();
  }, []);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">시술 통계</h1>
          <p className="text-sm text-gray-600 mt-1">
            시술별 상담 신청 및 조회 현황을 확인하세요
          </p>
        </div>
        
        {/* 새로고침 버튼 */}
        <button
          onClick={fetchConsultationStatistics}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? '로딩중...' : '새로고침'}
        </button>
      </div>

      {/* 상담 신청 기준 인기 시술 TOP 5 */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">상담 신청 기준 인기 시술 TOP 5</h2>
        
        {consultationStats.procedureStats && consultationStats.procedureStats.length > 0 ? (
          <div className="space-y-4">
            {consultationStats.procedureStats.map((procedure: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{procedure.type}</p>
                    <p className="text-sm text-gray-500">
                      상담 신청: {procedure.consultationRequests}건
                    </p>
                  </div>
                </div>
                <div className="flex space-x-4 text-sm">
                  <span className="text-yellow-600">대기: {procedure.waiting}건</span>
                  <span className="text-green-600">완료: {procedure.completed}건</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {isLoading ? '데이터를 불러오는 중...' : '시술별 통계 데이터가 없습니다.'}
          </div>
        )}
      </div>

      {/* 조회수 기준 인기 시술 TOP 5 */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">조회수 기준 인기 시술 TOP 5</h2>
        
        {procedureViewStats.procedureViewStats && procedureViewStats.procedureViewStats.length > 0 ? (
          <div className="space-y-4">
            {procedureViewStats.procedureViewStats.map((procedure: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{procedure.type}</p>
                    <p className="text-sm text-gray-500">
                      조회수: {procedure.viewCount}회
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{procedure.viewCount}</p>
                  <p className="text-xs text-gray-500">조회</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {isLoading ? '데이터를 불러오는 중...' : '시술 조회수 데이터가 없습니다.'}
          </div>
        )}
      </div>

      {/* 일별 상담 신청 추이 */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">일별 상담 신청 추이 (최근 7일)</h2>
        
        {consultationStats.dailyTrends && consultationStats.dailyTrends.length > 0 ? (
          <div className="space-y-3">
            {consultationStats.dailyTrends.map((trend: any, index: number) => (
              <div key={index} className="flex items-center">
                <div className="w-24 text-sm text-gray-600">{trend.date}</div>
                <div className="flex-1 ml-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                      <div 
                        className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${Math.min(trend.count * 10, 100)}%` }}
                      >
                        <span className="text-xs text-white font-medium">{trend.count}건</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {isLoading ? '데이터를 불러오는 중...' : '일별 추이 데이터가 없습니다.'}
          </div>
        )}
      </div>
    </div>
  );
}