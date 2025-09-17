'use client';

import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
import { Shield, Star, ShoppingCart, Check, Sparkles, Heart, Users, Award } from 'lucide-react';
import { useCart } from '../../../contexts/CartContext';

// SILOS 실리프팅 프로그램 데이터
const silosLiftingPrograms = [
  {
    id: '01',
    name: '베이직 리프팅',
    threads: '8줄',
    description: '전체 페이스라인을 균형있게 개선하는 기본 프로그램으로 멍, 붓기 등 회복기간을 단축시킨 베이직 페이스 리프팅 솔루션입니다.',
    features: ['전체 페이스라인', '회복기간 단축', '기본 솔루션']
  },
  {
    id: '02', 
    name: '듀얼 리프팅',
    threads: '16줄',
    description: '리프팅된 피부를 견고하게 고정하여 지속력을 극대화하는 두 가지 프리미엄 실의 장점을 결합한 하이브리드 리프팅 패키지입니다.',
    features: ['프리미엄 실 2종', '지속력 극대화', '하이브리드 패키지']
  },
  {
    id: '03',
    name: '트리플 리프팅', 
    threads: '20줄',
    description: '즉각적인 효과의 한계를 뛰어넘는 리프팅! 기존 실리프팅 대비 향상된 고정력과 지속력을 제공하는 세 가지 프리미엄 실의 시너지로 완성되는 복합 리프팅 패키지입니다.',
    features: ['프리미엄 실 3종', '향상된 고정력', '복합 리프팅']
  },
  {
    id: '04',
    name: '쿼드 리프팅',
    threads: '24줄', 
    description: '단기 효과 중심 실리프팅의 아쉬움을 해결하기 위해 PCL 성분의 실을 병합해 유지력을 강화시킨 4중 결합 시술! 네 가지 프리미엄 실의 완벽한 조합으로 완성되는 고급 리프팅 패키지입니다.',
    features: ['PCL 성분 실', '4중 결합', '고급 패키지']
  },
  {
    id: '05',
    name: '프리미엄 펜타 리프팅',
    threads: '26줄',
    description: 'PDO 실의 중장기 유지력과 지방층 고정력 한계를 극복하는 실루엣소프트 기반 5중 복합 시술! 피부와 지방 동시 처짐에 특화된 맞춤 케어로, 시간이 흐를수록 더욱 개선되는 실루엣소프트 특유의 지연 효과를 경험할 수 있는 최상급 리프팅 패키지입니다.',
    features: ['실루엣소프트', '5중 복합', '최상급 패키지']
  }
];

// SILOS 특별함
const silosSpecialFeatures = [
  {
    icon: Users,
    title: '1:1 원장님 맞춤 상담',
    description: '개개인 상태를 고려한 맞춤 상담'
  },
  {
    icon: Award,
    title: '커스텀마이징 실리프팅',
    description: '개개인 상태를 고려한 맞춤 시술'
  },
  {
    icon: Heart,
    title: '실로케어',
    description: '부기 및 통증 케어 & 실리프팅 특화 애프터케어'
  },
  {
    icon: Star,
    title: '리프팅 밴드 지급',
    description: '자체 제작 리프팅 밴드 지급'
  }
];

// 공통 효과
const commonEffects = [
  '즉시효과',
  '고정력', 
  '유지력',
  '콜라겐생성',
  '지방이동 고정력'
];

// 시술 후 주의사항
const postCareInstructions = [
  {
    number: '01',
    title: '얼굴 압력 상승 및 충격 주의',
    description: '얼굴 마사지, 무거운 물건 들기, 고개 숙이기, 얼굴 부딪치기, 상처 당겨보기를 삼가주세요.'
  },
  {
    number: '02', 
    title: '찜질은 오직 냉찜질만',
    description: '수술 부위가 눌리지 않도록 수술 3일차까지 부기 예방 및 지혈을 위해 냉찜질을 해주세요. ※ 일시적 감각저하로 인한 화상위험 온찜질은 절대 금지!'
  },
  {
    number: '03',
    title: '음주·흡연·사우나 금지',
    description: '염증 유발 및 상처 회복을 지연시키기때문에 회복과 예후에 영향을 미칠 수 있는 음주 또는 흡연, 사우나를 삼가주세요.'
  },
  {
    number: '04',
    title: '딱딱하거나 자극적인 음식 주의',
    description: '부기를 유발하는 맵고, 짜고, 자극적인 식사와 딱딱하고 질긴 음식은 약 3-7일간 삼가주시고, 항생제 복용 기간엔 카페인 섭취를 가급적 자제해주세요.'
  }
];

