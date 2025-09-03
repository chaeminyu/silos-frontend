'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
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
    features: ['FDA승인', 'SMAS층도달', '실시간영상'],
    duration: '30-60분'
  },
  {
    id: 'density',
    title: '덴서티 리프팅',
    subtitle: 'DENSITY',
    description: [
      '실제 HIFU 기술을 바탕으로 개발된 리프팅 장비',
      '7mm/4.5mm/3mm 3가지 카트리지로 다층 시술',
      '피부 진피층부터 SMAS층까지 단계별 에너지 전달',
      '콜라겐 재생과 피부 탄력 개선을 동시에',
      '짧은 시술시간으로 일상 복귀가 빠름'
    ],
    features: ['3카트리지', '다층시술', '빠른회복'],
    duration: '20-40분'
  },
  {
    id: 'oltight',
    title: '올타이트 리프팅',
    subtitle: 'OLTIGHT',
    description: [
      '마이크로 니들 RF 리프팅의 새로운 기준',
      '정밀한 깊이 조절로 개인 맞춤형 시술',
      '열 손상을 최소화하면서 최대 효과',
      '모공 축소와 리프팅을 동시에',
      '다양한 피부 타입에 안전하게 적용'
    ],
    features: ['니들RF', '맞춤깊이', '모공축소'],
    duration: '30-45분'
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

function LaserLiftingPage() {
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
            <h1 className="text-4xl md:text-6xl font-display font-light mb-6 tracking-wide">
              레이저 리프팅
            </h1>
            <p className="text-xl md:text-2xl font-elegant-sans font-light mb-8 text-white/90 leading-relaxed">
              최첨단 레이저 기술로 젊음을 되찾아보세요
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-base font-elegant-sans">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-white/80" />
                <span>FDA 승인</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-white/80" />
                <span>빠른 시술</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-white/80" />
                <span>자연스러운 결과</span>
              </div>
            </div>
          </div>
          
          {/* 특징 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { title: '시술시간', value: '30-60분', icon: Clock },
              { title: '마취방법', value: '표면마취', icon: Shield },
              { title: '유지기간', value: '3-6개월', icon: Zap }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-smoke-300 to-elegant-300 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-elegant font-medium text-white mb-2">{item.title}</h3>
                  <p className="text-white/80 font-elegant-sans">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 레이저 시술 종류 섹션 */}
      <div className="py-24 bg-gradient-to-br from-white via-teal-smoke-50 to-elegant-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-light text-slate-800 mb-6 tracking-wide">
              레이저 리프팅 종류
            </h2>
            <div className="w-24 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-8"></div>
            <p className="text-lg md:text-xl font-elegant-sans font-light text-slate-700 max-w-3xl mx-auto leading-relaxed">
              개인의 피부 상태와 원하는 결과에 맞는 최적의 레이저 리프팅을 선택하세요
            </p>
          </div>

          <div className="space-y-4">
            {laserProcedures.map((procedure) => {
              const isExpanded = expandedProcedure === procedure.id;
              return (
                <div
                  key={procedure.id}
                  id={procedure.id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-smoke-200/30 overflow-hidden"
                >
                  <div
                    onClick={() => toggleProcedure(procedure.id)}
                    className="p-8 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-smoke-200 to-elegant-200 rounded-2xl flex items-center justify-center shadow-lg">
                          <Zap className="w-8 h-8 text-slate-700" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-elegant font-light text-slate-800 mb-1">
                            {procedure.title}
                          </h3>
                          <p className="text-teal-smoke-600 font-elegant-sans font-medium">
                            {procedure.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-slate-500 font-elegant-sans">
                          {procedure.duration}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-8 pt-8 border-t border-teal-smoke-200/30">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          <div className="lg:col-span-2">
                            <div className="space-y-4 mb-8">
                              {procedure.description.map((desc, i) => (
                                <div key={i} className="flex items-start space-x-3">
                                  <div className="w-2 h-2 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mt-3 flex-shrink-0"></div>
                                  <p className="text-slate-700 font-elegant-sans leading-relaxed">
                                    {desc}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-3">
                              {procedure.features.map((feature, i) => (
                                <div key={i} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-elegant-sans font-medium bg-gradient-to-r from-teal-smoke-100 to-elegant-100 text-teal-smoke-800 border border-teal-smoke-200">
                                  <Zap className="w-3 h-3 mr-2" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-center">
                            <div className="bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-2xl p-8 w-full h-48 flex items-center justify-center shadow-inner">
                              <div className="text-center">
                                <Zap className="w-16 h-16 text-teal-smoke-500 mx-auto mb-3" />
                                <p className="text-slate-600 font-elegant-sans font-medium">
                                  {procedure.title}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 시술 부위 선택 섹션 */}
      <div className="py-24 bg-gradient-to-br from-elegant-50 via-white to-teal-smoke-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-light text-slate-800 mb-6 tracking-wide">
              시술 가능 부위
            </h2>
            <div className="w-24 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-8"></div>
            <p className="text-lg md:text-xl font-elegant-sans font-light text-slate-700 max-w-3xl mx-auto leading-relaxed">
              관심 있는 부위를 선택하여 상담받아보세요
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {bodyParts.map((part) => (
              <div
                key={part.id}
                onClick={() => setSelectedBodyPart(part.id)}
                className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 group ${
                  selectedBodyPart === part.id
                    ? 'bg-gradient-to-br from-teal-smoke-100 to-elegant-100 shadow-lg'
                    : 'bg-white hover:bg-gradient-to-br hover:from-teal-smoke-50 hover:to-elegant-50 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-smoke-200 to-elegant-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                    <span className="text-teal-smoke-600 font-bold text-lg">{part.id}</span>
                  </div>
                  <h3 className="text-sm font-elegant-sans font-medium text-slate-800 mb-2">
                    {part.name}
                  </h3>
                  <button
                    onClick={(e) => handleAddToCart(part.id, part.name, e)}
                    className={`mt-2 px-4 py-2 rounded-lg text-xs font-elegant-sans font-medium transition-all duration-300 flex items-center justify-center space-x-2 w-full ${
                      addedToCart.includes(part.id)
                        ? 'bg-green-100 text-green-800 cursor-default'
                        : 'bg-teal-smoke-500 text-white hover:bg-teal-smoke-600'
                    }`}
                    disabled={addedToCart.includes(part.id)}
                  >
                    {addedToCart.includes(part.id) ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>담김</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3 h-3" />
                        <span>상담신청</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 상담 신청 섹션 */}
      <StandardConsultationSection
        title="레이저 리프팅 상담 신청"
        description="전문 의료진과 함께 나에게 가장 적합한 레이저 리프팅을 찾아보세요"
        initialProcedureId="laser-lifting"
      />
    </PageLayout>
  );
}

export default LaserLiftingPage;