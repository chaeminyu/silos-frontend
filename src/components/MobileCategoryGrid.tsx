'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Star } from 'lucide-react';
import Link from 'next/link';

// 15개 카테고리 데이터 구조 - 새로운 계층 구조 URL 적용
const mobileCategories = [
  {
    id: 1,
    title: '실로스 시그니처',
    isImportant: true,
    items: [
      { name: '실로프팅(실리프팅)', href: '/procedures/silos-signature/silos-lifting' },
      { name: '실로팻(지방추출주사)', href: '/procedures/silos-signature/silofat' },
      { name: '반달레이저(눈밑지방레이저)', href: '/procedures/silos-signature/under-eye-laser' },
      { name: '넥리프팅(목리프팅)', href: '/procedures/silos-signature/neck-lifting' }
    ]
  },
  {
    id: 2,
    title: '실로프팅',
    subtitle: '(SILOS 실리프팅)',
    items: [
      { name: '커스텀 실로프팅', href: '/procedures/silos-lifting/custom-thread' },
      { name: '상안면부(이마)', href: '/procedures/silos-lifting/upper-face' },
      { name: '중안면부(팔자/애플존)', href: '/procedures/silos-lifting/mid-face' },
      { name: '하안면부', href: '/procedures/silos-lifting/lower-face' },
      { name: '눈밑/눈가/입가', href: '/procedures/silos-lifting/eye-area' },
      { name: '코프팅(코실리프팅)', href: '/procedures/silos-lifting/nose-lifting' },
      { name: '실로케어(애프터케어)', href: '/procedures/silos-lifting/aftercare' }
    ]
  },
  {
    id: 3,
    title: '커스텀 리프팅',
    items: [
      { name: '울쎄라', href: '/procedures/custom-lifting/ulthera' },
      { name: '덴서티', href: '/procedures/custom-lifting/density' },
      { name: '올타이트', href: '/procedures/custom-lifting/oltight' },
      { name: '온다', href: '/procedures/custom-lifting/onda' },
      { name: '버츄RF', href: '/procedures/custom-lifting/virtue-rf' },
      { name: '브이로어드밴스', href: '/procedures/custom-lifting/vro-advance' },
      { name: '슈링크유니버스', href: '/procedures/custom-lifting/shrink-universe' },
      { name: '엔코어3D', href: '/procedures/custom-lifting/encore3d' },
      { name: '리바이브', href: '/procedures/custom-lifting/revive' }
    ]
  },
  {
    id: 4,
    title: '안면리프팅',
    items: [
      { name: 'SMAS안면거상', href: '/procedures/face-lifting/smas-lift' },
      { name: 'SMAS안면거상+목거상', href: '/procedures/face-lifting/smas-neck-lift' }
    ]
  },
  {
    id: 5,
    title: '미니리프팅',
    items: [
      { name: '실로퀵미니거상', href: '/procedures/mini-lifting/siloquick-mini' },
      { name: '미니거상', href: '/procedures/mini-lifting/mini-lift' }
    ]
  },
  {
    id: 6,
    title: '이마리프팅',
    items: [
      { name: '내시경 이마거상', href: '/procedures/forehead-lifting/endoscopic-forehead' }
    ]
  },
  {
    id: 7,
    title: '처진눈리프팅',
    items: [
      { name: '상/하안검', href: '/procedures/droopy-eye-lifting/upper-lower-bleph' },
      { name: '버츄RF(눈꺼풀리프팅)', href: '/procedures/droopy-eye-lifting/virtue-rf-eye' }
    ]
  },
  {
    id: 8,
    title: '넥(Neck)리프팅',
    items: [
      { name: '커스텀 넥리프팅', href: '/procedures/neck-lifting-new/custom-neck' },
      { name: '목주름(가로밴드/세로주름)', href: '/procedures/neck-lifting-new/neck-wrinkles' }
    ]
  },
  {
    id: 9,
    title: '쁘띠리프팅',
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
    items: [
      { name: '복벽성형(처진뱃살)', href: '/procedures/body-lifting/abdomen-plastic' },
      { name: '실로컷주사(지방분해주사)', href: '/procedures/body-lifting/silocut' },
      { name: '바디온다', href: '/procedures/body-lifting/body-onda' }
    ]
  },
  {
    id: 12,
    title: '옴므리프팅',
    items: [
      { name: '옴므피부케어', href: '/procedures/homme-lifting/homme-skin-care' },
      { name: '옴므리프팅케어', href: '/procedures/homme-lifting/homme-lifting-care' },
      { name: '옴므프리미엄풀케어', href: '/procedures/homme-lifting/homme-premium' }
    ]
  },
  {
    id: 13,
    title: '피부올인원',
    items: [
      { name: '색소(기미/흑자/점)', href: '/procedures/skin-all-in-one/pigmentation' },
      { name: '모공/흉터', href: '/procedures/skin-all-in-one/pores-scars' },
      { name: '비립종/쥐젖/편평사마귀', href: '/procedures/skin-all-in-one/skin-lesions' },
      { name: '퍼스널스킨케어', href: '/procedures/skin-all-in-one/personal-care' }
    ]
  },
  {
    id: 14,
    title: '액취증',
    subtitle: '피지낭종',
    items: [
      { name: '액취증', href: '/procedures/hyperhidrosis-cyst/hyperhidrosis' },
      { name: '피지낭종', href: '/procedures/hyperhidrosis-cyst/sebaceous-cyst' }
    ]
  },
  {
    id: 15,
    title: '줄기세포',
    items: [
      { name: '줄기세포 상담문의', href: '/procedures/stem-cell/stem-cell-consult' }
    ]
  }
];

