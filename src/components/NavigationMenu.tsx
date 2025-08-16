'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
    href: '/procedures',
    submenu: [
      // Column 1 - Categories with sub-items
      // 실리프팅 카테고리
      { 
        title: '실로스 커스터마이징 실리프팅', 
        href: '/procedures/silos-lifting',
        category: 'thread',
        items: [
          { title: '실로스 실리프팅', href: '/procedures/silos-lifting?procedure=thread-lifting' },
          { title: '실로스 파워 실리프팅', href: '/procedures/silos-lifting?procedure=power-lifting' },
          { title: '코리프팅', href: '/procedures/silos-lifting?procedure=nose-lifting' },
          { title: '턱라인 리프팅', href: '/procedures/silos-lifting?procedure=jawline-lifting' },
          { title: '이마 리프팅', href: '/procedures/silos-lifting?procedure=forehead-lifting' },
          { title: '불독살 리프팅', href: '/procedures/silos-lifting?procedure=jowl-lifting' },
          { title: '팔자주름 리프팅', href: '/procedures/silos-lifting?procedure=nasolabial-lifting' }
        ]
      },
      // 눈꺼풀 처짐 리프팅 카테고리
      { 
        title: '눈꺼풀 처짐 리프팅', 
        href: '/procedures/eyelid-lifting',
        category: 'eyelid',
        items: [
          { title: '실로스 상안검', href: '/procedures/eyelid-lifting/upper-blepharoplasty' },
          { title: '실로스 듀얼 상안검', href: '/procedures/eyelid-lifting/dual-upper-blepharoplasty' },
          { title: '실로스 눈썹하 절개', href: '/procedures/eyelid-lifting/brow-incision' },
          { title: '실로스 하안검', href: '/procedures/eyelid-lifting/lower-blepharoplasty' }
        ]
      },
      // 레이저 리프팅 카테고리
      { 
        title: '레이저 리프팅', 
        href: '/procedures/laser-lifting',
        category: 'laser',
        items: [
          { title: '울쎄라', href: '/procedures/laser-lifting?procedure=ulthera' },
          { title: '슈링크', href: '/procedures/laser-lifting?procedure=shrink' },
          { title: '온다', href: '/procedures/laser-lifting?procedure=onda' },
          { title: '엔코어', href: '/procedures/laser-lifting?procedure=encore' },
          { title: '덴서티', href: '/procedures/laser-lifting?procedure=density' },
          { title: '브이로', href: '/procedures/laser-lifting?procedure=vero' }
        ]
      },
      // 눈밑지방 레이저 카테고리
      { 
        title: '눈밑지방 레이저', 
        href: '/procedures/under-eye-laser',
        category: 'under-eye',
        items: [
          { title: '눈밑지방레이저', href: '/procedures/under-eye-laser/fat-laser' },
          { title: '다크서클 레이저', href: '/procedures/under-eye-laser/dark-circle-laser' }
        ]
      },
      
      // Column 2 - Categories with sub-items
      // 피부 리프팅 카테고리
      { 
        title: '피부 리프팅', 
        href: '/procedures/skin-lifting',
        category: 'skin-lifting',
        items: [
          { title: '콜라채움', href: '/procedures/skin-lifting?procedure=collagen' },
          { title: '리쥬란', href: '/procedures/skin-lifting?procedure=rejuran' },
          { title: '올리디아', href: '/procedures/skin-lifting?procedure=olydia' },
          { title: '쥬베룩', href: '/procedures/skin-lifting?procedure=juvelook' },
          { title: '래디어스', href: '/procedures/skin-lifting?procedure=radius' },
          { title: '볼라썸', href: '/procedures/skin-lifting?procedure=vollasome' },
          { title: '물광주사', href: '/procedures/skin-lifting?procedure=skin-booster' }
        ]
      },
      // 특수 부위 필러 카테고리
      { 
        title: '특수 부위 필러', 
        href: '/procedures/special-filler',
        category: 'special-filler',
        items: [
          { title: '요정귀 필러', href: '/procedures/special-filler/elf-ear' },
          { title: '돌출입 교정', href: '/procedures/special-filler/protruding-mouth' },
          { title: '이마 필러', href: '/procedures/special-filler/forehead' },
          { title: '관자 필러', href: '/procedures/special-filler/temple' },
          { title: '턱라인 필러', href: '/procedures/special-filler/jawline' },
          { title: '입술 필러', href: '/procedures/special-filler/lip' },
          { title: '손등 주름 필러', href: '/procedures/special-filler/hand' }
        ]
      },
      // 피부 관리 카테고리
      { 
        title: '피부 관리', 
        href: '/procedures/skin-care',
        category: 'skincare',
        items: [
          { title: '색소', href: '/procedures/skin-all-in-one/pigmentation' },
          { title: '스킨 보톡스', href: '/procedures/skin-all-in-one/skin-botox' },
          { title: '표피낭종', href: '/procedures/skin-all-in-one/epidermal-cyst', subtitle: '실비적용' },
          { title: '액취증', href: '/procedures/skin-all-in-one/hyperhidrosis', subtitle: '실비적용' }
        ]
      },
      
      // Column 3 - Standalone categories (no sub-items)
      // 페이스 리프팅 카테고리
      { 
        title: '페이스 리프팅', 
        href: '/procedures/face-lifting',
        category: 'face',
        subtitle: '얼굴 전체 리프팅'
      },
      // 이마 눈썹 리프팅 카테고리
      { 
        title: '이마 눈썹 리프팅', 
        href: '/procedures/forehead-lifting',
        category: 'forehead',
        subtitle: '내시경 미니거상'
      },
      // 목 리프팅 카테고리
      { 
        title: '목 리프팅', 
        href: '/procedures/neck-lifting',
        category: 'neck',
        subtitle: '목주름 개선'
      },
      // 실로팻 카테고리
      { 
        title: '실로팻', 
        href: '/silofat',
        category: 'silofat',
        subtitle: '지방 이식 & 재생술'
      }
    ]
  },
  {
    id: 'silofat',
    title: '실로팻',
    href: '/silofat'
  },
  {
    id: 'consultation',
    title: '상담문의',
    href: '/consultation',
    submenu: [
      { title: '온라인 상담 신청', href: '/consultation/request' },
      { title: '상담 내역 조회', href: '/consultation/list' },
      { title: '전화상담 예약', href: '/consultation/phone' },
      { title: '카카오톡 상담', href: '/consultation/kakao', subtitle: '빠른 답변' }
    ]
  }
];

