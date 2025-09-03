'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import MobileCategoryGrid from './MobileCategoryGrid';

const navigationData = [
  {
    id: 'home',
    title: '실로스',
    href: '/',
    icon: Home,
    isHome: true
  },
  {
    id: 'about',
    title: '병원소개',
    href: '/about',
    submenu: [
      { title: '실로스 리프팅 철학', href: '/about/philosophy' },
      { title: '의료진 소개', href: '/about/doctors' },
      { title: '둘러보기', href: '/about/tour' },
      { title: '진료시간 안내/오시는길', href: '/about/location' },
      { title: '커뮤니티', href: '/about/community', subtitle: '세미나 소개, 학회 활동 등 소개' }
    ]
  },
  {
    id: 'why-silos',
    title: '왜 실로스인가?',
    href: '/why-silos'
  },
  {
    id: 'procedures',
    title: '시술안내',
    // href: '/procedures', // 드롭다운만 사용하도록 비활성화
    submenu: [
      // Column 1 - 실로스 시그니처 & 실로프팅 카테고리
      // 실로스 시그니처 카테고리
      { 
        title: '실로스 시그니처', 
        href: '/procedures/silos-signature',
        category: 'signature',
        items: [
          { title: '실로프팅(실리프팅)', href: '/procedures/silos-signature/silos-lifting' },
          { title: '실로팻(지방추출주사)', href: '/procedures/silos-signature/silofat' },
          { title: '반달레이저(눈밑지방레이저)', href: '/procedures/silos-signature/under-eye-laser' },
          { title: '넥리프팅(목리프팅)', href: '/procedures/silos-signature/neck-lifting' }
        ]
      },
      // 실로프팅 세부 카테고리  
      { 
        title: '실로프팅', 
        href: '/procedures/silos-lifting',
        category: 'thread',
        subtitle: '(SILOS 실리프팅)',
        items: [
          { title: '커스텀 실로프팅', href: '/procedures/silos-lifting/custom-thread' },
          { title: '상안면부(이마)', href: '/procedures/silos-lifting/upper-face' },
          { title: '중안면부(팔자/애플존)', href: '/procedures/silos-lifting/mid-face' },
          { title: '하안면부', href: '/procedures/silos-lifting/lower-face' },
          { title: '눈밑/눈가/입가', href: '/procedures/silos-lifting/eye-area' },
          { title: '코프팅(코실리프팅)', href: '/procedures/silos-lifting/nose-lifting' },
          { title: '실로케어(애프터케어)', href: '/procedures/silos-lifting/aftercare' }
        ]
      },
      // 커스텀 리프팅 카테고리
      { 
        title: '커스텀 리프팅', 
        href: '/procedures/custom-lifting',
        category: 'custom',
        items: [
          { title: '울쎄라', href: '/procedures/custom-lifting?procedure=ulthera' },
          { title: '덴서티', href: '/procedures/custom-lifting?procedure=density' },
          { title: '올타이트', href: '/procedures/custom-lifting?procedure=oltight' },
          { title: '온다', href: '/procedures/custom-lifting?procedure=onda' },
          { title: '버츄RF', href: '/procedures/custom-lifting?procedure=virtue-rf' },
          { title: '브이로어드밴스', href: '/procedures/custom-lifting?procedure=vro-advance' },
          { title: '슈링크유니버스', href: '/procedures/custom-lifting?procedure=shrink-universe' },
          { title: '엔코어3D', href: '/procedures/custom-lifting?procedure=encore3d' },
          { title: '리바이브', href: '/procedures/custom-lifting?procedure=revive' }
        ]
      },
      
      // Column 2 - 안면/미니/이마리프팅 & 스킨리프팅
      // 안면리프팅 카테고리
      { 
        title: '안면리프팅', 
        href: '/procedures/face-lifting',
        category: 'face',
        items: [
          { title: 'SMAS안면거상', href: '/procedures/face-lifting/smas-lift' },
          { title: 'SMAS안면거상+목거상', href: '/procedures/face-lifting/smas-neck-lift' }
        ]
      },
      // 미니리프팅 카테고리
      { 
        title: '미니리프팅', 
        href: '/procedures/mini-lifting',
        category: 'mini',
        items: [
          { title: '실로퀵미니거상', href: '/procedures/mini-lifting/siloquick-mini' },
          { title: '미니거상', href: '/procedures/mini-lifting/mini-lift' }
        ]
      },
      // 처진눈리프팅 카테고리
      { 
        title: '처진눈리프팅', 
        href: '/procedures/droopy-eye-lifting',
        category: 'droopy-eye',
        items: [
          { title: '상/하안검', href: '/procedures/droopy-eye-lifting/upper-lower-bleph' },
          { title: '버츄RF(눈꺼풀리프팅)', href: '/procedures/droopy-eye-lifting/virtue-rf-eye' }
        ]
      },
      // 스킨리프팅 카테고리
      { 
        title: '스킨리프팅', 
        href: '/procedures/skin-lifting',
        category: 'skin-lifting',
        items: [
          { title: '스킨보톡스', href: '/procedures/skin-lifting/skin-botox' },
          { title: '물광주사', href: '/procedures/skin-lifting/skin-booster' },
          { title: '리쥬란힐러(힐러/HB/아이)', href: '/procedures/skin-lifting/rejuran' },
          { title: '쥬베룩(스킨/볼륨)', href: '/procedures/skin-lifting/juvelook' },
          { title: '올리디아마요/올리디아아365', href: '/procedures/skin-lifting/olydia' },
          { title: '스컬트라', href: '/procedures/skin-lifting/sculptra' },
          { title: '레디어스', href: '/procedures/skin-lifting/radius' },
          { title: '콜라채움', href: '/procedures/skin-lifting/collagen-fill' }
        ]
      },
      
      // Column 3 - Standalone categories
      // 이마리프팅 카테고리
      { 
        title: '이마리프팅', 
        href: '/procedures/forehead-lifting/endoscopic-forehead',
        category: 'forehead',
        subtitle: '내시경을 통한 최소 절개'
      },
      // 넥(Neck)리프팅 카테고리
      { 
        title: '넥(Neck)리프팅', 
        href: '/procedures/neck-lifting-new',
        category: 'neck',
        subtitle: '목주름과 이중턱 개선'
      },
      // 쁘띠리프팅 카테고리
      { 
        title: '쁘띠리프팅', 
        href: '/procedures/petit-lifting',
        category: 'petit',
        subtitle: '얼굴 특별 부위 세심하게'
      },
      // 복부리프팅 카테고리
      { 
        title: '복부리프팅', 
        href: '/procedures/body-lifting',
        category: 'body',
        subtitle: '복부와 체형 개선'
      },
      // 옴므리프팅 카테고리
      { 
        title: '옴므리프팅', 
        href: '/procedures/homme-lifting',
        category: 'homme',
        subtitle: '남성 전용 맞춤 케어'
      },
      // 피부올인원 카테고리
      { 
        title: '피부올인원', 
        href: '/procedures/skin-all-in-one',
        category: 'skin-all',
        subtitle: '다양한 피부 고민 해결'
      },
      // 액취증 피지낭종 카테고리
      { 
        title: '액취증 피지낭종', 
        href: '/procedures/hyperhidrosis-cyst',
        category: 'treatment',
        subtitle: '전문 치료'
      },
      // 줄기세포 카테고리
      { 
        title: '줄기세포', 
        href: '/procedures/stem-cell/stem-cell-consult',
        category: 'stem-cell',
        subtitle: '재생 치료 상담'
      }
    ]
  },
  {
    id: 'events',
    title: '이벤트',
    href: '/events'
  },
  {
    id: 'community',
    title: '커뮤니티',
    href: '/community',
    submenu: [
      { title: 'Before & After', href: '/community/before-after', subtitle: '실제 시술 사례' },
      { title: '온라인 상담 신청', href: '/consultation/request' },
      { title: '상담 내역 조회', href: '/consultation/list' },
      { title: '전화상담 예약', href: '/consultation/phone' },
      { title: '카카오톡 상담', href: '/consultation/kakao', subtitle: '빠른 답변' }
    ]
  }
];

