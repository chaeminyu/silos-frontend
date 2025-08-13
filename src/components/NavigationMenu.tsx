'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

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
    title: '와이 실로스 리프팅인가?',
    href: '/why-silos'
  },
  {
    id: 'silos-lifting',
    title: '실로스 커스터마이징 실리프팅',
    href: '/procedures/silos-lifting',
    submenu: [
      { title: '실로스 실리프팅', href: '/procedures/silos-lifting?procedure=thread-lifting' },
      { title: '실로스 파워 실리프팅', href: '/procedures/silos-lifting?procedure=power-lifting' },
      { title: '코리프팅', href: '/procedures/silos-lifting?procedure=nose-lifting' },
      { title: '턱라인 리프팅', href: '/procedures/silos-lifting?procedure=jawline-lifting' },
      { title: '이마 리프팅', href: '/procedures/silos-lifting?procedure=forehead-lifting' },
      { title: '불독살 리프팅', href: '/procedures/silos-lifting?procedure=jowl-lifting' },
      { title: '팔자주름 리프팅', href: '/procedures/silos-lifting?procedure=nasolabial-lifting' }
    ]
  },
  {
    id: 'face-lifting',
    title: '페이스 리프팅',
    href: '/procedures/face-lifting'
  },
  {
    id: 'forehead-lifting',
    title: '이마 눈썹 리프팅',
    href: '/procedures/forehead-lifting',
    subtitle: '내시경 미니거상'
  },
  {
    id: 'neck-lifting',
    title: '목 리프팅',
    href: '/procedures/neck-lifting'
  },
  {
    id: 'eyelid-lifting',
    title: '눈꺼풀 처짐 리프팅',
    href: '/procedures/eyelid-lifting',
    submenu: [
      { title: '실로스 상안검', href: '/procedures/eyelid-lifting/upper-blepharoplasty' },
      { title: '실로스 듀얼 상안검', href: '/procedures/eyelid-lifting/dual-upper-blepharoplasty' },
      { title: '실로스 눈썹하 절개', href: '/procedures/eyelid-lifting/brow-incision' },
      { title: '실로스 하안검', href: '/procedures/eyelid-lifting/lower-blepharoplasty' }
    ]
  },
  {
    id: 'under-eye-laser',
    title: '눈밑 지방 레이저',
    href: '/procedures/under-eye-laser',
    submenu: [
      { title: '눈밑지방레이저', href: '/procedures/under-eye-laser/fat-laser' },
      { title: '다크서클 레이저', href: '/procedures/under-eye-laser/dark-circle-laser' }
    ]
  },
  {
    id: 'laser-lifting',
    title: '레이저 리프팅',
    href: '/procedures/laser-lifting',
    submenu: [
      { title: '울쎄라', href: '/procedures/laser-lifting?procedure=ulthera' },
      { title: '슈링크', href: '/procedures/laser-lifting?procedure=shrink' },
      { title: '온다', href: '/procedures/laser-lifting?procedure=onda' },
      { title: '엔코어', href: '/procedures/laser-lifting?procedure=encore' },
      { title: '덴서티', href: '/procedures/laser-lifting?procedure=density' },
      { title: '브이로', href: '/procedures/laser-lifting?procedure=vero' }
    ]
  },
  {
    id: 'silopat',
    title: '실로팻',
    href: '/silofat'
  },
  {
    id: 'skin-lifting',
    title: '피부 리프팅',
    href: '/procedures/skin-lifting',
    submenu: [
      { title: '콜라채움', href: '/procedures/skin-lifting?procedure=collagen' },
      { title: '리쥬란', href: '/procedures/skin-lifting?procedure=rejuran' },
      { title: '올리디아', href: '/procedures/skin-lifting?procedure=olydia' },
      { title: '쥬베룩', href: '/procedures/skin-lifting?procedure=juvelook' },
      { title: '래디어스', href: '/procedures/skin-lifting?procedure=radius' },
      { title: '볼라썸', href: '/procedures/skin-lifting?procedure=vollasome' },
      { title: '물광주사', href: '/procedures/skin-lifting?procedure=skin-booster' }
    ]
  },
  {
    id: 'special-filler',
    title: '특수 부위 필러',
    href: '/procedures/special-filler',
    submenu: [
      { title: '요정귀 필러', href: '/procedures/special-filler/elf-ear' },
      { title: '돌출입 교정', href: '/procedures/special-filler/protruding-mouth' },
      { title: '이마 필러', href: '/procedures/special-filler/forehead' },
      { title: '관자 필러', href: '/procedures/special-filler/temple' },
      { title: '턱라인 필러', href: '/procedures/special-filler/jawline' },
      { title: '입술 필러', href: '/procedures/special-filler/lip' },
      { title: '손등 주름 필러', href: '/procedures/special-filler/hand' }
    ]
  },
  {
    id: 'skin-all-in-one',
    title: '피부 올인원',
    href: '/procedures/skin-all-in-one',
    submenu: [
      { title: '색소', href: '/procedures/skin-all-in-one/pigmentation' },
      { title: '스킨 보톡스', href: '/procedures/skin-all-in-one/skin-botox' },
      { title: '표피낭종', href: '/procedures/skin-all-in-one/epidermal-cyst', subtitle: '실비적용' },
      { title: '액취증', href: '/procedures/skin-all-in-one/hyperhidrosis', subtitle: '실비적용' }
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
              <Home className="w-4 h-4 mr-2" />
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
                className="flex items-center px-2.5 py-2.5 rounded-lg text-[13px] font-elegant-sans font-medium transition-all duration-300 hover:bg-teal-smoke-50 text-teal-smoke-700 hover:text-teal-smoke-800 whitespace-nowrap"
              >
                <span className="flex flex-col">
                  <span className="whitespace-nowrap">{item.title}</span>
                  {item.subtitle && (
                    <span className="text-[11px] text-teal-smoke-500 leading-tight whitespace-nowrap">
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
          className="fixed bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-teal-smoke-200/50 p-6 min-w-72 z-[9999] opacity-0 animate-smooth-dropdown"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            animation: 'ultraSmoothDropdown 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
        >
          {(() => {
            const menuItem = navigationData.find(item => item.id === activeDropdown);
            if (!menuItem?.submenu) return null;
            
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
          className="flex items-center px-3 py-2 rounded-lg text-sm font-elegant-sans font-light text-teal-smoke-800 hover:text-teal-smoke-900 hover:bg-teal-smoke-50 transition-all duration-300 flex-shrink-0"
        >
          <Home className="w-4 h-4 mr-1" />
          실로스
        </Link>
        <Link
          href="/about"
          className="px-3 py-2 rounded-lg text-sm font-elegant-sans font-light text-teal-smoke-700 hover:text-teal-smoke-800 hover:bg-teal-smoke-50 transition-all duration-300 flex-shrink-0"
        >
          병원소개
        </Link>
        <Link
          href="/procedures"
          className="px-3 py-2 rounded-lg text-sm font-elegant-sans font-light text-teal-smoke-700 hover:text-teal-smoke-800 hover:bg-teal-smoke-50 transition-all duration-300 flex-shrink-0"
        >
          시술안내
        </Link>
        <Link
          href="#contact"
          className="px-3 py-2 rounded-lg text-sm font-elegant-sans font-light text-teal-smoke-700 hover:text-teal-smoke-800 hover:bg-teal-smoke-50 transition-all duration-300 flex-shrink-0"
        >
          상담
        </Link>
      </div>
    </nav>
  );
}