export default function MobileCategoryGrid() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  // Close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (expandedCategory) {
        setExpandedCategory(null);
      }
    };

    if (expandedCategory) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
    return undefined;
  }, [expandedCategory]);

  const toggleCategory = (categoryId: number, event?: React.MouseEvent) => {
    const newExpanded = expandedCategory === categoryId ? null : categoryId;
    
    if (newExpanded && event) {
      // Calculate position for portal dropdown
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width
      });
    }
    
    setExpandedCategory(newExpanded);
  };

  return (
    <>
      <div className="w-full px-3 py-4 bg-gradient-to-br from-teal-smoke-50 via-white to-teal-smoke-100 relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-100/30 to-transparent"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-smoke-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-elegant-200/20 rounded-full blur-2xl"></div>
        
        {/* 버티컬 레이아웃 - 5행 3열 */}
        <div className="relative space-y-2">
          {/* 첫 번째 행 */}
          <div className="flex gap-2">
          {mobileCategories.slice(0, 3).map((category) => {
            const isExpanded = expandedCategory === category.id;
            
            return (
              <div 
                key={category.id}
                className="relative flex-1"
              >
                {/* 카테고리 박스 - 모던하고 세련된 디자인 */}
                <button
                  onClick={(e) => toggleCategory(category.id, e)}
                  className={`
                    w-full h-20 p-2.5
                    ${category.isImportant 
                      ? 'bg-gradient-to-br from-teal-smoke-100 via-white/90 to-teal-smoke-200 border-teal-smoke-300/60 shadow-lg shadow-teal-smoke-200/30' 
                      : 'bg-white/70 border-teal-smoke-100/50 shadow-sm'
                    }
                    border rounded-xl
                    flex flex-col items-center justify-center
                    text-center transition-all duration-300
                    hover:shadow-xl hover:scale-[1.02] hover:bg-white/90
                    backdrop-blur-md
                    relative overflow-hidden
                    group
                  `}
                >
                  {/* 배경 그라데이션 효과 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-teal-smoke-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  
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
                    text-[11px] font-semibold leading-tight z-10 relative
                    ${category.isImportant ? 'text-cyan-800' : 'text-slate-700'}
                    group-hover:text-cyan-900 transition-colors duration-300
                  `}>
                    {category.title}
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
          
          {/* 두 번째 행 */}
          <div className="flex gap-2">
          {mobileCategories.slice(3, 6).map((category) => {
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
                      ? 'bg-gradient-to-br from-teal-smoke-100 via-white/90 to-teal-smoke-200 border-teal-smoke-300/60 shadow-lg shadow-teal-smoke-200/30' 
                      : 'bg-white/70 border-teal-smoke-100/50 shadow-sm'
                    }
                    border rounded-xl
                    flex flex-col items-center justify-center
                    text-center transition-all duration-300
                    hover:shadow-xl hover:scale-[1.02] hover:bg-white/90
                    backdrop-blur-md
                    relative overflow-hidden
                    group
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-teal-smoke-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  
                  {category.isImportant && (
                    <div className="absolute -top-1 -right-1 z-10">
                      <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                        <Star className="w-3 h-3 text-white fill-white" />
                      </div>
                    </div>
                  )}
                  
                  <span className={`
                    text-[11px] font-semibold leading-tight z-10 relative
                    ${category.isImportant ? 'text-cyan-800' : 'text-slate-700'}
                    group-hover:text-cyan-900 transition-colors duration-300
                  `}>
                    {category.title}
                  </span>
                  
                  {category.subtitle && (
                    <span className="text-[9px] text-slate-500 mt-0.5 leading-tight z-10 relative group-hover:text-slate-600 transition-colors duration-300">
                      {category.subtitle}
                    </span>
                  )}
                  
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
          
          {/* 세 번째 행 */}
          <div className="flex gap-2">
          {mobileCategories.slice(6, 9).map((category) => {
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
                      ? 'bg-gradient-to-br from-teal-smoke-100 via-white/90 to-teal-smoke-200 border-teal-smoke-300/60 shadow-lg shadow-teal-smoke-200/30' 
                      : 'bg-white/70 border-teal-smoke-100/50 shadow-sm'
                    }
                    border rounded-xl
                    flex flex-col items-center justify-center
                    text-center transition-all duration-300
                    hover:shadow-xl hover:scale-[1.02] hover:bg-white/90
                    backdrop-blur-md
                    relative overflow-hidden
                    group
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-teal-smoke-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  
                  {category.isImportant && (
                    <div className="absolute -top-1 -right-1 z-10">
                      <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                        <Star className="w-3 h-3 text-white fill-white" />
                      </div>
                    </div>
                  )}
                  
                  <span className={`
                    text-[11px] font-semibold leading-tight z-10 relative
                    ${category.isImportant ? 'text-cyan-800' : 'text-slate-700'}
                    group-hover:text-cyan-900 transition-colors duration-300
                  `}>
                    {category.title}
                  </span>
                  
                  {category.subtitle && (
                    <span className="text-[9px] text-slate-500 mt-0.5 leading-tight z-10 relative group-hover:text-slate-600 transition-colors duration-300">
                      {category.subtitle}
                    </span>
                  )}
                  
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
          
          {/* 네 번째 행 */}
          <div className="flex gap-2">
          {mobileCategories.slice(9, 12).map((category) => {
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
                      ? 'bg-gradient-to-br from-teal-smoke-100 via-white/90 to-teal-smoke-200 border-teal-smoke-300/60 shadow-lg shadow-teal-smoke-200/30' 
                      : 'bg-white/70 border-teal-smoke-100/50 shadow-sm'
                    }
                    border rounded-xl
                    flex flex-col items-center justify-center
                    text-center transition-all duration-300
                    hover:shadow-xl hover:scale-[1.02] hover:bg-white/90
                    backdrop-blur-md
                    relative overflow-hidden
                    group
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-teal-smoke-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  
                  {category.isImportant && (
                    <div className="absolute -top-1 -right-1 z-10">
                      <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                        <Star className="w-3 h-3 text-white fill-white" />
                      </div>
                    </div>
                  )}
                  
                  <span className={`
                    text-[11px] font-semibold leading-tight z-10 relative
                    ${category.isImportant ? 'text-cyan-800' : 'text-slate-700'}
                    group-hover:text-cyan-900 transition-colors duration-300
                  `}>
                    {category.title}
                  </span>
                  
                  {category.subtitle && (
                    <span className="text-[9px] text-slate-500 mt-0.5 leading-tight z-10 relative group-hover:text-slate-600 transition-colors duration-300">
                      {category.subtitle}
                    </span>
                  )}
                  
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
          
          {/* 다섯 번째 행 */}
          <div className="flex gap-2">
          {mobileCategories.slice(12, 15).map((category) => {
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
                      ? 'bg-gradient-to-br from-teal-smoke-100 via-white/90 to-teal-smoke-200 border-teal-smoke-300/60 shadow-lg shadow-teal-smoke-200/30' 
                      : 'bg-white/70 border-teal-smoke-100/50 shadow-sm'
                    }
                    border rounded-xl
                    flex flex-col items-center justify-center
                    text-center transition-all duration-300
                    hover:shadow-xl hover:scale-[1.02] hover:bg-white/90
                    backdrop-blur-md
                    relative overflow-hidden
                    group
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-teal-smoke-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  
                  {category.isImportant && (
                    <div className="absolute -top-1 -right-1 z-10">
                      <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                        <Star className="w-3 h-3 text-white fill-white" />
                      </div>
                    </div>
                  )}
                  
                  <span className={`
                    text-[11px] font-semibold leading-tight z-10 relative
                    ${category.isImportant ? 'text-cyan-800' : 'text-slate-700'}
                    group-hover:text-cyan-900 transition-colors duration-300
                  `}>
                    {category.title}
                  </span>
                  
                  {category.subtitle && (
                    <span className="text-[9px] text-slate-500 mt-0.5 leading-tight z-10 relative group-hover:text-slate-600 transition-colors duration-300">
                      {category.subtitle}
                    </span>
                  )}
                  
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
        </div>
      </div>

      {/* Portal Dropdown */}
      {expandedCategory && ((() => {
        const category = mobileCategories.find(cat => cat.id === expandedCategory);
        if (!category) return null;

        return (
          <div 
            className="fixed bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-teal-smoke-200/50 p-4 z-[10001] overflow-y-auto"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: Math.max(dropdownPosition.width, 280),
              maxHeight: '60vh'
            }}
          >
            {/* 배경 그라데이션 */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-50/50 via-white to-elegant-50/30 rounded-xl"></div>
            
            {/* 헤더 */}
            <div className="relative mb-3 pb-2 border-b border-gradient-to-r from-transparent via-teal-smoke-300/50 to-transparent">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-800 flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full mr-2"></div>
                  {category.title}
                </span>
                <div className="text-[10px] text-slate-500 bg-teal-smoke-100/60 px-2 py-0.5 rounded-full">
                  {category.items.length}개
                </div>
              </div>
            </div>
            
            {/* 메뉴 아이템들 */}
            <div className="relative space-y-1">
              {category.items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="group block px-3 py-2.5 text-[11px] font-medium text-slate-700 hover:bg-gradient-to-r hover:from-teal-smoke-100/80 hover:via-white/50 hover:to-elegant-100/80 hover:text-cyan-800 rounded-lg transition-all duration-300 relative overflow-hidden border border-transparent hover:border-teal-smoke-200/50"
                  onClick={() => setExpandedCategory(null)}
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
        );
      })())}
    </>
  );
}