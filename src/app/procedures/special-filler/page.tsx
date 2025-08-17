'use client';

import { useState } from 'react';
import PageLayout from '../../../components/PageLayout';
import { Sparkles, Clock, Shield, Star, ShoppingCart, Check, Syringe } from 'lucide-react';

// 특수 부위 필러 데이터
const fillerAreas = [
  { 
    id: '01', 
    name: '요정귀 필러', 
    image: '/images/procedures/special-filler/filler-elf-ear.png',
    description: '귀끝을 뾰족하게 만들어 요정 같은 매력적인 귀 모양 연출',
    duration: '15분내외',
    features: ['비절개', '즉시효과', '자연스러운모양']
  },
  { 
    id: '02', 
    name: '돌출입 교정', 
    image: '/images/procedures/special-filler/filler-protruding-mouth.png',
    description: '돌출된 입을 자연스럽게 교정하여 균형잡힌 얼굴 라인 완성',
    duration: '20분내외',
    features: ['비수술', '즉시교정', '자연스러운라인']
  },
  { 
    id: '03', 
    name: '이마 필러', 
    image: '/images/procedures/special-filler/filler-forehead.png',
    description: '꺼진 이마를 볼륨있게 채워 부드럽고 입체적인 이마라인 연출',
    duration: '20분내외',
    features: ['볼륨업', '입체감', '자연스러운곡선']
  },
  { 
    id: '04', 
    name: '관자 필러', 
    image: '/images/procedures/special-filler/filler-temple.png',
    description: '꺼진 관자놀이를 채워 젊고 부드러운 얼굴 윤곽 완성',
    duration: '15분내외',
    features: ['볼륨보완', '윤곽개선', '젊은인상']
  },
  { 
    id: '05', 
    name: '턱라인 필러', 
    image: '/images/procedures/special-filler/filler-jawline.png',
    description: '턱라인을 선명하게 정의하여 갸름하고 세련된 얼굴형 연출',
    duration: '25분내외',
    features: ['윤곽정리', 'V라인', '선명한라인']
  },
  { 
    id: '06', 
    name: '입술 필러', 
    image: '/images/procedures/special-filler/filler-lip.png',
    description: '자연스럽고 매력적인 입술 볼륨과 라인으로 완벽한 입술 연출',
    duration: '20분내외',
    features: ['자연스러운볼륨', '매력적인라인', '오래가는효과']
  },
  { 
    id: '07', 
    name: '손등 주름 필러', 
    image: '/images/procedures/special-filler/filler-hand.png',
    description: '손등의 주름과 혈관을 개선하여 젊고 매끄러운 손 완성',
    duration: '30분내외',
    features: ['주름개선', '혈관완화', '젊은손']
  }
];

const fillerBenefits = [
  {
    number: '01',
    title: '즉시 효과',
    description: '시술 직후부터 바로 확인할 수 있는 만족스러운 결과'
  },
  {
    number: '02',
    title: '자연스러운 결과',
    description: '개인의 얼굴 특징을 살린 자연스럽고 조화로운 개선'
  },
  {
    number: '03',
    title: '안전한 시술',
    description: 'FDA 승인 정품 필러만 사용하여 안전하고 확실한 시술'
  },
  {
    number: '04',
    title: '빠른 회복',
    description: '일상생활에 지장 없는 간편하고 빠른 시술과 회복'
  }
];

const fillerProcess = [
  {
    step: '01',
    title: '상담 및 디자인',
    description: '개인의 얼굴 특징 분석 후 최적의 디자인 설계'
  },
  {
    step: '02',
    title: '마취 및 시술',
    description: '마취크림 도포 후 정밀하고 섬세한 필러 주입'
  },
  {
    step: '03',
    title: '마무리 및 확인',
    description: '시술 부위 정리 후 결과 확인 및 관리법 안내'
  }
];