export default function NavigationMenu() {
  const { itemCount } = useCart();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [mobileDropdownPosition, setMobileDropdownPosition] = useState({ top: 0, left: 0 });
  const [isMouseOverMenu, setIsMouseOverMenu] = useState(false);
  const [isMouseOverDropdown, setIsMouseOverDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleMouseEnter = (menuId: string, event: React.MouseEvent) => {
    setIsMouseOverMenu(true);
    
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    setDropdownPosition({
      top: rect.bottom + 4,
      left: rect.left
    });
    
    // Immediately set the new dropdown
    setActiveDropdown(menuId);
  };


  const handleDropdownEnter = () => {
    setIsMouseOverDropdown(true);
  };

  const handleDropdownLeave = () => {
    setIsMouseOverDropdown(false);
    
    // Close dropdown after delay only if not hovering over menu
    setTimeout(() => {
      if (!isMouseOverMenu && !isMouseOverDropdown) {
        setActiveDropdown(null);
      }
    }, 100);
  };

  // Clean up dropdown when mouse leaves the entire menu area (desktop only)
  useEffect(() => {
    if (!isMobile && !isMouseOverMenu && !isMouseOverDropdown) {
      const cleanup = setTimeout(() => {
        setActiveDropdown(null);
      }, 300);
      
      return () => clearTimeout(cleanup);
    }
    return () => {}; // Return empty cleanup function when condition is not met
  }, [isMouseOverMenu, isMouseOverDropdown, isMobile]);

  // Mobile: Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && activeDropdown) {
        const target = event.target as HTMLElement;
        const dropdownElement = target.closest('[data-dropdown]');
        const buttonElement = target.closest('[data-dropdown-button]');
        
        if (!dropdownElement && !buttonElement) {
          setActiveDropdown(null);
        }
      }
    };

    if (isMobile) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
    return undefined;
  }, [isMobile, activeDropdown]);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      console.log('Mobile detection:', mobile, 'width:', window.innerWidth);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <nav className="relative w-full">
      {/* Desktop Menu */}
      <div className="hidden lg:block w-full">
        <div className="flex items-center w-full">
          {/* Logo/Home - 실로스 */}
          <div className="flex-shrink-0 mr-6">
            <Link
              href="/"
              className="flex items-center px-3 py-2.5 rounded-lg text-lg font-display font-medium text-cyan-700 hover:text-cyan-800 transition-all duration-300 hover:bg-teal-smoke-50"
            >
              <Image 
                src="/images/logo/silos-icon.png" 
                alt="Silos Icon" 
                width={20} 
                height={20} 
                className="mr-2"
              />
              <span className="tracking-wide">실로스</span>
            </Link>
          </div>
          
          {/* Navigation Items Container */}
          <div 
            className="flex-1 min-w-0 overflow-x-auto overflow-y-visible scrollbar-hide"
            style={{
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              maxWidth: 'calc(100vw - 300px)' // Account for logo and button
            }}
          >
            <div 
              className="inline-flex items-center gap-0.5"
              style={{ minWidth: 'max-content' }}
              onMouseEnter={() => setIsMouseOverMenu(true)}
              onMouseLeave={() => setIsMouseOverMenu(false)}
            >
          {navigationData.slice(1).map((item) => (
            <div
              key={item.id}
              className="relative group flex-shrink-0"
              onMouseEnter={(e) => item.submenu && handleMouseEnter(item.id, e)}
            >
              {/* 메인 메뉴 아이템 */}
              {item.href ? (
                <Link
                  href={item.href}
                  className="flex items-center px-2.5 py-2.5 rounded-lg text-[15px] font-elegant-sans font-medium transition-all duration-300 hover:bg-teal-smoke-50 text-cyan-700 hover:text-cyan-800 whitespace-nowrap"
                >
                  <span className="flex flex-col">
                    <span className="whitespace-nowrap">{item.title}</span>
                    {(item as any).subtitle && (
                      <span className="text-[12px] text-cyan-500 leading-tight whitespace-nowrap">
                        {(item as any).subtitle}
                      </span>
                    )}
                  </span>
                  {item.submenu && (
                    <ChevronDown className="w-3 h-3 ml-1 transition-transform duration-200 group-hover:rotate-180 flex-shrink-0" />
                  )}
                </Link>
              ) : (
                <button
                  className="flex items-center px-2.5 py-2.5 rounded-lg text-[15px] font-elegant-sans font-medium transition-all duration-300 hover:bg-teal-smoke-50 text-cyan-700 hover:text-cyan-800 whitespace-nowrap cursor-pointer"
                >
                  <span className="flex flex-col">
                    <span className="whitespace-nowrap">{item.title}</span>
                    {(item as any).subtitle && (
                      <span className="text-[12px] text-cyan-500 leading-tight whitespace-nowrap">
                        {(item as any).subtitle}
                      </span>
                    )}
                  </span>
                  {item.submenu && (
                    <ChevronDown className="w-3 h-3 ml-1 transition-transform duration-200 group-hover:rotate-180 flex-shrink-0" />
                  )}
                </button>
              )}

            </div>
          ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Position Dropdown Portal - Desktop Only */}
      {activeDropdown && !isMobile && (
        <div 
          key={activeDropdown}
          className="fixed bg-white shadow-2xl border-t border-teal-smoke-200 opacity-0 animate-smooth-dropdown"
          data-dropdown-portal
          style={{
            top: dropdownPosition.top,
            left: activeDropdown === 'procedures' ? 0 : dropdownPosition.left,
            right: activeDropdown === 'procedures' ? 0 : 'auto',
            animation: 'ultraSmoothDropdown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            width: activeDropdown === 'procedures' ? '100vw' : 'auto',
            minWidth: activeDropdown === 'procedures' ? '100vw' : '300px',
            maxWidth: activeDropdown === 'procedures' ? '100vw' : '400px',
            maxHeight: '80vh',
            overflowY: 'auto',
            zIndex: 99999
          }}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
        >
          {(() => {
            const menuItem = navigationData.find(item => item.id === activeDropdown);
            if (!menuItem?.submenu) return null;
            
            // 시술안내 메뉴의 특별한 레이아웃 - 3x5 그리드 스타일
            if (activeDropdown === 'procedures') {
              return (
                <div className="w-full px-4 py-6">
                  <MobileCategoryGrid onCategoryClick={() => setActiveDropdown(null)} />
                </div>
              );
            }
            
            // 일반 메뉴들의 기본 레이아웃
            return (
              <div className="space-y-1">
                <h4 className="font-elegant font-medium text-cyan-700 mb-4 text-lg tracking-wide border-b border-teal-smoke-200/30 pb-2">
                  {menuItem.title}
                </h4>
                {menuItem.submenu.map((subItem, index) => (
                  <Link
                    key={index}
                    href={subItem.href}
                    className="flex items-start px-4 py-3 rounded-xl text-cyan-600 hover:text-cyan-700 hover:bg-teal-smoke-50/80 transition-all duration-200 group"
                    onMouseEnter={() => setIsMouseOverDropdown(true)}
                  >
                    <div className="flex-1">
                      <div className="font-elegant-sans font-medium text-sm leading-tight mb-1 group-hover:text-cyan-700">
                        {subItem.title}
                      </div>
                      {subItem.subtitle && (
                        <div className="text-xs text-cyan-500 leading-relaxed">
                          {subItem.subtitle}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-3 h-3 text-cyan-500 mt-1 ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* Mobile Menu */}
      <div className="lg:hidden w-full">
        <div className="flex items-center w-full">
          {/* Logo/Home - 로고만 표시 */}
          <div className="flex-shrink-0 mr-2">
            <Link
              href="/"
              className="flex items-center p-1.5 rounded-lg text-base font-display font-medium text-cyan-700 hover:text-cyan-800 transition-all duration-300 hover:bg-teal-smoke-50"
            >
              <Image 
                src="/images/logo/silos-icon.png" 
                alt="Silos" 
                width={18} 
                height={18} 
              />
            </Link>
          </div>
          
          {/* Mobile Navigation Items */}
          <div className="flex-1 min-w-0 overflow-x-auto">
            <div className="flex items-center space-x-0.5">
              {navigationData.slice(1).map((item) => (
                <div key={item.id} className="relative flex-shrink-0">
                  {item.submenu ? (
                    <button
                      data-dropdown-button
                      onClick={(e) => {
                        const target = e.currentTarget;
                        const rect = target.getBoundingClientRect();
                        setMobileDropdownPosition({
                          top: rect.bottom + 8,
                          left: Math.max(8, rect.left - 120)
                        });
                        setActiveDropdown(activeDropdown === item.id ? null : item.id);
                      }}
                      className="flex items-center px-2.5 py-2 rounded-lg text-[13px] font-elegant-sans font-medium text-cyan-700 hover:text-cyan-800 hover:bg-teal-smoke-50 transition-all duration-300 whitespace-nowrap"
                    >
                      <span>{item.title}</span>
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center px-2.5 py-2 rounded-lg text-[13px] font-elegant-sans font-medium text-cyan-700 hover:text-cyan-800 hover:bg-teal-smoke-50 transition-all duration-300 whitespace-nowrap"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Shopping Cart Icon */}
          <div className="flex-shrink-0 ml-1">
            <Link 
              href="/consultation/request"
              className="relative p-1.5 hover:bg-teal-smoke-50 rounded-lg transition-all duration-300 group flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 group-hover:text-slate-800">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-teal-smoke-400 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Portal */}
      {activeDropdown && isMobile && ((() => {
        const menuItem = navigationData.find(item => item.id === activeDropdown);
        if (!menuItem?.submenu) return null;
        
        console.log('Rendering mobile dropdown portal for:', activeDropdown);
        return (
          <div 
            data-dropdown
            className={`fixed bg-white shadow-2xl ${activeDropdown === 'procedures' ? 'border-t' : 'rounded-xl border'} border-teal-smoke-200`}
            style={{
              top: mobileDropdownPosition.top,
              left: activeDropdown === 'procedures' ? 0 : mobileDropdownPosition.left,
              right: activeDropdown === 'procedures' ? 0 : 'auto',
              width: activeDropdown === 'procedures' ? '100vw' : '288px',
              maxHeight: '70vh',
              overflowY: 'auto',
              zIndex: 99999
            }}
          >
            {/* 시술안내 특별 레이아웃 - 3x5 Grid */}
            {activeDropdown === 'procedures' ? (
              <div className="w-full">
                <MobileCategoryGrid onCategoryClick={() => setActiveDropdown(null)} />
              </div>
            ) : (
              /* 일반 메뉴들의 기본 레이아웃 */
              <div className="p-4 space-y-1">
                <h4 className="font-elegant font-medium text-cyan-700 mb-3 text-base tracking-wide border-b border-teal-smoke-200/30 pb-2">
                  {menuItem.title}
                </h4>
                {menuItem.submenu.map((subItem, index) => (
                  <Link
                    key={index}
                    href={subItem.href}
                    className="flex items-start px-3 py-2.5 rounded-lg text-cyan-600 hover:text-cyan-700 hover:bg-teal-smoke-50/80 transition-all duration-200 group"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <div className="flex-1">
                      <div className="font-elegant-sans font-medium text-sm leading-tight mb-1 group-hover:text-cyan-700">
                        {subItem.title}
                      </div>
                      {subItem.subtitle && (
                        <div className="text-xs text-cyan-500 leading-relaxed">
                          {subItem.subtitle}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-3 h-3 text-cyan-500 mt-1 ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })())}
    </nav>
  );
}