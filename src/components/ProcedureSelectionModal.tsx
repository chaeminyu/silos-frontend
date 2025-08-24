'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

// 새로운 15개 카테고리 기반 시술 데이터 구조 
const procedureCategories = [
  {
    id: 'silos-signature',
    name: '실로스 시그니처',
    image: '/images/procedures/silos-signature/main.jpg',
    description: '실로스만의 대표 시술로 개인맞춤 아름다움을 완성합니다',
    isSignature: true,
    items: [
      { id: 'silos-lifting', name: '실로프팅(실리프팅)', description: '실로스 특허 실리프팅' },
      { id: 'silofat', name: '실로팻(지방추출주사)', description: '지방세포 직접 제거' },
      { id: 'under-eye-laser', name: '반달레이저(눈밑지방레이저)', description: '10분 완성 눈밑개선' },
      { id: 'neck-lifting', name: '넥리프팅(목리프팅)', description: '목라인 완성' }
    ]
  },
  {
    id: 'silos-lifting',
    name: '실로프팅',
    subtitle: '(SILOS 실리프팅)',
    image: '/images/procedures/silos-lifting/main.jpg',
    description: '시술 부위, 피부 처짐, 지방량, 골격, 니즈 등을 고려해 다양한 실을 복합적으로 활용',
    items: [
      { id: 'custom-thread', name: '커스텀 실로프팅', description: '개인맞춤 실리프팅' },
      { id: 'upper-face', name: '상안면부(이마)', description: '이마 부위 리프팅' },
      { id: 'mid-face', name: '중안면부(팔자/애플존)', description: '중안면 리프팅' },
      { id: 'lower-face', name: '하안면부', description: '하안면 리프팅' },
      { id: 'eye-area', name: '눈밑/눈가/입가', description: '섬세 부위 리프팅' },
      { id: 'nose-lifting', name: '코프팅(코실리프팅)', description: '코 라인 개선' },
      { id: 'aftercare', name: '실로케어(애프터케어)', description: '시술 후 관리' }
    ]
  },
  {
    id: 'custom-lifting',
    name: '커스텀 리프팅',
    image: '/images/procedures/custom-lifting/main.jpg',
    description: 'FDA 승인 의료 장비를 통한 안전하고 효과적인 리프팅',
    items: [
      { id: 'ulthera', name: '울쎄라', description: 'HIFU 리프팅의 대표주자' },
      { id: 'density', name: '덴서티', description: '볼륨 리프팅' },
      { id: 'oltight', name: '올타이트', description: '탄력 개선 리프팅' },
      { id: 'onda', name: '온다', description: '마이크로파 리프팅' },
      { id: 'virtue-rf', name: '버츄RF', description: 'RF 리프팅' },
      { id: 'vro-advance', name: '브이로어드밴스', description: 'V라인 전용 리프팅' },
      { id: 'shrink-universe', name: '슈링크유니버스', description: '한국형 HIFU' },
      { id: 'encore3d', name: '엔코어3D', description: '고강도 집속 초음파' },
      { id: 'revive', name: '리바이브', description: '재생 리프팅' }
    ]
  },
  {
    id: 'face-lifting',
    name: '안면리프팅',
    image: '/images/procedures/face-lifting/main.jpg',
    description: '얼굴 전체를 젊게 만드는 종합적인 리프팅',
    items: [
      { id: 'smas-lift', name: 'SMAS안면거상', description: '깊은층 안면거상술' },
      { id: 'smas-neck-lift', name: 'SMAS안면거상+목거상', description: '안면+목 복합거상술' }
    ]
  },
  {
    id: 'mini-lifting',
    name: '미니리프팅',
    image: '/images/procedures/mini-lifting/main.jpg',
    description: '최소 절개로 자연스러운 리프팅 효과',
    items: [
      { id: 'siloquick-mini', name: '실로퀵미니거상', description: '빠른 미니 거상술' },
      { id: 'mini-lift', name: '미니거상', description: '자연스러운 미니 리프팅' }
    ]
  },
  {
    id: 'forehead-lifting',
    name: '이마리프팅',
    image: '/images/procedures/forehead-lifting/main.jpg',
    description: '내시경을 통한 최소 절개 이마 리프팅',
    items: [
      { id: 'endoscopic-forehead', name: '내시경 이마거상', description: '최소 절개 내시경 수술' }
    ]
  },
  {
    id: 'droopy-eye-lifting',
    name: '처진눈리프팅',
    image: '/images/procedures/droopy-eye-lifting/main.jpg',
    description: '상안검과 하안검을 통한 젊고 또렷한 눈매 완성',
    items: [
      { id: 'upper-lower-bleph', name: '상/하안검', description: '처진 눈꺼풀 개선' },
      { id: 'virtue-rf-eye', name: '버츄RF(눈꺼풀리프팅)', description: 'RF 눈꺼풀 리프팅' }
    ]
  },
  {
    id: 'neck-lifting-new',
    name: '넥(Neck)리프팅',
    image: '/images/procedures/neck-lifting/main.jpg',
    description: '목주름과 이중턱을 동시에 개선',
    items: [
      { id: 'custom-neck', name: '커스텀 넥리프팅', description: '맞춤형 목 리프팅' },
      { id: 'neck-wrinkles', name: '목주름(가로밴드/세로주름)', description: '목주름 집중 개선' }
    ]
  },
  {
    id: 'petit-lifting',
    name: '쁘띠리프팅',
    image: '/images/procedures/petit-lifting/main.jpg',
    description: '얼굴의 특별한 부위까지 세심하게 개인의 매력을 극대화',
    items: [
      { id: 'advanced-filler', name: '고난도필러', description: '고난도 필러 시술' },
      { id: 'special-area-filler', name: '특수부위필러', description: '특수 부위 필러' },
      { id: 'botox', name: '보톡스', description: '주름 개선 보톡스' },
      { id: 'melting-injection', name: '멜팅주사/슬림멜팅주사', description: '지방 분해 주사' },
      { id: 'violet', name: '브이올렛', description: '브이올렛 시술' }
    ]
  },
  {
    id: 'skin-lifting',
    name: '스킨리프팅',
    image: '/images/procedures/skin-lifting/main.jpg',
    description: '근본부터 다른 피부 개선으로 건강하고 젊은 피부 완성',
    items: [
      { id: 'skin-botox', name: '스킨보톡스', description: '피부 전용 보톡스' },
      { id: 'skin-booster', name: '물광주사', description: '즉각적인 수분 공급' },
      { id: 'rejuran', name: '리쥬란힐러(힐러/HB/아이)', description: '연어 DNA 피부 재생' },
      { id: 'juvelook', name: '쥬베룩(스킨/볼륨)', description: 'PDLLA 성분 리프팅' },
      { id: 'olydia', name: '올리디아마요/올리디아아365', description: '히알루론산과 아미노산 조합' },
      { id: 'sculptra', name: '스컬트라', description: '콜라겐 재생 시술' },
      { id: 'radius', name: '레디어스', description: 'CaHA 성분 볼륨업' },
      { id: 'collagen-fill', name: '콜라채움', description: '콜라겐 생성 촉진' }
    ]
  },
  {
    id: 'body-lifting',
    name: '복부리프팅',
    image: '/images/procedures/body-lifting/main.jpg',
    description: '복부와 체형 개선을 위한 전문 시술',
    items: [
      { id: 'abdomen-plastic', name: '복벽성형(처진뱃살)', description: '처진 복부 성형술' },
      { id: 'silocut', name: '실로컷주사(지방분해주사)', description: '지방 분해 주사' },
      { id: 'body-onda', name: '바디온다', description: '바디 전용 온다' }
    ]
  },
  {
    id: 'homme-lifting',
    name: '옴므리프팅',
    image: '/images/procedures/homme-lifting/main.jpg',
    description: '남성 전용 맞춤 케어 시술',
    items: [
      { id: 'homme-skin-care', name: '옴므피부케어', description: '남성 피부 관리' },
      { id: 'homme-lifting-care', name: '옴므리프팅케어', description: '남성 리프팅 케어' },
      { id: 'homme-premium', name: '옴므프리미엄풀케어', description: '남성 프리미엄 케어' }
    ]
  },
  {
    id: 'skin-all-in-one',
    name: '피부올인원',
    image: '/images/procedures/skin-all/main.jpg',
    description: '다양한 피부 고민을 한 번에 해결',
    items: [
      { id: 'pigmentation', name: '색소(기미/흑자/점)', description: '색소 질환 개선' },
      { id: 'pores-scars', name: '모공/흉터', description: '모공과 흉터 개선' },
      { id: 'skin-lesions', name: '비립종/쥐젖/편평사마귀', description: '피부 병변 제거' },
      { id: 'personal-care', name: '퍼스널스킨케어', description: '개인 맞춤 케어' }
    ]
  },
  {
    id: 'hyperhidrosis-cyst',
    name: '액취증 피지낭종',
    image: '/images/procedures/treatment/main.jpg',
    description: '액취증과 피지낭종 전문 치료',
    items: [
      { id: 'hyperhidrosis', name: '액취증', description: '액취증 치료' },
      { id: 'sebaceous-cyst', name: '피지낭종', description: '피지낭종 제거' }
    ]
  },
  {
    id: 'stem-cell',
    name: '줄기세포',
    image: '/images/procedures/stem-cell/main.jpg',
    description: '줄기세포를 이용한 재생 치료',
    items: [
      { id: 'stem-cell-consult', name: '줄기세포 상담문의', description: '줄기세포 치료 상담' }
    ]
  }
];