export default function SpecialFillerPage() {
  const [addedToCart, setAddedToCart] = useState<string[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('01');

  const handleAddToCart = (partId: string, partName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!addedToCart.includes(partId)) {
      setAddedToCart([...addedToCart, partId]);
      console.log(`Added to cart: 특수 부위 필러 - ${partName}`);
    }
  };

  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <div className="relative pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-400 via-elegant-400 to-teal-smoke-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-elegant-sans font-medium mb-8 border border-white/30">
              <Syringe className="w-4 h-4 mr-2" />
              SPECIAL AREA FILLER
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-light mb-6 tracking-wide leading-tight">
              특수 부위 필러
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light max-w-4xl mx-auto leading-relaxed text-white/90">
              얼굴의 특별한 부위까지 세심하게<br />
              개인의 매력을 극대화하는<br />
              <span className="font-medium">맞춤형 필러 시술</span>
            </p>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative -mt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 시술 정보 카드 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-teal-smoke-50 to-white rounded-2xl">
                <Clock className="w-10 h-10 text-teal-smoke-500 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-teal-smoke-700 mb-1">시술시간</h3>
                  <p className="text-teal-smoke-800 font-elegant-sans font-medium">15-30분내외</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-elegant-50 to-white rounded-2xl">
                <Shield className="w-10 h-10 text-elegant-500 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-teal-smoke-700 mb-1">마취방법</h3>
                  <p className="text-teal-smoke-800 font-elegant-sans font-medium">마취크림</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-teal-smoke-50 to-white rounded-2xl">
                <Star className="w-10 h-10 text-teal-smoke-500 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-teal-smoke-700 mb-1">회복기간</h3>
                  <p className="text-teal-smoke-800 font-elegant-sans font-medium">일상생활 바로가능</p>
                </div>
              </div>
            </div>
          </div>

          {/* 특수 부위 필러란? */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-light text-teal-smoke-800 mb-8">
                특수 부위 필러란?
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-12"></div>
              <p className="text-xl font-elegant-sans font-light text-teal-smoke-700 leading-relaxed max-w-5xl mx-auto">
                일반적인 필러 시술을 넘어서<br />
                얼굴의 특별한 부위까지 세심하게 관리하여<br />
                <span className="font-medium text-elegant-600">개인의 독특한 매력을 극대화하는 맞춤형 필러 시술</span>입니다.
              </p>
            </div>

            {/* 4가지 장점 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {fillerBenefits.map((benefit, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-teal-smoke-200/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-smoke-400 to-elegant-400 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{benefit.number}</span>
                  </div>
                  <h4 className="text-lg font-elegant font-bold text-teal-smoke-800 mb-3 leading-tight">{benefit.title}</h4>
                  <p className="text-sm font-elegant-sans font-light text-teal-smoke-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 시술 과정 */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-display font-light text-teal-smoke-800 mb-6">
                시술 <span className="text-elegant-600">과정</span>
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {fillerProcess.map((step, index) => (
                <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg border border-teal-smoke-200/30">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">{step.step}</span>
                  </div>
                  <h4 className="font-elegant font-bold text-teal-smoke-800 mb-4 text-lg">
                    {step.title}
                  </h4>
                  <p className="text-sm font-elegant-sans text-teal-smoke-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* PART 시술 부위 섹션 */}
          <div className="py-24 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-3xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-light text-teal-smoke-800 mb-4">
                PART
              </h2>
              <h3 className="text-3xl font-display font-light text-teal-smoke-700 mb-6">
                특수 부위 필러 시술 부위
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 px-8">
              {/* 이미지 영역 */}
              <div className="xl:col-span-3">
                <div className="relative h-[500px] bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-teal-smoke-200/50 overflow-hidden sticky top-8">
                  {(() => {
                    const selectedPart = fillerAreas.find(part => part.id === selectedBodyPart);
                    return selectedPart ? (
                      <img 
                        src={selectedPart.image} 
                        alt={selectedPart.name}
                        className="w-full h-full object-cover object-center"
                        style={{ 
                          objectFit: 'cover',
                          objectPosition: 'center center'
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-teal-smoke-400 font-elegant-sans">이미지를 선택해주세요</span>
                      </div>
                    );
                  })()}
                </div>
              </div>
              
              {/* CASE 목록 - 1열 그리드 */}
              <div className="xl:col-span-2">
                <div className="grid grid-cols-1 gap-3">
                  {fillerAreas.map((part) => (
                    <div
                      key={part.id}
                      onClick={() => setSelectedBodyPart(part.id)}
                      className={`group cursor-pointer rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300 border ${
                        selectedBodyPart === part.id 
                          ? 'bg-gradient-to-r from-teal-smoke-100 to-elegant-100 border-teal-smoke-400' 
                          : 'bg-white/60 backdrop-blur-sm border-teal-smoke-200/50 hover:border-teal-smoke-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <span className={`text-sm font-display font-light ${
                            selectedBodyPart === part.id ? 'text-teal-smoke-600' : 'text-teal-smoke-500'
                          }`}>
                            {part.id}
                          </span>
                          <div className="flex-1">
                            <p className={`text-sm font-elegant font-medium transition-colors ${
                              selectedBodyPart === part.id 
                                ? 'text-teal-smoke-800' 
                                : 'text-teal-smoke-700 group-hover:text-teal-smoke-900'
                            }`}>
                              {part.name}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {part.features.slice(0, 2).map((feature, i) => (
                                <span key={i} className="inline-block px-2 py-0.5 bg-teal-smoke-200/50 text-teal-smoke-700 text-xs font-elegant-sans rounded-full">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={(e) => handleAddToCart(part.id, part.name, e)}
                          className={`px-2 py-1 rounded-md font-elegant-sans text-xs transition-all duration-300 flex items-center space-x-1 ${
                            addedToCart.includes(part.id)
                              ? 'bg-green-100 text-green-700 cursor-default'
                              : 'bg-teal-smoke-300 text-white hover:bg-teal-smoke-400 hover:shadow-lg'
                          }`}
                          disabled={addedToCart.includes(part.id)}
                        >
                          {addedToCart.includes(part.id) ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <ShoppingCart className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 전체 상담 신청 섹션 */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-white/80 to-teal-smoke-50/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50">
              <h3 className="text-3xl lg:text-4xl font-display font-bold text-teal-smoke-800 mb-6">
                특수 부위 필러 상담 신청
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-8"></div>
              <p className="text-xl font-elegant-sans font-medium text-teal-smoke-700 mb-10">
                전문 의료진과 함께 나에게 가장 적합한 필러 시술을 찾아보세요
              </p>
              <a
                href="/consultation/request"
                className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white rounded-xl font-elegant-sans font-bold text-lg hover:from-teal-smoke-600 hover:to-elegant-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 space-x-3"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>전체 상담 신청하기</span>
              </a>
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
                특수 부위 필러에 대해 더 자세한 상담을 원하시나요?<br />
                전문 의료진이 맞춤형 상담을 도해드립니다.
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
                  <option value="요정귀 필러" className="text-teal-smoke-700">요정귀 필러</option>
                  <option value="돌출입 교정" className="text-teal-smoke-700">돌출입 교정</option>
                  <option value="이마 필러" className="text-teal-smoke-700">이마 필러</option>
                  <option value="관자 필러" className="text-teal-smoke-700">관자 필러</option>
                  <option value="턱라인 필러" className="text-teal-smoke-700">턱라인 필러</option>
                  <option value="입술 필러" className="text-teal-smoke-700">입술 필러</option>
                  <option value="손등 주름 필러" className="text-teal-smoke-700">손등 주름 필러</option>
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