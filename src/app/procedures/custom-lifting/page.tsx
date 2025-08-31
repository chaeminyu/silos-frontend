'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
import { Zap, Clock, Shield, Star, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const customLiftingProcedures = [
  {
    id: 'ulthera',
    title: '울쎄라',
    subtitle: 'ULTHERA',
    description: [
      'FDA 승인 글로벌 비수술 안면거상 리프트레이저',
      '정품팁으로만 가능 전세계 1백만의 프리미엄 안티에이징',
      '콜라겐이 생성되며 시간이 지날수록 차오르는 탄력과 리프팅 효과',
      '안면거상술과 동일한 타겟층, 처진 원인이 되는 근막층(SMAS)까지 도달',
      '실시간 피부층 초음파영상을 통해 안전하면서도 효과적인 시술가능'
    ],
    features: ['FDA승인', '실시간영상', '근막층도달'],
    duration: '15분내외'
  },
  {
    id: 'density',
    title: '덴서티',
    subtitle: 'DENSITY',
    description: [
      '강력한 모노폴라 타입의 고주파 에너지를',
      '피부 깊은곳까지 각 부위 별로 균일하게 전달하며',
      '3가지 팁을 통해 목적과 타겟에 맞는 시술 가능',
      '5단계 쿨링 및 쿨타임 조절 기능과',
      '진한정 가스 분사 방식의 냉각 시스템으로',
      '안전하고 편안한 시술 가능'
    ],
    features: ['모노폴라', '3팁시스템', '냉각시스템'],
    duration: '30분내외'
  },
  {
    id: 'oltight',
    title: '올타이트',
    subtitle: 'OLTIGHT',
    description: [
      '프리미엄 리프팅 장비로 깊은 층부터 표면층까지',
      '다층적 리프팅으로 확실한 효과를 제공',
      '개인별 피부 상태에 맞춘 맞춤형 시술',
      '즉시 확인 가능한 리프팅 효과',
      '지속적인 콜라겐 재생으로 오래가는 탄력'
    ],
    features: ['다층리프팅', '즉시효과', '맞춤시술'],
    duration: '25분내외'
  },
  {
    id: 'onda',
    title: '온다',
    subtitle: 'ONDA',
    description: [
      '고주파, 초음파를 대신하는 극초단파를 사용하는 새로운 원리의 리프팅',
      '빠르고 자연스러운 리프팅 효과 및 타이트닝으로 이중턱, 심술보 개선에 도움',
      '시술 후 지속적인 콜라겐 리모델링 효과로 피부결, 피부 탄력 효과와 함께',
      '비침습적 방식으로 통증 및 일상생활 지장 없이 시술이 가능하며',
      '팔·허벅지·복부 등 부분 지방 파괴 등 개선에 효과적'
    ],
    features: ['극초단파', '비침습적', '지방개선'],
    duration: '20분내외'
  },
  {
    id: 'virtue-rf',
    title: '버츄RF',
    subtitle: 'VIRTUE RF',
    description: [
      '마이크로니들 RF 기술로 정밀한 깊이 조절 가능',
      '최소한의 다운타임으로 최대한의 리프팅 효과',
      '흉터와 모공 개선까지 동시에 가능',
      '개인별 피부 타입에 맞춘 에너지 조절',
      '자연스러운 콜라겐 재생과 피부 재생 효과'
    ],
    features: ['마이크로니들RF', '최소다운타임', '흉터개선'],
    duration: '35분내외'
  },
  {
    id: 'vro-advance',
    title: '브이로어드밴스',
    subtitle: 'V-RO ADVANCE',
    description: [
      '7가지 카트리지로 진피층, SMAS층 등 다양한 피부층에',
      '미세한 열응고 구역을 다수 생성시킨 후',
      '열에너지를 이용하여 재생 및 회복 작용을 이용하는',
      '집속초음파(HIFU) + 고주파(RF) 리프팅 장비',
      '어드밴스 기술로 더욱 정밀하고 효과적인 시술'
    ],
    features: ['7카트리지', 'HIFU+RF', '열에너지'],
    duration: '35분내외'
  },
  {
    id: 'shrink-universe',
    title: '슈링크유니버스',
    subtitle: 'SHURINK UNIVERSE',
    description: [
      '근막층(SMAS)부터 끌어올리는 HIFU에너지',
      '콜라겐 섬유의 재생과 자연스러운 리프팅 효과',
      '콜라겐과 엘라스틴의 재생반응으로 오랜기간 동안 유지되는 탄력감',
      '일반레이저는 침투하지 못하는 안면거상술의 타겟층까지 도달',
      '빠르고 강력한 효과, 적은 시술통증'
    ],
    features: ['HIFU에너지', '자연리프팅', '강력효과'],
    duration: '30분내외'
  },
  {
    id: 'encore3d',
    title: '엔코어3D',
    subtitle: 'ENCORE 3D',
    description: [
      '일반적인 HIFU 초음파, 고주파 방식이 아닌',
      '755, 808, 1064nm의 세 가지 파장을 이용',
      '빛 에너지를 동시에 조사하여 피부 깊은 곳에 위치한',
      '피부 코어(유지인대)를 리프팅하는 새로운 방식의 리프팅',
      '통증/염/붓기 부담이 적은 저자극 시술'
    ],
    features: ['3파장', '저자극', '유지인대'],
    duration: '25분내외'
  },
  {
    id: 'revive',
    title: '리바이브',
    subtitle: 'REVIVE',
    description: [
      '피부 재생과 리프팅을 동시에 해결하는 혁신적 시술',
      '자연스러운 볼륨 복원과 탄력 개선',
      '노화된 피부를 젊고 건강한 상태로 되돌림',
      '개인별 피부 상태에 맞춘 맞춤형 에너지 전달',
      '지속적인 재생 효과로 오래가는 아름다움'
    ],
    features: ['피부재생', '볼륨복원', '지속효과'],
    duration: '40분내외'
  }
];

export default function CustomLiftingPage() {
  const searchParams = useSearchParams();
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [activeTab, setActiveTab] = useState<string>('ulthera');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('01');

  // Handle URL parameter for direct tab access
  useEffect(() => {
    const procedureParam = searchParams.get('procedure');
    if (procedureParam) {
      // Find matching procedure
      const validProcedure = customLiftingProcedures.find(proc => proc.id === procedureParam);
      if (validProcedure) {
        setActiveTab(procedureParam);
      }
    }
  }, [searchParams]);

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

  const handleToggleCart = (partId: string, partName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (isInCart(partId)) {
      removeFromCart(partId);
      console.log(`Removed from cart: 커스텀 리프팅 - ${partName}`);
    } else {
      addToCart({
        id: partId,
        name: partName,
        category: '커스텀 리프팅'
      });
      console.log(`Added to cart: 커스텀 리프팅 - ${partName}`);
    }
  };

  const bodyParts = [
    { id: '01', name: '얼굴 전체', image: '/images/procedures/custom-lifting/areas/full-face.png' },
    { id: '02', name: '이마주름', image: '/images/procedures/custom-lifting/areas/forehead.png' },
    { id: '03', name: '눈밑눈가', image: '/images/procedures/custom-lifting/areas/eye-area.png' },
    { id: '04', name: '심부볼', image: '/images/procedures/custom-lifting/areas/deep-cheek.png' },
    { id: '05', name: '팔자주름', image: '/images/procedures/custom-lifting/areas/nasolabial.png' },
    { id: '06', name: '턱라인', image: '/images/procedures/custom-lifting/areas/jawline.png' },
    { id: '07', name: '이중턱', image: '/images/procedures/custom-lifting/areas/double-chin.png' },
    { id: '08', name: '목주름', image: '/images/procedures/custom-lifting/areas/neck-wrinkles.png' }
  ];

  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <div className="relative pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-400 via-elegant-400 to-teal-smoke-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-elegant-sans font-medium mb-8 border border-white/30">
              <Zap className="w-4 h-4 mr-2" />
              SILOS LIFTING
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-light mb-6 tracking-wide leading-tight">
              커스텀 리프팅
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light max-w-3xl mx-auto leading-relaxed text-white/90">
              시간을 거스르는 리프팅<br />
              입체적이고 세련된 라인을 시작하세요
            </p>
          </div>
        </div>
      </div>

      {/* 메인 섹션 */}
      <div className="relative -mt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 소개 카드 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-display font-light text-teal-smoke-800 mb-8 tracking-wide">
                SILOS LIFTING<br />
                <span className="text-3xl lg:text-4xl text-slate-700">커스텀 리프팅</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full mx-auto mb-8"></div>
            </div>
            
            <div className="max-w-4xl mx-auto text-center mb-12">
              <p className="text-lg font-elegant-sans font-light text-slate-600 leading-relaxed mb-8">
                FDA 승인 의료 장비를 통한 안전하고 효과적인 리프팅<br />
                실로스에서는 개개인의 피부 상태와 니즈를 분석하여<br />
                가장 적합한 장비와 방법으로 커스텀 리프팅을 진행합니다.
              </p>
            </div>

            {/* 주요 특징 */}
            <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-4 md:gap-6 mt-12 pb-4">
              {[
                { title: '시술시간', value: '15분내외', icon: Clock },
                { title: '마취방법', value: '연고마취', icon: Shield },
                { title: '회복기간', value: '일상생활바로가능', icon: Star },
                { title: '유지기간', value: '3~6개월', icon: Zap }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="text-center flex-shrink-0 w-48 md:w-auto">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-smoke-300 to-elegant-300 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-elegant font-medium text-teal-smoke-800 mb-2">{item.title}</h4>
                    <p className="text-slate-600 font-elegant-sans font-light text-sm">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* EQUIPMENT 섹션 - 현대적 세로 탭 구조 */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-display font-light text-teal-smoke-800 mb-4">
                EQUIPMENT
              </h3>
              <h4 className="text-2xl font-elegant font-light text-slate-700 mb-6">
                커스텀 리프팅 장비
              </h4>
              <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto"></div>
            </div>

            {/* 세로 탭 레이아웃 - 모바일 최적화 */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 bg-white rounded-xl lg:rounded-3xl shadow-xl border border-teal-smoke-200/30">
              {/* 왼쪽 사이드바 - 탭 목록 */}
              <div className="w-full lg:w-1/3 bg-gradient-to-b from-teal-smoke-50 to-elegant-50 relative z-10 rounded-t-xl lg:rounded-l-3xl lg:rounded-r-none">
                <div className="p-4 lg:p-6 w-full relative z-10">
                  <h4 className="text-base lg:text-lg font-display font-medium text-teal-smoke-800 mb-4 lg:mb-6 text-center lg:text-left">
                    시술 선택
                  </h4>
                  
                  <div className="flex flex-wrap lg:flex-col gap-2 lg:gap-3 w-full justify-start items-stretch">
                    {customLiftingProcedures.map((procedure, index) => (
                      <button
                        key={procedure.id}
                        onClick={() => setActiveTab(procedure.id)}
                        className={`group relative text-left p-3 lg:p-4 rounded-xl transition-all duration-300 lg:transform lg:hover:scale-[1.02] touch-manipulation cursor-pointer min-h-[60px] w-[calc(33.333%-8px)] sm:w-[calc(33.333%-6px)] lg:w-full flex flex-col justify-center ${
                          activeTab === procedure.id
                            ? 'bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white shadow-lg'
                            : 'bg-white hover:bg-teal-smoke-100 text-slate-700 shadow-sm hover:shadow-md border border-teal-smoke-200/50'
                        }`}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        {/* 순서 번호 - 오른쪽 상단으로 이동 */}
                        <div className={`absolute top-1 right-1 lg:-top-2 lg:-left-2 w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center text-xs font-bold pointer-events-none z-10 ${
                          activeTab === procedure.id
                            ? 'bg-white text-teal-smoke-600'
                            : 'bg-teal-smoke-200 text-teal-smoke-700'
                        }`}>
                          {index + 1}
                        </div>
                        
                        {/* 콘텐츠 컨테이너 */}
                        <div className="relative z-10 w-full">
                          {/* 시술명 */}
                          <div className="font-elegant-sans font-bold text-xs lg:text-sm mb-1 lg:mb-2 leading-tight">
                            {procedure.title}
                          </div>
                          
                          {/* 영문명 - 이제 모바일에서도 표시 */}
                          <div className={`text-xs font-light mt-1 ${
                            activeTab === procedure.id ? 'text-white/90' : 'text-slate-500'
                          }`}>
                            {procedure.subtitle}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 오른쪽 콘텐츠 - 선택된 시술 상세 정보 */}
              <div className="lg:w-2/3 p-4 lg:p-8 relative z-0">
                {(() => {
                  const activeProcedure = customLiftingProcedures.find(proc => proc.id === activeTab) || customLiftingProcedures[0];
                  return (
                    <div key={activeProcedure.id} className="animate-fadeIn">
                      {/* 헤더 */}
                      <div className="mb-6 lg:mb-8">
                        <h3 className="text-2xl lg:text-3xl font-display font-light text-teal-smoke-800 mb-2 lg:mb-3 tracking-wide">
                          {activeProcedure.title}
                        </h3>
                        <p className="text-lg lg:text-xl font-elegant-sans font-light text-slate-600 mb-4 lg:mb-6">
                          {activeProcedure.subtitle}
                        </p>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full"></div>
                      </div>

                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                        {/* 왼쪽: 설명 */}
                        <div>
                          <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                            {activeProcedure.description.map((desc, i) => (
                              <div key={i} className="flex items-start space-x-3">
                                <div className="w-1.5 h-1.5 bg-teal-smoke-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-sm lg:text-base text-slate-600 font-elegant-sans font-light leading-relaxed">
                                  {desc}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* 특징 배지들 */}
                          <div className="flex flex-wrap gap-2 lg:gap-3 mb-4 lg:mb-6">
                            {activeProcedure.features.map((feature, i) => (
                              <div key={i} className="inline-flex items-center px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-elegant-sans font-medium bg-gradient-to-r from-teal-smoke-100 to-elegant-100 text-teal-smoke-700 border border-teal-smoke-200">
                                <Zap className="w-2.5 h-2.5 lg:w-3 lg:h-3 mr-1 lg:mr-2" />
                                {feature}
                              </div>
                            ))}
                          </div>

                          {/* 시술시간 */}
                          <div className="inline-flex items-center px-4 lg:px-5 py-2 lg:py-3 rounded-xl text-xs lg:text-sm font-elegant-sans font-bold bg-gradient-to-r from-elegant-200 to-teal-smoke-200 text-slate-700 border border-elegant-300 shadow-md">
                            <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4 mr-1.5 lg:mr-2" />
                            시술시간: {activeProcedure.duration}
                          </div>
                        </div>

                        {/* 오른쪽: 장비 이미지 */}
                        <div className="flex justify-center items-start">
                          <div className="w-full max-w-sm">
                            <div className="aspect-square bg-gradient-to-br from-teal-smoke-50 to-elegant-50 rounded-2xl border-2 border-teal-smoke-200/30 p-4 lg:p-6 shadow-lg">
                              {(() => {
                                const imageMap: { [key: string]: string } = {
                                  'ulthera': 'ulthera',
                                  'density': 'density', 
                                  'onda': 'onda',
                                  'shrink-universe': 'shurink',
                                  'encore3d': 'ncore',
                                  'vro-advance': 'vro'
                                };
                                
                                const imageName = imageMap[activeProcedure.id];
                                
                                if (imageName) {
                                  return (
                                    <img 
                                      src={`/images/procedures/custom-lifting/equipment/lifting_${imageName}.png`}
                                      alt={`${activeProcedure.title} 장비`}
                                      className="w-full h-full object-contain"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                      }}
                                    />
                                  );
                                } else {
                                  return (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                      <div className="text-center">
                                        <div className="text-4xl mb-2">🔧</div>
                                        <div className="text-sm font-elegant-sans">장비 이미지</div>
                                        <div className="text-xs">준비 중</div>
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                            </div>
                            
                            {/* 시술 상담 버튼 */}
                            <div className="mt-4 lg:mt-6 text-center">
                              <button
                                onClick={() => {
                                  if (isInCart(activeProcedure.id)) {
                                    removeFromCart(activeProcedure.id);
                                    console.log(`Removed from cart: 커스텀 리프팅 - ${activeProcedure.title}`);
                                  } else {
                                    addToCart({
                                      id: activeProcedure.id,
                                      name: activeProcedure.title,
                                      category: '커스텀 리프팅'
                                    });
                                    console.log(`Added to cart: 커스텀 리프팅 - ${activeProcedure.title}`);
                                  }
                                }}
                                className={`px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl font-elegant-sans font-bold text-xs lg:text-sm transition-all duration-300 flex items-center justify-center space-x-1.5 lg:space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 w-full ${
                                  isInCart(activeProcedure.id)
                                    ? 'bg-gradient-to-r from-green-200 to-green-300 text-green-800 cursor-pointer hover:from-green-300 hover:to-green-400 border-2 border-green-400'
                                    : 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white hover:from-teal-smoke-500 hover:to-elegant-500 border-2 border-transparent'
                                }`}
                              >
                                {isInCart(activeProcedure.id) ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                    <span>상담 리스트에 담김</span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingCart className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                    <span>상담 신청하기</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Body Parts Section */}
          <div className="py-24 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-3xl">
            <div className="text-center mb-16" id="part-section-title">
              <h2 className="text-4xl lg:text-5xl font-display font-light text-teal-smoke-800 mb-4">
                PART
              </h2>
              <h3 className="text-3xl font-display font-light text-slate-600 mb-6">
                리프팅 시술 부위
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full mx-auto"></div>
            </div>

            {/* 모바일: 이미지를 상단에 sticky로 고정 */}
            <div className="lg:hidden mb-8 px-4" id="mobile-image-container">
              <div className="sticky top-20 z-10">
                <div className="relative aspect-square glass-effect-strong rounded-3xl shadow-xl overflow-hidden max-w-sm mx-auto">
                  {(() => {
                    const selectedPart = bodyParts.find(part => part.id === selectedBodyPart);
                    return selectedPart ? (
                      <>
                        <img 
                          src={selectedPart.image} 
                          alt={selectedPart.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-lg font-display font-medium">
                            {selectedPart.name}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-teal-smoke-100 to-elegant-100">
                        <span className="text-slate-600 font-elegant-sans">시술 부위를 선택해주세요</span>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* 데스크탑: 기존 그리드 레이아웃 */}
            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-8">
              <div className="order-2 lg:order-1">
                <div className="relative h-[500px] glass-effect-strong rounded-3xl shadow-xl overflow-hidden">
                  {(() => {
                    const selectedPart = bodyParts.find(part => part.id === selectedBodyPart);
                    return selectedPart ? (
                      <img 
                        src={selectedPart.image} 
                        alt={selectedPart.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-slate-600 font-elegant-sans">이미지를 선택해주세요</span>
                      </div>
                    );
                  })()}
                </div>
              </div>
              
              <div className="order-1 lg:order-2 space-y-4">
                {bodyParts.map((part) => (
                  <div
                    key={part.id}
                    onClick={() => setSelectedBodyPart(part.id)}
                    className={`group cursor-pointer rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                      selectedBodyPart === part.id 
                        ? 'bg-gradient-to-r from-teal-smoke-100 to-elegant-100 border-teal-smoke-400' 
                        : 'glass-effect hover:shadow-xl'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <span className={`text-2xl font-display font-light ${
                          selectedBodyPart === part.id ? 'text-slate-600' : 'text-slate-600'
                        }`}>
                          CASE {part.id}
                        </span>
                        <p className={`text-lg font-elegant font-medium transition-colors ${
                          selectedBodyPart === part.id 
                            ? 'text-teal-smoke-800' 
                            : 'text-slate-600 group-hover:text-teal-smoke-900'
                        }`}>
                          {part.name}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleToggleCart(part.id, part.name, e)}
                        className={`px-4 py-2 rounded-lg font-elegant-sans text-sm transition-all duration-300 flex items-center space-x-2 ${
                          isInCart(part.id)
                            ? 'bg-green-100 text-green-700 cursor-pointer hover:bg-green-200'
                            : 'bg-teal-smoke-300 text-white hover:bg-teal-smoke-400 hover:shadow-lg'
                        }`}
                      >
                        {isInCart(part.id) ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>담김</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>담기</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 모바일: 선택 옵션들 */}
            <div className="lg:hidden px-4 space-y-3 pb-8">
              {bodyParts.map((part) => (
                <div
                  key={part.id}
                  onClick={(e) => {
                    // 버튼 클릭인 경우 이벤트 처리하지 않음
                    if ((e.target as HTMLElement).closest('button')) {
                      return;
                    }
                    setSelectedBodyPart(part.id);
                    // 모바일에서 선택 시 이미지의 시작점으로 스크롤
                    setTimeout(() => {
                      const imageContainer = document.getElementById('mobile-image-container');
                      if (imageContainer) {
                        const imageTop = imageContainer.offsetTop - 20; // 이미지 시작점에서 20px 위
                        window.scrollTo({ top: imageTop, behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className={`group cursor-pointer rounded-xl p-4 shadow-md transition-all duration-300 border-2 ${
                    selectedBodyPart === part.id 
                      ? 'bg-gradient-to-r from-teal-smoke-100 to-elegant-100 border-teal-smoke-400' 
                      : 'bg-white border-gray-200 hover:border-teal-smoke-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <span className={`text-lg font-display font-light ${
                        selectedBodyPart === part.id ? 'text-teal-smoke-700' : 'text-slate-600'
                      }`}>
                        CASE {part.id}
                      </span>
                      <p className={`text-base font-elegant font-medium transition-colors ${
                        selectedBodyPart === part.id 
                          ? 'text-teal-smoke-800' 
                          : 'text-slate-700'
                      }`}>
                        {part.name}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleCart(part.id, part.name, e);
                      }}
                      onTouchStart={(e) => e.stopPropagation()}
                      className={`px-3 py-1.5 rounded-lg font-elegant-sans text-xs transition-all duration-300 flex items-center space-x-1 ${
                        isInCart(part.id)
                          ? 'bg-green-100 text-green-700 cursor-pointer hover:bg-green-200'
                          : 'bg-teal-smoke-300 text-white hover:bg-teal-smoke-400'
                      } relative z-10`}
                    >
                      {isInCart(part.id) ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>담김</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3 h-3" />
                          <span>담기</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* CASE 섹션 */}
          <div className="relative rounded-3xl p-12 text-white mt-16 overflow-hidden">
            <div className="absolute inset-0 bg-black/50"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/images/procedures/custom-lifting/case-bg.png)' }}
            ></div>
            <div className="relative text-center mb-12">
              <h3 className="text-3xl font-display font-light mb-4">CASE</h3>
              <h4 className="text-2xl font-elegant font-light mb-6">커스텀 리프팅이 필요한 경우</h4>
            </div>

            <div className="relative flex overflow-x-auto gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 pb-4">
              {[
                {
                  case: 'CASE 01',
                  title: '이중턱, 심부볼,\n늘어진볼살이고민인경우'
                },
                {
                  case: 'CASE 02', 
                  title: '갸름하고탄력있는\nV라인을원하는경우'
                },
                {
                  case: 'CASE 03',
                  title: '작고갸름한\n페이스라인을원하는경우'  
                },
                {
                  case: 'CASE 04',
                  title: '탄력을잃은피부로인해\n고민인경우'
                }
              ].map((item, index) => (
                <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex-shrink-0 w-60 md:w-auto">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>
                  <h5 className="font-elegant font-medium text-sm mb-2 text-white/70">{item.case}</h5>
                  <p className="font-elegant-sans font-light text-sm leading-relaxed whitespace-pre-line">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 상담 신청 섹션 */}
      <StandardConsultationSection
        title="커스텀 리프팅 상담 신청"
        description="전문 의료진과 함께 나에게 가장 적합한 커스텀 리프팅을 찾아보세요"
        initialProcedureId="custom-lifting"
      />
    </PageLayout>
  );
}