interface ProcedureSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProcedureId?: string; // 현재 페이지의 시술 자동 선택
  onProceduresSelected: (procedures: string[]) => void; // 선택된 시술들을 부모에게 전달
}

export default function ProcedureSelectionModal({ 
  isOpen, 
  onClose, 
  initialProcedureId,
  onProceduresSelected
}: ProcedureSelectionModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileStep, setMobileStep] = useState<'category' | 'procedure'>('category');
  const categoryListRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모달이 열릴 때 초기화 (selectedItems는 유지)
  useEffect(() => {
    if (isOpen) {
      setMobileStep('category');
      // selectedItems는 초기화하지 않음 - 사용자 선택 유지
      if (initialProcedureId) {
        setSelectedCategory(initialProcedureId);
        // 모바일에서 해당 카테고리로 스크롤
        if (isMobile) {
          setTimeout(() => {
            const targetElement = categoryRefs.current[initialProcedureId];
            if (targetElement && categoryListRef.current) {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
              });
            }
          }, 200); // 모달이 완전히 열린 후 스크롤
        }
      } else {
        setSelectedCategory('silos-lifting'); // 기본값
      }
    }
  }, [isOpen, initialProcedureId, isMobile]);

  const selectedProcedure = procedureCategories.find(cat => cat.id === selectedCategory);

  const handleMobileCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setMobileStep('procedure');
  };

  const handleMobileBack = () => {
    setMobileStep('category');
    // selectedItems는 유지 - 사용자 선택 보존
  };

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSubmit = () => {
    // 선택된 항목들의 이름을 가져와서 부모에게 전달 (카트에는 추가하지 않음)
    const selectedProcedureNames: string[] = [];
    
    procedureCategories.forEach(category => {
      category.items.forEach(item => {
        if (selectedItems.includes(item.id)) {
          selectedProcedureNames.push(item.name);
        }
      });
    });
    
    onProceduresSelected(selectedProcedureNames);
    onClose();
  };

  if (!isOpen) return null;

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* 배경 오버레이 */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* 모바일 모달 컨테이너 */}
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[85vh] flex flex-col overflow-hidden">
            
            {/* 헤더 with Progress */}
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  {mobileStep === 'procedure' && (
                    <button
                      onClick={handleMobileBack}
                      className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  <h2 className="text-lg font-display font-medium text-slate-800">
                    {mobileStep === 'category' ? '1. 시술 선택' : '2. 상담 시술 선택'}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              
              {/* Progress Steps */}
              <div className="flex items-center space-x-2">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                  mobileStep === 'category' 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-cyan-600 text-white'
                }`}>
                  1
                </div>
                <div className={`flex-1 h-0.5 ${
                  mobileStep === 'procedure' ? 'bg-cyan-600' : 'bg-slate-300'
                }`}></div>
                <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                  mobileStep === 'procedure' 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-slate-300 text-slate-600'
                }`}>
                  2
                </div>
              </div>
              
              {/* Step Labels */}
              <div className="flex justify-between mt-2 text-xs font-medium">
                <span className={mobileStep === 'category' ? 'text-cyan-700' : 'text-slate-600'}>
                  시술 카테고리
                </span>
                <span className={mobileStep === 'procedure' ? 'text-cyan-700' : 'text-slate-500'}>
                  세부 시술
                </span>
              </div>
            </div>
            
            {/* Step 1: 시술 카테고리 선택 */}
            {mobileStep === 'category' && (
              <>
                <div ref={categoryListRef} className="flex-1 overflow-y-auto">
                  {/* 상단 안내 */}
                  <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-slate-200">
                    <h3 className="font-display font-medium text-cyan-800 mb-2">관심 있는 시술 카테고리를 선택하세요</h3>
                    <p className="text-sm text-slate-600">카테고리를 선택하면 세부 시술 옵션을 확인할 수 있습니다</p>
                  </div>
                  
                  {/* 카테고리 목록 */}
                  <div className="p-4 space-y-3">
                    {procedureCategories.map((category, index) => (
                      <button
                        key={category.id}
                        ref={(el) => { categoryRefs.current[category.id] = el; }}
                        onClick={() => handleMobileCategorySelect(category.id)}
                        className="w-full text-left p-4 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-cyan-300 transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-xs font-bold text-cyan-600 bg-cyan-100 px-2 py-1 rounded-full">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <div className="font-elegant-sans font-medium text-slate-800 group-hover:text-cyan-700 transition-colors">
                                {category.name}
                              </div>
                            </div>
                            <div className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                              {category.description}
                            </div>
                            <div className="text-xs text-cyan-600 mt-2 opacity-75">
                              {category.items.length}개 세부 시술 옵션 →
                            </div>
                          </div>
                          <svg className="w-5 h-5 text-slate-400 group-hover:text-cyan-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* 하단 Step 2 Preview */}
                <div className="border-t border-slate-200 bg-slate-50 p-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                      <div className="text-sm font-medium text-slate-700">다음 단계</div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    </div>
                    <div className="text-xs text-slate-600 leading-relaxed">
                      선택한 시술의 <span className="font-medium text-cyan-700">세부 옵션</span>을 확인하고<br/>
                      원하는 시술을 선택해서 상담 신청할 수 있어요
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {/* Step 2: 세부 시술 선택 */}
            {mobileStep === 'procedure' && selectedProcedure && (
              <>
                <div className="flex-1 overflow-y-auto">
                  {/* 선택된 카테고리 정보 */}
                  <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-slate-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                      <h3 className="font-display font-medium text-cyan-800">
                        {selectedProcedure.name}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                      {selectedProcedure.description}
                    </p>
                    <div className="text-xs text-cyan-700 font-medium">
                      관심있는 세부 시술을 선택해주세요 ({selectedProcedure.items.length}개 옵션)
                    </div>
                  </div>
                  
                  {/* 세부 시술 목록 */}
                  <div className="p-4 space-y-3">
                    {selectedProcedure.items.map((item, index) => (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`p-4 border rounded-xl transition-all duration-200 cursor-pointer group ${
                          selectedItems.includes(item.id)
                            ? 'border-cyan-300 bg-cyan-50 shadow-md'
                            : 'border-slate-200 hover:bg-slate-50 hover:border-cyan-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                selectedItems.includes(item.id)
                                  ? 'text-cyan-700 bg-cyan-200'
                                  : 'text-slate-600 bg-slate-200'
                              }`}>
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <h5 className={`font-elegant-sans font-medium ${
                                selectedItems.includes(item.id) 
                                  ? 'text-cyan-800' 
                                  : 'text-slate-800 group-hover:text-cyan-700'
                              }`}>
                                {item.name}
                              </h5>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                          </div>
                          <div
                            className={`ml-3 p-2 rounded-lg transition-colors ${
                              selectedItems.includes(item.id)
                                ? 'bg-cyan-600 text-white shadow-lg'
                                : 'bg-slate-200 text-slate-600 group-hover:bg-cyan-100'
                            }`}
                          >
                            {selectedItems.includes(item.id) ? (
                              <Minus className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 하단 액션 바 */}
                <div className="border-t border-slate-200 p-4 bg-gradient-to-r from-slate-50 to-gray-50">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-elegant-sans font-medium text-slate-700">
                        선택된 시술
                      </span>
                      <span className={`text-sm font-bold ${
                        selectedItems.length > 0 ? 'text-cyan-700' : 'text-slate-500'
                      }`}>
                        {selectedItems.length}개
                      </span>
                    </div>
                    {selectedItems.length === 0 && (
                      <p className="text-xs text-slate-500 leading-relaxed">
                        최소 1개 이상의 시술을 선택해주세요
                      </p>
                    )}
                    {selectedItems.length > 0 && (
                      <p className="text-xs text-cyan-600 leading-relaxed">
                        선택한 시술에 대한 맞춤 상담을 받으실 수 있어요
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={selectedItems.length === 0}
                    className={`w-full py-4 rounded-xl font-elegant-sans font-medium text-base transition-all duration-300 ${
                      selectedItems.length > 0
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {selectedItems.length > 0 
                      ? `${selectedItems.length}개 시술 상담 신청하기` 
                      : '시술을 선택해주세요'
                    }
                  </button>
                </div>
              </>
            )}
            
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout (기존 레이아웃 유지)
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 데스크톱 모달 컨테이너 */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[80vh] flex overflow-hidden">
          
          {/* 왼쪽 사이드바 - 시술 카테고리 */}
          <div className="w-1/3 bg-slate-50 border-r border-slate-200 overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-display font-medium text-slate-800 mb-6">시술 선택</h3>
              <div className="space-y-2">
                {procedureCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-teal-smoke-100 text-teal-900 shadow-md'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="font-elegant-sans font-medium">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* 오른쪽 메인 콘텐츠 */}
          <div className="flex-1 flex flex-col">
            
            {/* 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-display font-medium text-slate-800">상담 시술 선택</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>
            
            {/* 선택된 시술 상세 정보 */}
            <div className="flex-1 overflow-y-auto p-6">
              {selectedProcedure && (
                <div className="space-y-6">
                  
                  {/* 시술 헤더 정보 */}
                  <div className="flex space-x-6">
                    <div className="w-48 h-32 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-xl flex items-center justify-center">
                      <div className="text-center text-teal-smoke-600">
                        <ShoppingCart className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm font-elegant-sans">{selectedProcedure.name}</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-3">
                        {selectedProcedure.name}
                      </h3>
                      <p className="text-slate-600 font-elegant-sans leading-relaxed">
                        {selectedProcedure.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* 세부 항목 목록 */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-elegant font-medium text-slate-800 mb-4">세부 시술 선택</h4>
                    {selectedProcedure.items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`flex items-center justify-between p-4 border rounded-xl transition-colors cursor-pointer ${
                          selectedItems.includes(item.id)
                            ? 'border-teal-smoke-300 bg-teal-smoke-50'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex-1">
                          <h5 className="font-elegant-sans font-medium text-slate-800 mb-1">
                            {item.name}
                          </h5>
                          <p className="text-sm text-slate-600">{item.description}</p>
                        </div>
                        <div
                          className={`ml-4 p-2 rounded-lg transition-colors ${
                            selectedItems.includes(item.id)
                              ? 'bg-teal-smoke-500 text-white'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {selectedItems.includes(item.id) ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* 하단 액션 바 */}
            <div className="border-t border-slate-200 p-6 bg-slate-50">
              <div className="flex items-center justify-between">
                <div className="text-slate-700">
                  <span className="font-elegant-sans font-medium">
                    총 {selectedItems.length}개 시술 선택
                  </span>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={selectedItems.length === 0}
                  className={`px-8 py-3 rounded-xl font-elegant-sans font-medium transition-all duration-300 ${
                    selectedItems.length > 0
                      ? 'bg-teal-smoke-500 hover:bg-teal-smoke-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  상담 신청하기
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}