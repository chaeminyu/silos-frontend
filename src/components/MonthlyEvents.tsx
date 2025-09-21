'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Gift } from 'lucide-react';
import { Event, eventService } from '@/services/eventService';

interface MonthlyEventsProps {
  maxEvents?: number; // 메인페이지에 표시할 최대 이벤트 수
}

export default function MonthlyEvents({ maxEvents = 3 }: MonthlyEventsProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyEvents = async () => {
      setLoading(true);
      try {
        // 진행 중인 이벤트 우선으로 가져오기
        const ongoingEvents = await eventService.getEvents('ongoing');
        
        // 진행 중인 이벤트가 부족하면 예정된 이벤트도 포함
        if (ongoingEvents.length < maxEvents) {
          const upcomingEvents = await eventService.getEvents('upcoming');
          const combinedEvents = [...ongoingEvents, ...upcomingEvents].slice(0, maxEvents);
          setEvents(combinedEvents);
        } else {
          setEvents(ongoingEvents.slice(0, maxEvents));
        }
      } catch (error) {
        console.error('Failed to fetch monthly events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyEvents();
  }, [maxEvents]);

  if (loading) {
    return (
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-white via-teal-smoke-50/30 to-elegant-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-cyan-800 mb-6 tracking-wide">
              SILOS <span className="font-jeju font-bold">이달의 이벤트</span>
            </h2>
            <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-8"></div>
          </div>
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-smoke-500"></div>
            <p className="mt-4 text-gray-600">이벤트를 불러오는 중...</p>
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-white via-teal-smoke-50/30 to-elegant-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-cyan-800 mb-6 tracking-wide">
              SILOS <span className="font-jeju font-bold">이달의 이벤트</span>
            </h2>
            <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-8"></div>
          </div>
          <div className="text-center py-12">
            <Gift className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-elegant font-medium text-gray-600 mb-2">
              현재 진행 중인 이벤트가 없습니다
            </h3>
            <p className="text-gray-500 font-elegant-sans font-light mb-6">
              곧 새로운 이벤트가 준비될 예정입니다
            </p>
            <Link
              href="/events"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white rounded-lg font-elegant-sans font-medium hover:from-teal-smoke-600 hover:to-elegant-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              전체 이벤트 보기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-white via-teal-smoke-50/30 to-elegant-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-cyan-800 mb-6 tracking-wide">
            SILOS <span className="font-jeju font-bold">이달의 이벤트</span>
          </h2>
          <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-8"></div>
          <p className="text-lg md:text-xl font-elegant-sans font-light text-slate-700 max-w-4xl mx-auto leading-relaxed">
            이달의 특별한 혜택으로 <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-teal-smoke-100 to-elegant-100 rounded-md text-cyan-800 font-medium mx-1 text-sm md:text-base">실로스</span> 시술을<br className="block sm:hidden" />
            합리적인 가격에 만나보세요
          </p>
        </div>

        {/* 이벤트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {events.map((event, index) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="block group"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-teal-smoke-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                {/* 이벤트 포스터 */}
                <div className="relative aspect-[4/5] bg-gradient-to-br from-teal-smoke-100 to-elegant-100">
                  {event.posterUrl && event.posterUrl !== '/images/events/default-event.jpg' ? (
                    <img
                      src={event.posterUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-slate-600">
                        <Gift className="w-12 lg:w-16 mx-auto mb-3 lg:mb-4 text-teal-smoke-400" />
                        <p className="font-elegant-sans font-medium text-sm">
                          이벤트 포스터
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* 상태 배지 */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-elegant-sans font-bold shadow-lg ${
                      event.status === 'ongoing' 
                        ? 'bg-green-500 text-white'
                        : event.status === 'upcoming'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}>
                      {event.status === 'ongoing' && '진행 중'}
                      {event.status === 'upcoming' && '진행 예정'}
                      {event.status === 'ended' && '종료'}
                    </span>
                  </div>

                  {/* NEW 배지 (최근 이벤트) */}
                  {index === 0 && event.status === 'ongoing' && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs font-elegant-sans font-bold shadow-lg animate-pulse">
                        NEW
                      </span>
                    </div>
                  )}
                </div>
                
                {/* 이벤트 정보 */}
                <div className="p-6">
                  <h3 className="text-lg lg:text-xl font-elegant font-medium text-slate-800 mb-3 leading-tight line-clamp-2 group-hover:text-cyan-800 transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  <div className="flex items-center space-x-2 text-slate-600 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span className="font-elegant-sans font-light text-sm leading-tight">
                      {`${event.periodStart} ~ ${event.periodEnd}`}
                    </span>
                  </div>

                  {/* 상세보기 버튼 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-elegant-sans font-light text-slate-500">
                      자세히 보기
                    </span>
                    <ArrowRight className="w-4 h-4 text-teal-smoke-500 group-hover:text-cyan-800 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 전체 이벤트 보기 버튼 */}
        <div className="text-center">
          <Link
            href="/events"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white rounded-xl font-elegant-sans font-medium text-lg hover:from-teal-smoke-600 hover:to-elegant-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <Calendar className="w-5 h-5 mr-3" />
            전체 이벤트 보기
            <ArrowRight className="w-5 h-5 ml-3" />
          </Link>
        </div>
      </div>

      {/* 배경 장식 요소 */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-teal-smoke-200/20 to-elegant-200/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-elegant-200/20 to-teal-smoke-200/20 rounded-full blur-xl"></div>
    </section>
  );
}