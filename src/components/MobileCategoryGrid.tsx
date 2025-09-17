'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Star } from 'lucide-react';
import Link from 'next/link';

// 카테고리 타입 정의
interface CategoryItem {
  name: string;
  href: string;
}

interface Category {
  id: number;
  title: string;
  subtitle?: string;
  isImportant?: boolean;
  mainLink?: string;
  items: CategoryItem[];
}

// 15개 카테고리 데이터 구조 - 새로운 계층 구조 URL 적용
const mobileCategories: Category[] = [
  {
    id: 1,
    title: '실로스 시그니처',
    isImportant: true,
    items: [
      { name: '실로프팅(실리프팅)', href: '/procedures/silos-lifting' },
      { name: '실로팻(지방추출주사)', href: '/silofat' },
      { name: '반달레이저(눈밑지방레이저)', href: '/procedures/under-eye-laser' },
      { name: '넥리프팅(목리프팅)', href: '/procedures/neck-lifting-new' }
    ]
  },
  {
    id: 2,
    title: '실로프팅',
    subtitle: '(SILOS 실리프팅)',
    mainLink: '/procedures/silos-lifting',
    items: [
      { name: '커스텀 실로프팅', href: '/procedures/silos-lifting?procedure=thread-lifting' },
      { name: '상안면부(이마)', href: '/procedures/silos-lifting?procedure=forehead-lifting' },
      { name: '중안면부(팔자/애플존)', href: '/procedures/silos-lifting?procedure=nasolabial-lifting' },
      { name: '하안면부', href: '/procedures/silos-lifting?procedure=jawline-lifting' },
      { name: '눈밑/눈가/입가', href: '/procedures/silos-lifting?procedure=jowl-lifting' },
      { name: '코프팅(코실리프팅)', href: '/procedures/silos-lifting?procedure=nose-lifting' },
      { name: '실로케어(애프터케어)', href: '/procedures/silos-lifting/aftercare' }
    ]
  },
  {
    id: 3,
    title: '커스텀 리프팅',
    mainLink: '/procedures/custom-lifting',
    items: [
      { name: '울쎄라', href: '/procedures/custom-lifting?procedure=ulthera' },
      { name: '덴서티', href: '/procedures/custom-lifting?procedure=density' },
      { name: '올타이트', href: '/procedures/custom-lifting?procedure=oltight' },
      { name: '온다', href: '/procedures/custom-lifting?procedure=onda' },
      { name: '버츄RF', href: '/procedures/custom-lifting?procedure=virtue-rf' },
      { name: '브이로어드밴스', href: '/procedures/custom-lifting?procedure=vro-advance' },
      { name: '슈링크유니버스', href: '/procedures/custom-lifting?procedure=shrink-universe' },
      { name: '엔코어3D', href: '/procedures/custom-lifting?procedure=encore3d' },
      { name: '리바이브', href: '/procedures/custom-lifting?procedure=revive' }
    ]
  },
  {
    id: 4,
    title: '안면리프팅',
    mainLink: '/procedures/face-lifting',
    items: [
      { name: 'SMAS안면거상', href: '/procedures/face-lifting/smas-lift' },
      { name: 'SMAS안면거상+목거상', href: '/procedures/face-lifting/smas-neck-lift' }
    ]
  },
  {
    id: 5,
    title: '미니리프팅',
    mainLink: '/procedures/mini-lifting',
    items: [
      { name: '실로퀵미니거상', href: '/procedures/mini-lifting/siloquick-mini' },
      { name: '미니거상', href: '/procedures/mini-lifting/mini-lift' }
    ]
  },
  {
    id: 6,
    title: '이마리프팅',
    mainLink: '/procedures/forehead-lifting',
    items: [
      { name: '내시경 이마거상', href: '/procedures/forehead-lifting/endoscopic-forehead' }
    ]
  },
  {
    id: 7,
    title: '처진눈리프팅',
    mainLink: '/procedures/droopy-eye-lifting',
    items: [
      { name: '상/하안검', href: '/procedures/droopy-eye-lifting/upper-lower-bleph' },
      { name: '버츄RF(눈꺼풀리프팅)', href: '/procedures/droopy-eye-lifting/virtue-rf-eye' }
    ]
  },
  {
    id: 8,
    title: '넥(Neck)리프팅',
    mainLink: '/procedures/neck-lifting-new',
    items: [
      { name: '커스텀 넥리프팅', href: '/procedures/neck-lifting-new/custom-neck' },
      { name: '목주름(가로밴드/세로주름)', href: '/procedures/neck-lifting-new/neck-wrinkles' }
    ]
  },
  {
    id: 9,
    title: '쁘띠리프팅',
    mainLink: '/procedures/petit-lifting',
    items: [
      { name: '고난도필러', href: '/procedures/petit-lifting/advanced-filler' },
      { name: '특수부위필러', href: '/procedures/petit-lifting/special-area-filler' },
      { name: '보톡스', href: '/procedures/petit-lifting/botox' },
      { name: '멜팅주사/슬림멜팅주사', href: '/procedures/petit-lifting/melting-injection' },
      { name: '브이올렛', href: '/procedures/petit-lifting/violet' }
    ]
  },
  {
    id: 10,
    title: '스킨리프팅',
    mainLink: '/procedures/skin-lifting',
    items: [
      { name: '스킨보톡스', href: '/procedures/skin-lifting/skin-botox' },
      { name: '물광주사', href: '/procedures/skin-lifting/skin-booster' },
      { name: '리쥬란힐러(힐러/HB/아이)', href: '/procedures/skin-lifting/rejuran' },
      { name: '쥬베룩(스킨/볼륨)', href: '/procedures/skin-lifting/juvelook' },
      { name: '올리디아마요/올리디아아365', href: '/procedures/skin-lifting/olydia' },
      { name: '스컬트라', href: '/procedures/skin-lifting/sculptra' },
      { name: '레디어스', href: '/procedures/skin-lifting/radius' },
      { name: '콜라채움', href: '/procedures/skin-lifting/collagen-fill' }
    ]
  },
  {
    id: 11,
    title: '복부리프팅',
    mainLink: '/procedures/body-lifting',
    items: [
      { name: '복벽성형(처진뱃살)', href: '/procedures/body-lifting/abdomen-plastic' },
      { name: '실로컷주사(지방분해주사)', href: '/procedures/body-lifting/silocut' },
      { name: '바디온다', href: '/procedures/body-lifting/body-onda' }
    ]
  },
  {
    id: 12,
    title: '옴므리프팅',
    mainLink: '/procedures/homme-lifting',
    items: [
      { name: '옴므피부케어', href: '/procedures/homme-lifting/homme-skin-care' },
      { name: '옴므리프팅케어', href: '/procedures/homme-lifting/homme-lifting-care' },
      { name: '옴므프리미엄풀케어', href: '/procedures/homme-lifting/homme-premium' }
    ]
  },
  {
    id: 13,
    title: '피부올인원',
    mainLink: '/procedures/skin-all-in-one',
    items: [
      { name: '색소(기미/흑자/점)', href: '/procedures/skin-all-in-one/pigmentation' },
      { name: '모공/흉터', href: '/procedures/skin-all-in-one/pores-scars' },
      { name: '비립종/쥐젖/편평사마귀', href: '/procedures/skin-all-in-one/skin-lesions' },
      { name: '퍼스널스킨케어', href: '/procedures/skin-all-in-one/personal-care' }
    ]
  },
  {
    id: 14,
    title: '액취증\n피지낭종',
    mainLink: '/procedures/hyperhidrosis-cyst',
    items: [
      { name: '액취증', href: '/procedures/hyperhidrosis-cyst/hyperhidrosis' },
      { name: '피지낭종', href: '/procedures/hyperhidrosis-cyst/sebaceous-cyst' }
    ]
  },
  {
    id: 15,
    title: '줄기세포',
    mainLink: '/procedures/stem-cell',
    items: [
      { name: '줄기세포 상담문의', href: '/procedures/stem-cell/stem-cell-consult' }
    ]
  }
];

