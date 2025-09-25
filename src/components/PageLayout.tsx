'use client';

import NavigationMenu from './NavigationMenu';
import QuickConsultationMenu from './QuickConsultationMenu';
import Link from 'next/link';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, FileText, ShoppingCart, ChevronDown } from 'lucide-react';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const { itemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-smoke-50 via-white to-teal-smoke-100">
      {/* 헤더 네비게이션 */}
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-sm border-b border-teal-smoke-200/50 shadow-sm">
        <div className="w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20 w-full">
              {/* 네비게이션 메뉴 - 전체 너비 사용 */}
              <div className="flex-1 min-w-0">
                <NavigationMenu />
              </div>
              
              {/* 로그인/장바구니 버튼 - Desktop */}
              <div className="hidden lg:flex items-center space-x-3 flex-shrink-0 ml-4">
                <Link 
                  href="/consultation/request"
                  className="relative p-2.5 hover:bg-teal-smoke-50 rounded-lg transition-all duration-300 group block"
                >
                  <ShoppingCart className="w-5 h-5 text-slate-600 group-hover:text-slate-800" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-smoke-400 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                </Link>
                
                {isAuthenticated ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 bg-teal-smoke-100 hover:bg-teal-smoke-200 px-4 py-2 rounded-full text-sm font-elegant-sans font-medium transition-all duration-300"
                    >
                      <User className="w-4 h-4" />
                      <span>{user?.name || '회원'}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-teal-smoke-200 overflow-hidden z-50">
                        <div className="px-4 py-3 border-b border-teal-smoke-100">
                          <p className="text-sm font-medium text-slate-800">{user?.name}</p>
                          <p className="text-xs text-slate-500">{user?.phone}</p>
                          <p className="text-xs text-teal-smoke-600 mt-1">
                            {user?.accessLevel === 'admin' && '관리자'}
                            {user?.accessLevel === 'premium' && '프리미엄 회원'}
                            {user?.accessLevel === 'basic' && '일반 회원'}
                          </p>
                        </div>
                        
                        <div className="py-2">
                          <Link
                            href="/consultation/list"
                            className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-teal-smoke-50"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <FileText className="w-4 h-4 mr-3" />
                            상담 내역 조회
                          </Link>
                          {user?.accessLevel === 'admin' && (
                            <Link
                              href="/admin/consultations"
                              className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-teal-smoke-50"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <FileText className="w-4 h-4 mr-3" />
                              상담 관리 (관리자)
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              logout();
                              setShowUserMenu(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-teal-smoke-50"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            로그아웃
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    href="/login"
                    className="bg-teal-smoke-300 hover:bg-teal-smoke-400 text-slate-900 px-5 py-2 rounded-full text-sm font-elegant-sans font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-teal-smoke-400/30 whitespace-nowrap inline-block"
                  >
                    로그인
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>


      {/* 메인 콘텐츠 - 헤더 높이만큼 패딩 추가 */}
      <main className="pt-20">
        {children}
      </main>

      {/* 푸터 */}
      <footer className="w-full bg-gradient-to-br from-teal-smoke-300 via-teal-smoke-400 to-teal-smoke-500 text-slate-900 py-8 md:py-16">
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 text-center md:text-left">
              <div className="md:col-span-1 flex flex-col items-center md:items-start">
                <h3 className="text-3xl font-display font-light text-cyan-800 mb-4 tracking-wide">실로스</h3>
                <p className="text-slate-800 font-elegant-sans font-light">실리프팅은 실로스</p>
              </div>
              
              
              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-lg font-elegant font-light mb-6 text-cyan-800 tracking-wide">병원 정보</h4>
                <ul className="space-y-3 text-slate-800 font-elegant-sans font-light">
                  <li>경상남도 창원시 성산구 중앙대로 114, 1층</li>
                  <li>TEL: 000-0000-0000 (추후 정보 수정 예정)</li>
                </ul>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-lg font-elegant font-light mb-6 text-cyan-800 tracking-wide">빠른 상담</h4>
                <button className="bg-teal-smoke-200 hover:bg-teal-smoke-100 text-slate-900 px-8 py-3 rounded-full font-elegant-sans font-medium transition-all duration-300 mb-6 shadow-lg hover:shadow-xl">
                  카카오톡 상담
                </button>
              </div>
            </div>
            
            <div className="border-t border-teal-smoke-700/50 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
              <p className="text-slate-800 font-elegant-sans font-light">&copy; 2024 실로스 성형외과. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* 플로팅 퀵 상담 메뉴 */}
      <QuickConsultationMenu />
    </div>
  );
}