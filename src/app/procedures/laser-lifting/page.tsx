'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageLayout from '../../../components/PageLayout';
import { Zap, Clock, Shield, Star, ChevronDown, ChevronUp, ShoppingCart, Check } from 'lucide-react';

const laserProcedures = [
  {
    id: 'ulthera',
    title: '울쎄라 리프팅',
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
    id: 'shrink',
    title: '슈링크 리프팅',
    subtitle: 'SHURINK',
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
    id: 'onda',
    title: '온다 리프팅',
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
    id: 'encore',
    title: '엔코어 리프팅',
    subtitle: 'N CORE',
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
    id: 'density',
    title: '덴서티 리프팅',
    subtitle: 'DENSIRY',
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
    id: 'vero',
    title: '브이로 리프팅',
    subtitle: 'V-RO',
    description: [
      '7가지 카트리지로 진피층, SMAS층 등 다양한 피부층에',
      '미세한 열응고 구역을 다수 생성시킨 후',
      '열에너지를 이용하여 재생 및 회복 작용을 이용하는',
      '집속초음파(HIFU) + 고주파(RF) 리프팅 장비'
    ],
    features: ['7카트리지', 'HIFU+RF', '열에너지'],
    duration: '35분내외'
  }
];

export default function LaserLiftingPage() {
  const searchParams = useSearchParams();
  const [expandedProcedure, setExpandedProcedure] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState<string[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('01');

  // Handle URL parameter for auto-expanding and scrolling
  useEffect(() => {
    const procedureParam = searchParams.get('procedure');
    if (procedureParam) {
      setExpandedProcedure(procedureParam);
      // Scroll to the specific procedure after a short delay
      setTimeout(() => {
        const element = document.getElementById(procedureParam);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [searchParams]);

  const toggleProcedure = (procedureId: string) => {
    setExpandedProcedure(expandedProcedure === procedureId ? null : procedureId);
  };

  const handleAddToCart = (partId: string, partName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!addedToCart.includes(partId)) {
      setAddedToCart([...addedToCart, partId]);
      console.log(`Added to cart: 레이저 리프팅 - ${partName}`);
    }
  };

  const bodyParts = [
    { id: '01', name: '이마주름', image: '/images/procedures/laser-lifting/areas/forehead.png' },
    { id: '02', name: '눈가라인', image: '/images/procedures/laser-lifting/areas/eye-area.png' },
    { id: '03', name: '심부볼', image: '/images/procedures/laser-lifting/areas/deep-cheek.png' },
    { id: '04', name: '팔자주름', image: '/images/procedures/laser-lifting/areas/nasolabial.png' },
    { id: '05', name: '이중턱/목주름', image: '/images/procedures/laser-lifting/areas/neck-double-chin.png' }
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
              레이저 리프팅
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
                <span className="text-3xl lg:text-4xl text-elegant-600">레이저 리프팅</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full mx-auto mb-8"></div>
            </div>
            
            <div className="max-w-4xl mx-auto text-center mb-12">
              <p className="text-lg font-elegant-sans font-light text-teal-smoke-700 leading-relaxed mb-8">
                같은 레이저라도 시술은 엄밀하게 다르게 진행되어야 합니다.<br />
                실로스에서는 개개인의 피부를 분석하여 효과적으로 작용할 수 있는<br />
                장비를 통한 최상의 결과를 만들어 냅니다.
              </p>
            </div>

            {/* 주요 특징 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              {[
                { title: '시술시간', value: '15분내외', icon: Clock },
                { title: '마취방법', value: '연고마취', icon: Shield },
                { title: '회복기간', value: '일상생활바로가능', icon: Star },
                { title: '유지기간', value: '3~6개월', icon: Zap }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-smoke-300 to-elegant-300 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-elegant font-medium text-teal-smoke-800 mb-2">{item.title}</h4>
                    <p className="text-teal-smoke-600 font-elegant-sans font-light text-sm">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* EQUIPMENT 섹션 - 아코디언 스타일 */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-display font-light text-teal-smoke-800 mb-4">
                EQUIPMENT
              </h3>
              <h4 className="text-2xl font-elegant font-light text-elegant-600 mb-6">
                레이저 리프팅 장비
              </h4>
              <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto"></div>
            </div>

            {/* 아코디언 프로시저 리스트 */}
            <div className="space-y-4">
              {laserProcedures.map((procedure, index) => {
                const isExpanded = expandedProcedure === procedure.id;
                return (
                  <div
                    key={procedure.id}
                    id={procedure.id}
                    className="bg-white rounded-3xl shadow-lg border border-teal-smoke-200/30 overflow-hidden"
                  >
                    {/* 헤더 - 클릭 가능 */}
                    <button
                      onClick={() => toggleProcedure(procedure.id)}
                      className="w-full bg-gradient-to-r from-teal-smoke-400 to-teal-smoke-500 py-8 px-8 hover:from-teal-smoke-500 hover:to-teal-smoke-600 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-display font-light text-white tracking-wide">
                          {procedure.title}
                        </h3>
                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6 text-white transition-transform" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-white transition-transform" />
                        )}
                      </div>
                    </button>

                    {/* 확장 가능한 콘텐츠 */}
                    {isExpanded && (
                      <div className="p-8 bg-white">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                          {/* 왼쪽: 설명 */}
                          <div>
                            <h4 className="text-3xl font-display font-light text-teal-smoke-800 mb-6 tracking-wide">
                              {procedure.subtitle}
                            </h4>
                            <div className="space-y-3 mb-8">
                              {procedure.description.map((desc, i) => (
                                <p key={i} className="text-teal-smoke-700 font-elegant-sans font-light leading-relaxed">
                                  {desc}
                                </p>
                              ))}
                            </div>

                            {/* 특징 배지들 */}
                            <div className="flex flex-wrap gap-3 mb-6">
                              {procedure.features.map((feature, i) => (
                                <div key={i} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-elegant-sans font-medium bg-teal-smoke-100 text-teal-smoke-700 border border-teal-smoke-200">
                                  <Zap className="w-3 h-3 mr-2" />
                                  {feature}
                                </div>
                              ))}
                            </div>

                            {/* 시술시간 */}
                            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-elegant-sans font-medium bg-elegant-100 text-elegant-700 border border-elegant-200">
                              <Clock className="w-4 h-4 mr-2" />
                              {procedure.duration}
                            </div>
                          </div>

                          {/* 오른쪽: 장비 이미지 */}
                          <div className="flex justify-center">
                            <div className="w-80 h-60 bg-white rounded-2xl border-2 border-teal-smoke-200/30 p-4 shadow-lg">
                              <img 
                                src={`/images/procedures/silos-lifting/equipment/lifting_${procedure.id === 'ulthera' ? 'ulthera' : 
                                      procedure.id === 'shrink' ? 'shurink' : 
                                      procedure.id === 'onda' ? 'onda' : 
                                      procedure.id === 'encore' ? 'ncore' : 
                                      procedure.id === 'density' ? 'density' : 
                                      'vro'}.png`}
                                alt={`${procedure.title} 장비`}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Body Parts Section */}
          <div className="py-24 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-3xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-light text-teal-smoke-800 mb-4">
                PART
              </h2>
              <h3 className="text-3xl font-display font-light text-teal-smoke-700 mb-6">
                리프팅 시술 부위
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-8">
              <div className="order-2 lg:order-1">
                <div className="relative h-[500px] bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-teal-smoke-200/50 overflow-hidden">
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
                        <span className="text-teal-smoke-400 font-elegant-sans">이미지를 선택해주세요</span>
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
                        : 'bg-white/60 backdrop-blur-sm border-teal-smoke-200/50 hover:border-teal-smoke-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <span className={`text-2xl font-display font-light ${
                          selectedBodyPart === part.id ? 'text-teal-smoke-600' : 'text-teal-smoke-500'
                        }`}>
                          CASE {part.id}
                        </span>
                        <p className={`text-lg font-elegant font-medium transition-colors ${
                          selectedBodyPart === part.id 
                            ? 'text-teal-smoke-800' 
                            : 'text-teal-smoke-700 group-hover:text-teal-smoke-900'
                        }`}>
                          {part.name}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(part.id, part.name, e)}
                        className={`px-4 py-2 rounded-lg font-elegant-sans text-sm transition-all duration-300 flex items-center space-x-2 ${
                          addedToCart.includes(part.id)
                            ? 'bg-green-100 text-green-700 cursor-default'
                            : 'bg-teal-smoke-300 text-white hover:bg-teal-smoke-400 hover:shadow-lg'
                        }`}
                        disabled={addedToCart.includes(part.id)}
                      >
                        {addedToCart.includes(part.id) ? (
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
          </div>
          
          {/* CASE 섹션 */}
          <div className="relative rounded-3xl p-12 text-white mt-16 overflow-hidden">
            <div className="absolute inset-0 bg-black/50"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/images/procedures/laser-lifting/case-bg.png)' }}
            ></div>
            <div className="relative text-center mb-12">
              <h3 className="text-3xl font-display font-light mb-4">CASE</h3>
              <h4 className="text-2xl font-elegant font-light mb-6">레이저 리프팅이 필요한 경우</h4>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>
                  <h5 className="font-elegant font-medium text-sm mb-2 text-gray-300">{item.case}</h5>
                  <p className="font-elegant-sans font-light text-sm leading-relaxed whitespace-pre-line">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Online Consultation Section - Full Width */}
      <section className="w-full bg-gradient-to-br from-teal-smoke-400 via-elegant-400 to-teal-smoke-500">
        <div className="w-full py-24 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-display font-light mb-6">
                온라인 상담 신청
              </h2>
              <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
              <p className="text-lg font-elegant-sans font-light text-white/90 max-w-2xl mx-auto">
                레이저 리프팅에 대해 더 자세한 상담을 원하시나요?<br />
                전문 의료진이 맞춤형 상담을 도와드립니다.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="성함"
                  className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 font-elegant-sans focus:outline-none focus:border-white/50 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="연락처"
                  className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 font-elegant-sans focus:outline-none focus:border-white/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder="이메일 (선택)"
                  className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 font-elegant-sans focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>
              
              <div className="space-y-4">
                <select className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-elegant-sans focus:outline-none focus:border-white/50 transition-colors appearance-none cursor-pointer">
                  <option value="" className="text-teal-smoke-700">상담 부위 선택</option>
                  <option value="이마주름" className="text-teal-smoke-700">이마주름</option>
                  <option value="눈가라인" className="text-teal-smoke-700">눈가라인</option>
                  <option value="심부볼" className="text-teal-smoke-700">심부볼</option>
                  <option value="팔자주름" className="text-teal-smoke-700">팔자주름</option>
                  <option value="이중턱/목주름" className="text-teal-smoke-700">이중턱/목주름</option>
                  <option value="기타" className="text-teal-smoke-700">기타</option>
                </select>
                <textarea
                  placeholder="상담 내용을 입력해주세요"
                  rows={5}
                  className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 font-elegant-sans focus:outline-none focus:border-white/50 transition-colors resize-none"
                />
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button className="px-12 py-4 bg-white text-teal-smoke-700 rounded-xl font-elegant-sans font-medium text-lg hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                상담 신청하기
              </button>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20 text-center">
              <p className="text-sm font-elegant-sans font-light text-white/80">
                상담 가능 시간: 평일 10:00 - 19:00 | 토요일 10:00 - 17:00<br />
                개인정보는 상담 목적으로만 사용되며 안전하게 보호됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}