export default function NavigationMenu() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [isMouseOverMenu, setIsMouseOverMenu] = useState(false);
  const [isMouseOverDropdown, setIsMouseOverDropdown] = useState(false);

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

  const handleMouseLeave = () => {
    setIsMouseOverMenu(false);
    
    // Close dropdown after delay only if not hovering over dropdown
    setTimeout(() => {
      if (!isMouseOverDropdown && !isMouseOverMenu) {
        setActiveDropdown(null);
      }
    }, 200);
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

  // Clean up dropdown when mouse leaves the entire menu area
  useEffect(() => {
    if (!isMouseOverMenu && !isMouseOverDropdown) {
      const cleanup = setTimeout(() => {
        setActiveDropdown(null);
      }, 300);
      
      return () => clearTimeout(cleanup);
    }
  }, [isMouseOverMenu, isMouseOverDropdown]);

  return (
    <nav className="relative w-full">
      {/* Desktop Menu */}
      <div className="hidden lg:block w-full">
        <div className="flex items-center w-full">
          {/* Logo/Home - 실로스 */}
          <div className="flex-shrink-0 mr-6">
            <Link
              href="/"
              className="flex items-center px-3 py-2.5 rounded-lg text-lg font-display font-medium text-teal-smoke-800 hover:text-teal-smoke-900 transition-all duration-300 hover:bg-teal-smoke-50"
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
              <Link
                href={item.href}
                className="flex items-center px-2.5 py-2.5 rounded-lg text-[15px] font-elegant-sans font-medium transition-all duration-300 hover:bg-teal-smoke-50 text-teal-smoke-700 hover:text-teal-smoke-800 whitespace-nowrap"
              >
                <span className="flex flex-col">
                  <span className="whitespace-nowrap">{item.title}</span>
                  {item.subtitle && (
                    <span className="text-[12px] text-teal-smoke-500 leading-tight whitespace-nowrap">
                      {item.subtitle}
                    </span>
                  )}
                </span>
                {item.submenu && (
                  <ChevronDown className="w-3 h-3 ml-1 transition-transform duration-200 group-hover:rotate-180 flex-shrink-0" />
                )}
              </Link>

            </div>
          ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Position Dropdown Portal */}
      {activeDropdown && (
        <div 
          key={activeDropdown}
          className="fixed bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-teal-smoke-200/50 p-6 z-[9999] opacity-0 animate-smooth-dropdown"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            animation: 'ultraSmoothDropdown 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            minWidth: activeDropdown === 'procedures' ? '1000px' : '300px',
            maxWidth: activeDropdown === 'procedures' ? '1100px' : '400px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
        >
          {(() => {
            const menuItem = navigationData.find(item => item.id === activeDropdown);
            if (!menuItem?.submenu) return null;
            
            // 시술안내 메뉴의 특별한 레이아웃
            if (activeDropdown === 'procedures') {
              // Group items into columns
              const itemsWithSubmenus = menuItem.submenu.filter(item => item.items);
              const standaloneItems = menuItem.submenu.filter(item => !item.items);
              
              // Distribute items with submenus across first two columns
              const column1 = itemsWithSubmenus.slice(0, Math.ceil(itemsWithSubmenus.length / 2));
              const column2 = itemsWithSubmenus.slice(Math.ceil(itemsWithSubmenus.length / 2));
              const column3 = standaloneItems; // All standalone items in third column

              return (
                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-teal-smoke-200/30">
                    <h4 className="font-elegant font-medium text-teal-smoke-800 text-lg tracking-wide">
                      {menuItem.title}
                    </h4>
                    <Link
                      href="/procedures"
                      className="px-4 py-2 bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white rounded-lg font-elegant-sans font-medium text-sm hover:from-teal-smoke-600 hover:to-elegant-600 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      전체 시술
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Column 1 */}
                    <div className="space-y-2">
                      {column1.map((category, catIndex) => (
                        <div key={catIndex} className="space-y-2">
                          {/* 카테고리 헤더 - only categories with items */}
                          <Link
                            href={category.href}
                            className="block px-4 py-3 rounded-xl bg-gradient-to-r from-teal-smoke-100 to-elegant-100 hover:from-teal-smoke-200 hover:to-elegant-200 transition-all duration-200 group border border-teal-smoke-200/50"
                          >
                            <div className="font-elegant font-bold text-teal-smoke-800 text-base leading-tight group-hover:text-teal-smoke-900">
                              {category.title}
                            </div>
                          </Link>
                          
                          {/* 카테고리 하위 항목들 */}
                          <div className="pl-2 space-y-1">
                            {category.items.map((item, itemIndex) => (
                              <Link
                                key={itemIndex}
                                href={item.href}
                                className="flex items-start px-3 py-2 rounded-lg text-teal-smoke-600 hover:text-teal-smoke-800 hover:bg-teal-smoke-50/60 transition-all duration-200 group"
                              >
                                <div className="flex-1">
                                  <div className="font-elegant-sans font-medium text-sm leading-tight group-hover:text-teal-smoke-900">
                                    {item.title}
                                  </div>
                                  {item.subtitle && (
                                    <div className="text-xs text-teal-smoke-500 leading-relaxed mt-0.5">
                                      {item.subtitle}
                                    </div>
                                  )}
                                </div>
                                <ChevronRight className="w-3 h-3 text-teal-smoke-400 mt-1 ml-2 group-hover:translate-x-0.5 transition-transform opacity-0 group-hover:opacity-100" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-2">
                      {column2.map((category, catIndex) => (
                        <div key={catIndex} className="space-y-2">
                          {/* 카테고리 헤더 - only categories with items */}
                          <Link
                            href={category.href}
                            className="block px-4 py-3 rounded-xl bg-gradient-to-r from-teal-smoke-100 to-elegant-100 hover:from-teal-smoke-200 hover:to-elegant-200 transition-all duration-200 group border border-teal-smoke-200/50"
                          >
                            <div className="font-elegant font-bold text-teal-smoke-800 text-base leading-tight group-hover:text-teal-smoke-900">
                              {category.title}
                            </div>
                          </Link>
                          
                          {/* 카테고리 하위 항목들 */}
                          <div className="pl-2 space-y-1">
                            {category.items.map((item, itemIndex) => (
                              <Link
                                key={itemIndex}
                                href={item.href}
                                className="flex items-start px-3 py-2 rounded-lg text-teal-smoke-600 hover:text-teal-smoke-800 hover:bg-teal-smoke-50/60 transition-all duration-200 group"
                              >
                                <div className="flex-1">
                                  <div className="font-elegant-sans font-medium text-sm leading-tight group-hover:text-teal-smoke-900">
                                    {item.title}
                                  </div>
                                  {item.subtitle && (
                                    <div className="text-xs text-teal-smoke-500 leading-relaxed mt-0.5">
                                      {item.subtitle}
                                    </div>
                                  )}
                                </div>
                                <ChevronRight className="w-3 h-3 text-teal-smoke-400 mt-1 ml-2 group-hover:translate-x-0.5 transition-transform opacity-0 group-hover:opacity-100" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Column 3 - Standalone categories */}
                    <div className="space-y-2">
                      {column3.map((category, catIndex) => (
                        <div key={catIndex} className="space-y-2">
                          {/* 독립형 카테고리 (하위 항목 없음) */}
                          <Link
                            href={category.href}
                            className="block px-4 py-4 rounded-xl bg-gradient-to-r from-teal-smoke-100 to-elegant-100 hover:from-teal-smoke-200 hover:to-elegant-200 transition-all duration-200 group border border-teal-smoke-200/50 relative overflow-hidden"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-elegant font-bold text-teal-smoke-800 text-base leading-tight group-hover:text-teal-smoke-900 mb-1">
                                  {category.title}
                                </div>
                                {category.subtitle && (
                                  <div className="text-xs text-teal-smoke-600 mt-1">
                                    {category.subtitle}
                                  </div>
                                )}
                              </div>
                              <ChevronRight className="w-5 h-5 text-teal-smoke-600 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            
            // 일반 메뉴들의 기본 레이아웃
            return (
              <div className="space-y-1">
                <h4 className="font-elegant font-medium text-teal-smoke-800 mb-4 text-lg tracking-wide border-b border-teal-smoke-200/30 pb-2">
                  {menuItem.title}
                </h4>
                {menuItem.submenu.map((subItem, index) => (
                  <Link
                    key={index}
                    href={subItem.href}
                    className="flex items-start px-4 py-3 rounded-xl text-teal-smoke-700 hover:text-teal-smoke-800 hover:bg-teal-smoke-50/80 transition-all duration-200 group"
                    onMouseEnter={() => setIsMouseOverDropdown(true)}
                  >
                    <div className="flex-1">
                      <div className="font-elegant-sans font-medium text-sm leading-tight mb-1 group-hover:text-teal-smoke-900">
                        {subItem.title}
                      </div>
                      {subItem.subtitle && (
                        <div className="text-xs text-teal-smoke-500 leading-relaxed">
                          {subItem.subtitle}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-3 h-3 text-teal-smoke-400 mt-1 ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* Mobile Menu - Simple version */}
      <div className="lg:hidden flex items-center space-x-2 overflow-x-auto">
        <Link
          href="/"
          className="flex items-center px-3 py-2 rounded-lg text-base font-elegant-sans font-light text-teal-smoke-800 hover:text-teal-smoke-900 hover:bg-teal-smoke-50 transition-all duration-300 flex-shrink-0"
        >
          <Image 
            src="/images/logo/silos-icon.png" 
            alt="Silos Icon" 
            width={16} 
            height={16} 
            className="mr-1"
          />
          실로스
        </Link>
        <Link
          href="/about"
          className="px-3 py-2 rounded-lg text-base font-elegant-sans font-light text-teal-smoke-700 hover:text-teal-smoke-800 hover:bg-teal-smoke-50 transition-all duration-300 flex-shrink-0"
        >
          병원소개
        </Link>
        <Link
          href="/procedures"
          className="px-3 py-2 rounded-lg text-base font-elegant-sans font-light text-teal-smoke-700 hover:text-teal-smoke-800 hover:bg-teal-smoke-50 transition-all duration-300 flex-shrink-0"
        >
          시술안내
        </Link>
        <Link
          href="#contact"
          className="px-3 py-2 rounded-lg text-base font-elegant-sans font-light text-teal-smoke-700 hover:text-teal-smoke-800 hover:bg-teal-smoke-50 transition-all duration-300 flex-shrink-0"
        >
          상담
        </Link>
      </div>
    </nav>
  );
}