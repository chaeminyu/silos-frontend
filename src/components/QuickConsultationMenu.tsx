'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Calendar, Phone, ChevronUp, ChevronDown } from 'lucide-react';

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
      description: '1551-8875',
      icon: Phone,
      color: 'from-teal-smoke-400 to-elegant-400',
      href: 'tel:1551-8875'
    }
  ];

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-[9999]">
      {/* 펼쳐진 메뉴 */}
      {isExpanded && (
        <div className="glass-effect border border-teal-smoke-200/30 shadow-2xl rounded-2xl mb-3 animate-in slide-in-from-bottom-2 duration-300">
          {/* 메뉴 콘텐츠 */}
          <div className="p-4 w-72">
            {/* 헤더 */}
            <div className="text-center mb-4">
              <h3 className="text-lg font-display font-light text-cyan-800 mb-2 tracking-wide">
                상담 퀵 메뉴
              </h3>
              <div className="w-12 h-0.5 bg-teal-smoke-300 rounded-full mx-auto"></div>
            </div>

            {/* 메뉴 옵션들 */}
            <div className="space-y-2">
              {consultationOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <a
                    key={option.id}
                    href={option.href}
                    className="block group"
                    onClick={() => setIsExpanded(false)}
                  >
                    <div className={`bg-gradient-to-r ${option.color} rounded-xl p-3 hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-white/30`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 glass-effect bg-white/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <IconComponent className="w-5 h-5 text-cyan-800" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-elegant font-light text-cyan-800 text-base leading-tight mb-0.5">
                            {option.title}
                          </h4>
                          <p className="font-elegant-sans font-light text-slate-700 text-xs">
                            {option.description}
                          </p>
                        </div>
                        <ChevronUp className="w-3 h-3 text-slate-600 group-hover:translate-x-1 transition-transform rotate-90" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* 운영시간 */}
            <div className="mt-4 pt-3 border-t border-teal-smoke-200/30">
              <div className="text-center">
                <p className="font-elegant-sans font-light text-slate-600 text-xs leading-relaxed">
                  평일 09:00-18:00 | 토요일 09:00-14:00
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 메인 버튼 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-gradient-to-r from-teal-smoke-400 to-elegant-400 hover:from-teal-smoke-500 hover:to-elegant-500 text-white px-6 py-3 rounded-xl shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group border border-teal-smoke-300/50 hover:shadow-2xl transform hover:scale-105"
      >
        <span className="font-elegant-sans font-medium text-sm whitespace-nowrap">
          상담 퀵메뉴
        </span>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 group-hover:scale-110 transition-transform" />
        ) : (
          <ChevronUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
}