interface MobileCategoryGridProps {
  onCategoryClick?: () => void;
}

export default function MobileCategoryGrid({ onCategoryClick }: MobileCategoryGridProps = {}) {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  // Fix overlay interference with 3rd column buttons on mobile
  useEffect(() => {
    const fixOverlayIssue = () => {
      const overlays = document.querySelectorAll('[class*="fixed"][class*="right-0"][class*="z-40"]');
      overlays.forEach((overlay) => {
        (overlay as HTMLElement).style.zIndex = '1';
      });
    };
    
    // Fix on mount and after a short delay for dynamic content
    fixOverlayIssue();
    const timeout = setTimeout(fixOverlayIssue, 1000);
    
    return () => clearTimeout(timeout);
  }, []);

  // Close dropdown on scroll or outside click
  useEffect(() => {
    const handleScroll = () => {
      if (expandedCategory) {
        setExpandedCategory(null);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (expandedCategory) {
        const target = event.target as HTMLElement;
        // Check if click is outside the grid container
        const gridContainer = document.querySelector('[data-mobile-category-grid]');
        if (gridContainer && !gridContainer.contains(target)) {
          setExpandedCategory(null);
        }
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (expandedCategory) {
        const target = event.target as HTMLElement;
        // Check if touch is outside the grid container
        const gridContainer = document.querySelector('[data-mobile-category-grid]');
        if (gridContainer && !gridContainer.contains(target)) {
          setExpandedCategory(null);
        }
      }
    };

    if (expandedCategory) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleTouchStart);
      };
    }
    return undefined;
  }, [expandedCategory]);

  const toggleCategory = (categoryId: number, event?: React.MouseEvent) => {
    const newExpanded = expandedCategory === categoryId ? null : categoryId;
    setExpandedCategory(newExpanded);
  };

  return (
    <>
      <div className="w-full px-3 py-4 relative overflow-visible" data-mobile-category-grid>
        {/* No background - fully transparent to blend with parent */}
        
        {/* 버티컬 레이아웃 - 5행 3열 with inline dropdowns */}
        <div className="relative space-y-2">
          {[
            mobileCategories.slice(0, 3),
            mobileCategories.slice(3, 6),
            mobileCategories.slice(6, 9),
            mobileCategories.slice(9, 12),
            mobileCategories.slice(12, 15),
          ].map((rowCategories, rowIndex) => {
            const hasExpandedInRow = rowCategories.some(cat => cat.id === expandedCategory);
            const expandedCategoryInRow = rowCategories.find(cat => cat.id === expandedCategory);
            
            return (
              <div key={rowIndex} className="space-y-2">
                {/* 행 버튼들 */}
                <div className="flex gap-2">
                  {rowCategories.map((category) => {
                    const isExpanded = expandedCategory === category.id;
                    
                    return (
                      <div 
                        key={category.id}
                        className="relative flex-1"
                      >
                        <button
                          onClick={(e) => toggleCategory(category.id, e)}
                          className={`
                            w-full h-20 p-2.5
                            ${category.isImportant 
                              ? 'bg-gradient-to-br from-teal-smoke-100/60 via-white/70 to-teal-smoke-50/50 border-teal-smoke-300/40 shadow-md shadow-teal-smoke-200/20' 
                              : 'bg-gradient-to-br from-white/70 via-teal-smoke-50/30 to-white/60 border-teal-smoke-200/30 shadow-sm shadow-teal-smoke-100/15'
                            }
                            border rounded-xl
                            flex flex-col items-center justify-center
                            text-center transition-all duration-300
                            hover:shadow-lg hover:scale-[1.02] hover:bg-gradient-to-br hover:from-teal-smoke-50/70 hover:via-white/80 hover:to-teal-smoke-100/60
                            backdrop-blur-md
                            relative overflow-hidden
                            group z-50
                          `}
                        >
                          {/* 배경 그라데이션 효과 */}
                          <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-50/40 via-white/20 to-teal-smoke-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                          
                          {/* 시그니처 표시 */}
                          {category.isImportant && (
                            <div className="absolute -top-1 -right-1 z-10">
                              <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                                <Star className="w-3 h-3 text-white fill-white" />
                              </div>
                            </div>
                          )}
                          
                          {/* 타이틀 */}
                          <span className={`
                            text-[11px] font-medium leading-tight z-10 relative
                            ${category.isImportant ? 'text-slate-800' : 'text-slate-800'}
                            group-hover:text-slate-900 transition-colors duration-300
                          `}>
                            {category.title.split('\n').map((line, index) => (
                              <span key={index} className={index > 0 ? 'block' : ''}>
                                {line}
                              </span>
                            ))}
                          </span>
                          
                          {/* 서브타이틀 */}
                          {category.subtitle && (
                            <span className="text-[9px] text-slate-500 mt-0.5 leading-tight z-10 relative group-hover:text-slate-600 transition-colors duration-300">
                              {category.subtitle}
                            </span>
                          )}
                          
                          {/* 드롭다운 표시 */}
                          <ChevronDown 
                            className={`
                              w-2.5 h-2.5 mt-1 transition-transform duration-300 z-10 relative
                              ${isExpanded ? 'rotate-180' : ''}
                              ${category.isImportant ? 'text-cyan-600' : 'text-slate-500'}
                              group-hover:text-cyan-700
                            `}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
                
                {/* 인라인 드롭다운 - 행에서 하나라도 확장되어 있으면 표시 */}
                {hasExpandedInRow && expandedCategoryInRow && (
                  <div className="bg-gradient-to-br from-teal-smoke-100/90 via-teal-smoke-50/80 to-white/85 backdrop-blur-xl rounded-2xl shadow-2xl border border-teal-smoke-300/50 p-4 mx-2">
                    {/* Enhanced soft background with more teal */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-100/50 via-teal-smoke-50/30 to-white/20 rounded-2xl"></div>
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-teal-smoke-50/70 to-transparent rounded-t-2xl"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-teal-smoke-100/50 to-transparent rounded-b-2xl"></div>
                    
                    {/* 헤더 */}
                    <div className="relative mb-3 pb-2">
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-smoke-300/30 to-transparent"></div>
                      <div className="flex items-center justify-between">
                        {expandedCategoryInRow.mainLink ? (
                          <Link
                            href={expandedCategoryInRow.mainLink}
                            className="text-xs font-medium text-slate-800 flex items-center hover:text-slate-900 transition-colors duration-200"
                            onClick={() => {
                              setExpandedCategory(null);
                              if (onCategoryClick) onCategoryClick();
                            }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full mr-2"></div>
                            {expandedCategoryInRow.title.split('\n').map((line, index) => (
                              <span key={index} className={index > 0 ? 'block' : ''}>
                                {line}
                              </span>
                            ))}
                            <ChevronDown className="w-3 h-3 ml-1 rotate-[-90deg] opacity-60" />
                          </Link>
                        ) : (
                          <span className="text-xs font-medium text-slate-800 flex items-center">
                            <div className="w-2 h-2 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full mr-2"></div>
                            {expandedCategoryInRow.title.split('\n').map((line, index) => (
                              <span key={index} className={index > 0 ? 'block' : ''}>
                                {line}
                              </span>
                            ))}
                          </span>
                        )}
                        <div className="text-[10px] text-slate-500 bg-teal-smoke-50/80 px-2 py-0.5 rounded-full border border-teal-smoke-200/20">
                          {expandedCategoryInRow.items.length}개
                        </div>
                      </div>
                    </div>
                    
                    {/* 메뉴 아이템들 */}
                    <div className="relative space-y-1">
                      {expandedCategoryInRow.items.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="group block px-3 py-2.5 text-[11px] font-light text-slate-800 hover:bg-gradient-to-r hover:from-teal-smoke-50/60 hover:via-white/30 hover:to-elegant-50/60 hover:text-slate-900 rounded-xl transition-all duration-300 relative overflow-hidden border border-transparent hover:border-teal-smoke-200/30"
                          onClick={() => {
                            setExpandedCategory(null);
                            if (onCategoryClick) onCategoryClick();
                          }}
                        >
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-gradient-to-br from-teal-smoke-300 to-cyan-500 rounded-full mr-2 opacity-60 group-hover:opacity-100 transition-opacity"></div>
                            <span className="flex-1">{item.name}</span>
                            <ChevronDown className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity rotate-[-90deg]" />
                          </div>
                          {/* 호버 효과 */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        </Link>
                      ))}
                    </div>
                    
                    {/* 하단 장식 */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-smoke-200 via-cyan-300 to-elegant-300 rounded-b-xl opacity-60"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </>
  );
}