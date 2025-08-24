'use client';

import NavigationMenu from './NavigationMenu';
import QuickConsultationMenu from './QuickConsultationMenu';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useCart } from '@/contexts/CartContext';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const { itemCount } = useCart();
  
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
              
              {/* 로그인/장바구니 버튼 */}
              <div className="hidden lg:flex items-center space-x-3 flex-shrink-0 ml-4">
                <Link 
                  href="/consultation/request"
                  className="relative p-2.5 hover:bg-teal-smoke-50 rounded-lg transition-all duration-300 group block"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 group-hover:text-slate-800">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-smoke-400 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                </Link>
                <Link 
                  href="/auth/login"
                  className="bg-teal-smoke-300 hover:bg-teal-smoke-400 text-slate-900 px-5 py-2 rounded-full text-sm font-elegant-sans font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-teal-smoke-400/30 whitespace-nowrap inline-block"
                >
                  로그인
                </Link>
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
      <footer className="w-full bg-gradient-to-br from-teal-smoke-300 via-teal-smoke-400 to-teal-smoke-500 text-slate-900 py-16">
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
              <div className="md:col-span-1 flex flex-col items-center md:items-start">
                <h3 className="text-3xl font-display font-light text-cyan-800 mb-4 tracking-wide">실로스</h3>
                <p className="text-slate-800 font-elegant-sans font-light">실리프팅은 실로스</p>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-lg font-elegant font-light mb-6 text-cyan-800 tracking-wide">시술 안내</h4>
                <ul className="space-y-3 text-slate-800">
                  <li><a href="/procedures/silos-lifting" className="hover:text-slate-900 transition-colors font-elegant-sans font-light">실로스 실리프팅</a></li>
                  <li><a href="/procedures/forehead-lifting" className="hover:text-slate-900 transition-colors font-elegant-sans font-light">이마 눈썹 리프팅</a></li>
                  <li><a href="/procedures/under-eye-laser" className="hover:text-slate-900 transition-colors font-elegant-sans font-light">눈밑 지방레이저</a></li>
                  <li><a href="/procedures/silopat" className="hover:text-slate-900 transition-colors font-elegant-sans font-light">실로팻</a></li>
                </ul>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-lg font-elegant font-light mb-6 text-cyan-800 tracking-wide">병원 정보</h4>
                <ul className="space-y-3 text-slate-800 font-elegant-sans font-light">
                  <li>경상남도 창원시 성산구 중앙대로 114, 1층</li>
                  <li>TEL: 000-0000-0000 (추후 정보 수정 예정)</li>
                  <li>진료시간: (추후 정보 수정 예정)</li>
                  <li>휴진일: (추후 정보 수정 예정)</li>
                </ul>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-lg font-elegant font-light mb-6 text-cyan-800 tracking-wide">빠른 상담</h4>
                <button className="bg-teal-smoke-200 hover:bg-teal-smoke-100 text-slate-900 px-8 py-3 rounded-full font-elegant-sans font-medium transition-all duration-300 mb-6 shadow-lg hover:shadow-xl">
                  카카오톡 상담
                </button>
                <div className="text-slate-800 text-sm font-elegant-sans font-light leading-relaxed">
                  진료시간: (추후 정보 수정 예정)<br />
                  휴진일: (추후 정보 수정 예정)
                </div>
              </div>
            </div>
            
            <div className="border-t border-teal-smoke-700/50 mt-12 pt-8 text-center">
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