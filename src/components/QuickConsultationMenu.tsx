'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Calendar, Phone, ChevronRight, ChevronLeft } from 'lucide-react';

export default function QuickConsultationMenu() {
  const [isExpanded, setIsExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const consultationOptions = [
    {
      id: 1,
      title: '온라인 예약',
      description: '편리한 온라인 예약',
      icon: Calendar,
      color: 'from-teal-smoke-300 to-teal-smoke-400',
      href: '/consultation/request'
    },
    {
      id: 2,
      title: '카톡 빠른 상담',
      description: '실시간 카카오톡 상담',
      icon: MessageCircle,
      color: 'from-elegant-300 to-teal-smoke-300',
      href: 'http://pf.kakao.com/_AxebKG/chat'
    },
    {
      id: 3,
      title: '전화 상담',
      description: '02-1234-5678',
      icon: Phone,
      color: 'from-teal-smoke-400 to-elegant-400',
      href: 'tel:02-1234-5678'
    }
  ];

  return (
    <div ref={menuRef} className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
      {/* 토글 버튼 - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed right-4 top-1/2 -translate-y-1/2 w-12 h-16 bg-gradient-to-br from-teal-smoke-300 to-teal-smoke-400 hover:from-teal-smoke-400 hover:to-teal-smoke-500 rounded-l-xl shadow-xl transition-all duration-300 flex items-center justify-center group border border-teal-smoke-300/50 z-50"
      >
        {isExpanded ? (
          <ChevronRight className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        ) : (
          <ChevronLeft className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* 메인 메뉴 컨테이너 */}
      <div 
        className={`glass-effect border border-teal-smoke-200/30 shadow-2xl transition-all duration-500 ease-out ${
          isExpanded 
            ? 'rounded-l-3xl rounded-r-none translate-x-0' 
            : 'rounded-l-3xl rounded-r-3xl translate-x-full'
        }`}
      >
        {/* 메뉴 콘텐츠 */}
        <div className="p-6 w-72">
          {/* 헤더 */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-display font-light text-cyan-800 mb-2 tracking-wide">
              상담 퀵 메뉴
            </h3>
            <div className="w-12 h-0.5 bg-teal-smoke-300 rounded-full mx-auto"></div>
          </div>

          {/* 메뉴 옵션들 */}
          <div className="space-y-3">
            {consultationOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <a
                  key={option.id}
                  href={option.href}
                  className="block group"
                >
                  <div className={`bg-gradient-to-r ${option.color} rounded-2xl p-4 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/30`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 glass-effect bg-white/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6 text-cyan-800" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-elegant font-light text-cyan-800 text-lg leading-tight mb-1">
                          {option.title}
                        </h4>
                        <p className="font-elegant-sans font-light text-slate-700 text-sm">
                          {option.description}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* 운영시간 */}
          <div className="mt-6 pt-4 border-t border-teal-smoke-200/30">
            <div className="text-center">
              <p className="font-elegant-sans font-light text-slate-600 text-sm leading-relaxed">
                평일 09:00-18:00<br />
                토요일 09:00-14:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}