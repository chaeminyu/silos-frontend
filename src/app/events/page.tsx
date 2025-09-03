'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '../../components/PageLayout';
import { Calendar, Heart } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  period: string;
  posterUrl: string;
  status: 'ongoing' | 'upcoming' | 'ended';
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: '실로스 실리프팅 솔루션',
    period: '2025-08-01 ~ 2025-09-30',
    posterUrl: '/images/events/silos-lifting-event.jpg',
    status: 'ongoing'
  },
  {
    id: '2',
    title: '실로스 레이저 리프팅',
    period: '2025-08-01 ~ 2025-09-30',
    posterUrl: '/images/events/laser-lifting-event.jpg',
    status: 'ongoing'
  },
  {
    id: '3',
    title: '가을 특별 이벤트',
    period: '2025-09-15 ~ 2025-10-31',
    posterUrl: '/images/events/autumn-event.jpg',
    status: 'upcoming'
  },
  {
    id: '4',
    title: '여름 스페셜 프로모션',
    period: '2025-06-01 ~ 2025-07-31',
    posterUrl: '/images/events/summer-event.jpg',
    status: 'ended'
  }
];

const tabs = [
  { id: 'ongoing', label: '진행 중', status: 'ongoing' as const },
  { id: 'upcoming', label: '진행 예정', status: 'upcoming' as const },
  { id: 'ended', label: '종료', status: 'ended' as const }
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'upcoming' | 'ended'>('ongoing');

  const filteredEvents = sampleEvents.filter(event => event.status === activeTab);

  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <div className="relative pb-8 overflow-hidden h-[250px] lg:h-[300px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/events/hero-bg.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-600/80 to-elegant-600/80"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 h-full">
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-center space-y-4">
              <div className="inline-flex items-center px-4 py-2 glass-effect rounded-full text-xs font-elegant-sans font-medium shadow-lg">
                <Calendar className="w-3 h-3 mr-2" />
                SILOS EVENTS
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-display font-light mb-2 tracking-wide leading-tight">
                  실로스
                  <span className="text-3xl lg:text-4xl font-medium ml-2">프로모션</span>
                </h1>
                <div className="w-16 h-0.5 bg-white/60 rounded-full mx-auto mb-2"></div>
                <p className="text-sm lg:text-base font-elegant-sans font-light leading-relaxed text-white/90 max-w-xl mx-auto">
                  SILOS의 시술을 합리적인 가격에 만나보세요
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 탭 네비게이션 */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-100 rounded-xl p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.status)}
                  className={`px-8 py-3 rounded-lg font-elegant-sans font-medium transition-all duration-300 ${
                    activeTab === tab.status
                      ? 'bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white shadow-lg'
                      : 'text-slate-700 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 이벤트 그리드 */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
              {filteredEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="block bg-white rounded-2xl shadow-xl overflow-hidden border border-teal-smoke-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  {/* 이벤트 포스터 */}
                  <div className="relative aspect-[3/4] md:aspect-[4/5] bg-gradient-to-br from-teal-smoke-100 to-elegant-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-slate-600">
                        <Heart className="w-8 h-8 md:w-12 lg:w-16 mx-auto mb-2 md:mb-3 lg:mb-4 text-teal-smoke-400" />
                        <p className="font-elegant-sans font-medium text-xs md:text-sm">
                          이벤트 포스터
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* 이벤트 정보 */}
                  <div className="p-3 md:p-4 lg:p-6">
                    <h3 className="text-sm md:text-lg lg:text-xl font-elegant font-medium text-slate-800 mb-2 md:mb-3 leading-tight line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center space-x-1 md:space-x-2 text-slate-600 mb-2 md:mb-3">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="font-elegant-sans font-light text-xs md:text-sm leading-tight">
                        {event.period}
                      </span>
                    </div>
                    
                    {/* 상태 배지 */}
                    <div>
                      <span className={`inline-flex items-center px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-elegant-sans font-bold ${
                        event.status === 'ongoing' 
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : event.status === 'upcoming'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}>
                        {event.status === 'ongoing' && '진행 중'}
                        {event.status === 'upcoming' && '진행 예정'}
                        {event.status === 'ended' && '종료'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* 빈 상태 */
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-elegant font-medium text-gray-600 mb-2">
                  해당하는 이벤트가 없습니다
                </h3>
                <p className="text-gray-500 font-elegant-sans font-light">
                  {activeTab === 'ongoing' && '현재 진행 중인 이벤트가 없습니다.'}
                  {activeTab === 'upcoming' && '진행 예정인 이벤트가 없습니다.'}
                  {activeTab === 'ended' && '종료된 이벤트가 없습니다.'}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </PageLayout>
  );
}