// 실로케어 프로그램
const siloCarePrograms = [
  {
    number: '1',
    title: '시술 후 빠른 회복과 일상 생활 복귀를 위한 부기 및 통증 케어'
  },
  {
    number: '2', 
    title: '실리프팅 후 주변 세포 조직이 가장 활발히 움직이는 시기에 시너지 시술까지 실리프팅 특화 애프터케어 실로케어'
  },
  {
    number: '3',
    title: '3M 셀프케어키트 증정 (실로스 자체제작 리프팅밴드)'
  }
];

export default function SilosLiftingPage() {
  const { addToCart, removeFromCart, isInCart } = useCart();

  const handleToggleCart = (programId: string, programName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (isInCart(programId)) {
      removeFromCart(programId);
    } else {
      addToCart({
        id: programId,
        name: programName,
        category: 'SILOS 실리프팅'
      });
    }
  };

  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <div className="relative pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-elegant-400 via-teal-smoke-400 to-elegant-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-6 py-3 glass-effect rounded-full text-sm font-elegant-sans font-medium mb-8 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              SILOS THREAD LIFTING
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-light mb-6 tracking-wide leading-tight">
              실로프팅
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light max-w-4xl mx-auto leading-relaxed text-white/90">
              SILOS 실리프팅
            </p>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative -mt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* SILOS 특별함 섹션 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 mb-12">
            <div className="text-center mb-6">
              <h2 className="text-xl lg:text-2xl font-display font-light text-slate-800 mb-3">
                <Sparkles className="inline-block w-4 h-4 mr-2 text-elegant-400" />
                실로스 실리프팅이 특별한 이유
                <Sparkles className="inline-block w-4 h-4 ml-2 text-elegant-400" />
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {silosSpecialFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center p-3 bg-white rounded-lg shadow-sm border border-elegant-200/20">
                    <div className="w-10 h-10 bg-gradient-to-br from-elegant-400 to-teal-smoke-400 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm font-elegant font-medium text-slate-700 mb-1">{feature.title}</h3>
                    <p className="text-xs font-elegant-sans text-slate-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-gradient-to-br from-elegant-50 to-teal-smoke-50 rounded-lg p-4 border border-elegant-200/30">
              <p className="text-sm font-elegant-sans text-slate-700 leading-relaxed text-center">
                시술 부위, 피부 처짐, 지방량, 고객님 니즈 등을 고려해<br />
                다양한 실을 복합적으로 활용하여<br />
                보다 안정적이고, 만족스러운 실리프팅 시술을 진행해드립니다.
              </p>
            </div>
          </div>

          {/* 실로프팅 프로그램 섹션 */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl lg:text-3xl font-display font-light text-slate-800 mb-4">
                실로프팅 프로그램
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-elegant-400 to-teal-smoke-400 rounded-full mx-auto mb-4"></div>
              
              {/* 공통 효과 */}
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-white/50 inline-block">
                <p className="text-xs font-elegant-sans font-light text-slate-600 mb-2">모든 프로그램 공통 효과</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {commonEffects.map((effect, index) => (
                    <span key={index} className="inline-block px-2 py-1 bg-gradient-to-r from-elegant-100 to-teal-smoke-100 text-elegant-700 text-xs font-elegant-sans rounded-full border border-elegant-200/50">
                      {effect}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 프로그램 목록 */}
            <div className="space-y-3">
              {silosLiftingPrograms.map((program) => (
                <div key={program.id} className="bg-white rounded-xl shadow-sm border border-elegant-200/30 overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                      <div className="flex items-center mb-3 lg:mb-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-elegant-400 to-teal-smoke-400 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-white font-medium text-sm">{program.id}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-display font-light text-slate-800 mb-1">{program.name}</h3>
                          <p className="text-sm font-elegant-sans font-medium text-elegant-600">{program.threads}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleToggleCart(program.id, program.name, e)}
                        className={`px-3 py-1.5 rounded-lg font-elegant-sans text-xs font-medium transition-all duration-300 flex items-center space-x-1 ${
                          isInCart(program.id)
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-elegant-500 text-white hover:bg-elegant-600 hover:shadow-sm'
                        }`}
                      >
                        {isInCart(program.id) ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <ShoppingCart className="w-3 h-3" />
                        )}
                        <span>{isInCart(program.id) ? '선택됨' : '선택하기'}</span>
                      </button>
                    </div>
                    
                    <p className="text-sm font-elegant-sans text-slate-700 leading-relaxed mb-2">
                      {program.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {program.features.map((feature, i) => (
                        <span key={i} className="inline-block px-2 py-1 bg-elegant-100 text-elegant-700 text-xs font-elegant-sans rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 시술 부위 이미지 섹션 */}
          <div className="mb-16">
            <div className="text-center mb-6">
              <h2 className="text-2xl lg:text-3xl font-display font-light text-slate-800 mb-4">
                실리프팅 시술 부위
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-elegant-400 to-teal-smoke-400 rounded-full mx-auto"></div>
            </div>
            
            {/* 메인 시술 부위 이미지 */}
            <div className="mb-4">
              <img 
                src="/images/procedures/silos-lifting/silos-lifting-area.png.jpg"
                alt="SILOS 실리프팅 시술 부위"
                className="w-full h-auto object-cover rounded-2xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = 'block';
                  }
                }}
              />
              <div className="hidden bg-gradient-to-br from-elegant-100 to-teal-smoke-100 rounded-2xl p-8 text-center border border-elegant-200">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-elegant-400" />
                <h3 className="text-xl font-elegant font-medium text-slate-800 mb-2">실리프팅 시술 부위</h3>
                <p className="text-base font-elegant-sans text-slate-600">시술 부위 이미지를 준비 중입니다.</p>
              </div>
            </div>
            
            {/* 하단 2개 이미지 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <img 
                  src="/images/procedures/silos-lifting/curve-tech.png"
                  alt="Curve Technology"
                  className="w-full h-auto object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden bg-gradient-to-br from-elegant-100 to-teal-smoke-100 rounded-xl p-8 items-center justify-center">
                  <div className="text-center">
                    <Star className="w-16 h-16 mx-auto mb-4 text-elegant-400" />
                    <h3 className="text-xl font-elegant font-bold text-gray-800">Curve Technology</h3>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <img 
                  src="/images/procedures/silos-lifting/no-knife.png"
                  alt="No Knife Technology"
                  className="w-full h-auto object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden bg-gradient-to-br from-elegant-100 to-teal-smoke-100 rounded-xl p-8 items-center justify-center">
                  <div className="text-center">
                    <Shield className="w-16 h-16 mx-auto mb-4 text-elegant-400" />
                    <h3 className="text-xl font-elegant font-bold text-gray-800">No Knife Technology</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 실로케어 프로그램 */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-display font-light text-slate-800 mb-4">
                실리프팅만 하면 끝? NO!
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-elegant-400 to-teal-smoke-400 rounded-full mx-auto mb-4"></div>
            </div>
            
            <div className="space-y-3">
              {siloCarePrograms.map((program, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-elegant-50 rounded-lg shadow-sm border border-elegant-200/30 p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-elegant-400 to-teal-smoke-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-medium text-sm">{program.number}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-elegant-sans text-slate-700 leading-relaxed">
                        {program.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 시술 후 주의사항 */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-display font-light text-slate-800 mb-4">
                시술 후 주의사항
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-elegant-400 to-teal-smoke-400 rounded-full mx-auto"></div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-elegant-200/30 p-4">
              <div className="space-y-4">
                {postCareInstructions.map((instruction, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-elegant-400 to-teal-smoke-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-medium text-xs">{instruction.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-elegant font-medium text-slate-800 mb-1">{instruction.title}</h3>
                      <p className="text-xs font-elegant-sans text-slate-600 leading-relaxed">{instruction.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 표준화된 상담 섹션 */}
      <StandardConsultationSection
        title="SILOS 실리프팅 상담 신청"
        description="전문 의료진과 함께 나에게 가장 적합한 실리프팅 프로그램을 찾아보세요"
        initialProcedureId="silos-lifting"
      />
    </PageLayout>
  );
}