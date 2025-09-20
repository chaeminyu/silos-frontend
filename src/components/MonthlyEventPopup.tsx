'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Event, eventService } from '@/services/eventService';

interface MonthlyEventPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onDontShowToday: () => void;
}


export default function MonthlyEventPopup({ isOpen, onClose, onDontShowToday }: MonthlyEventPopupProps) {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [ongoingEvents, setOngoingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Touch/swipe state
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // 진행 중인 이벤트 가져오기
  useEffect(() => {
    const fetchOngoingEvents = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      try {
        const events = await eventService.getOngoingEvents();
        setOngoingEvents(events);
      } catch (error) {
        console.error('Failed to fetch ongoing events:', error);
        setOngoingEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOngoingEvents();
  }, [isOpen]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100000] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="bg-white rounded-2xl p-8 relative">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-smoke-500"></div>
          <p className="mt-4 text-gray-600">이벤트를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (ongoingEvents.length === 0) return null;

  const currentEvent = ongoingEvents[currentEventIndex];
  const eventPeriod = `${currentEvent.periodStart} ~ ${currentEvent.periodEnd}`;

  const handleNext = () => {
    setCurrentEventIndex((prev) => (prev + 1) % ongoingEvents.length);
  };

  const handlePrev = () => {
    setCurrentEventIndex((prev) => (prev - 1 + ongoingEvents.length) % ongoingEvents.length);
  };

  // 스와이프 핸들러들
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // 이전 터치 종료 지점 초기화
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50; // 50px 이상 왼쪽으로 스와이프
    const isRightSwipe = distance < -50; // 50px 이상 오른쪽으로 스와이프
    
    if (ongoingEvents.length > 1) {
      if (isLeftSwipe) {
        handleNext(); // 왼쪽 스와이프 → 다음 이벤트
      } else if (isRightSwipe) {
        handlePrev(); // 오른쪽 스와이프 → 이전 이벤트
      }
    }
  };

  if (isMobile) {
    // 모바일 바텀시트 스타일
    return (
      <div className="fixed inset-0 z-[100000] overflow-hidden">
        {/* 배경 오버레이 */}
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />
        
        {/* 바텀시트 */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl animate-in slide-in-from-bottom duration-300 max-h-[80vh] overflow-hidden">
          {/* 핸들 */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
          </div>
          
          {/* 헤더 */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-display font-medium text-slate-800">
              이달의 이벤트
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* 이벤트 콘텐츠 */}
          <div className="p-6">
            <div className="relative">
              {/* 이벤트 카드 - 스와이프 가능 */}
              <div 
                className="bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-2xl overflow-hidden shadow-lg cursor-pointer select-none"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Link href={`/events/${currentEvent.id}`} onClick={onClose}>
                  {/* 포스터 영역 */}
                  <div className="aspect-[3/2] bg-gradient-to-br from-teal-smoke-200 to-elegant-200 flex items-center justify-center">
                    <div className="text-center text-slate-600">
                      <Calendar className="w-16 h-16 mx-auto mb-4 text-teal-smoke-500" />
                      <p className="font-elegant-sans font-medium">
                        {currentEvent.title}
                      </p>
                    </div>
                  </div>
                  
                  {/* 이벤트 정보 */}
                  <div className="p-4 bg-white">
                    <h4 className="text-lg font-elegant font-medium text-slate-800 mb-2">
                      {currentEvent.title}
                    </h4>
                    <p className="text-sm text-slate-600 font-elegant-sans">
                      {eventPeriod}
                    </p>
                  </div>
                </Link>
              </div>
              
              {/* 네비게이션 버튼 (여러 이벤트가 있을 때만) */}
              {ongoingEvents.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                </>
              )}
            </div>
            
            {/* 인디케이터 및 스와이프 힌트 */}
            {ongoingEvents.length > 1 && (
              <div className="mt-4">
                <div className="flex justify-center space-x-2 mb-2">
                  {ongoingEvents.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentEventIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentEventIndex
                          ? 'bg-teal-smoke-500 w-6'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                {/* 스와이프 힌트 */}
                <p className="text-xs text-gray-400 text-center font-elegant-sans">
                  좌우로 스와이프하여 다른 이벤트 보기
                </p>
              </div>
            )}
            
            {/* 하단 버튼 */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={onDontShowToday}
                className="flex-1 py-3 px-4 text-sm font-elegant-sans text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                오늘 하루 보지 않기
              </button>
              <Link
                href="/events"
                onClick={onClose}
                className="flex-1 py-3 px-4 text-sm font-elegant-sans font-medium text-white bg-gradient-to-r from-teal-smoke-500 to-elegant-500 rounded-xl text-center hover:from-teal-smoke-600 hover:to-elegant-600 transition-all"
              >
                전체 이벤트 보기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PC 센터 모달 스타일
  return (
    <div className="fixed inset-0 z-[100000] overflow-hidden">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 모달 */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in duration-300">
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* 이벤트 콘텐츠 */}
          <div className="relative">
            <Link href={`/events/${currentEvent.id}`} onClick={onClose}>
              {/* 포스터 영역 */}
              <div className="aspect-[4/3] bg-gradient-to-br from-teal-smoke-300 via-teal-smoke-400 to-elegant-500 flex items-center justify-center relative overflow-hidden">
                {/* 배경 패턴 */}
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* 이벤트 내용 */}
                <div className="relative text-center text-white z-10 px-8">
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-elegant-sans font-medium mb-6">
                    진행 중인 이벤트
                  </div>
                  <h2 className="text-4xl font-display font-bold mb-4 leading-tight">
                    {currentEvent.title}
                  </h2>
                  <p className="text-xl font-elegant-sans font-light mb-6">
                    {currentEvent.content || '개인별 피부 상태, 탄력도, 블루밍을 정밀 분석하여 개인 맞춤형 리프팅 솔루션을 제공합니다.'}
                  </p>
                  <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="font-elegant-sans font-medium">
                      {eventPeriod}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* 네비게이션 버튼 (여러 이벤트가 있을 때만) */}
            {ongoingEvents.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
                >
                  <ChevronLeft className="w-6 h-6 text-slate-600" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
                >
                  <ChevronRight className="w-6 h-6 text-slate-600" />
                </button>
              </>
            )}
          </div>
          
          {/* 하단 영역 */}
          <div className="p-8">
            {/* 인디케이터 */}
            {ongoingEvents.length > 1 && (
              <div className="flex justify-center mb-6 space-x-3">
                {ongoingEvents.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentEventIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentEventIndex
                        ? 'bg-teal-smoke-500 w-8'
                        : 'bg-gray-300 w-2'
                    }`}
                  />
                ))}
              </div>
            )}
            
            {/* 하단 버튼 */}
            <div className="flex gap-4">
              <button
                onClick={onDontShowToday}
                className="flex-1 py-3 px-6 text-sm font-elegant-sans text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center justify-center">
                  <input type="checkbox" className="mr-2 rounded" />
                  오늘 하루 보지 않기
                </span>
              </button>
              <Link
                href="/events"
                onClick={onClose}
                className="flex-1 py-3 px-6 text-sm font-elegant-sans font-medium text-white bg-gradient-to-r from-teal-smoke-500 to-elegant-500 rounded-xl text-center hover:from-teal-smoke-600 hover:to-elegant-600 transition-all"
              >
                전체 이벤트 보기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}