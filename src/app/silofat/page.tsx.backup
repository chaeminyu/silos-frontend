'use client';

import { useState } from 'react';
import { ChevronDown, Clock, Syringe, Calendar, ShoppingCart, Check } from 'lucide-react';
import PageLayout from '../../components/PageLayout';

export default function SiloFatPage() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState<string[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('01'); // 기본값: 부유방

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleAddToCart = (partId: string, partName: string, event: React.MouseEvent) => {
    event.stopPropagation(); // 부모 클릭 이벤트 방지
    // Simulate adding to cart
    if (!addedToCart.includes(partId)) {
      setAddedToCart([...addedToCart, partId]);
      // In real app, this would update global cart state
      console.log(`Added to cart: 실로팻 - ${partName}`);
    }
  };

  const dropdownItems = [
    {
      id: 'what',
      title: '실로팻이 뭔가요?',
      label: 'WHAT',
      content: `더 직접적인 방법으로 지방세포자체를
추출하여 제거하는 방식입니다.
지방추출주사는 특히 큰 지방 덩어리나 특정 부위의
명확한 체형 조정이 필요한 경우 더 효과적일 수 있습니다.`,
      image: '/images/procedures/silofat/what-is-silofat.jpg'
    },
    {
      id: 'difference',
      title: '뭐가 다른가요?',
      label: 'DIFFERENCE',
      content: `기존 지방 세포 크기만 줄여주고 약물 주사 후 체내 순환을 통해
체외로 배출되며 여러 차례 시술을 받아야 했던 지방분해주사와 달리
지방추출주사는 약물 주사 후 주사기를 통해 직접 지방을 추출해
직접적으로 지방의 세포의 개수를 줄여줘 영구적 효과가 있습니다.`,
      image: '/images/procedures/silofat/procedure-process.jpg'
    },
    {
      id: 'advantages',
      title: '어떤 장점이 있나요?',
      label: 'ADVANTAGE',
      content: `• 여의사 시술 가능
• 피부 절개 없는 간편한 시술
• 짧은 시술 시간
• 일상 생활 바로 가능
• 뽑아낸 지방을 눈으로 바로 확인
• 압박복 미착용`,
      image: '/images/procedures/silofat/advantages.jpg'
    }
  ];

  const bodyParts = [
    { id: '01', name: '부유방', image: '/images/procedures/silofat/areas/accessory-breast.jpg' },
    { id: '02', name: '팔 라인', image: '/images/procedures/silofat/areas/arm-line.jpg' },
    { id: '03', name: '복부', image: '/images/procedures/silofat/areas/abdomen.jpg' },
    { id: '04', name: '러브핸들', image: '/images/procedures/silofat/areas/love-handles.jpg' },
    { id: '05', name: '종아리/허벅지', image: '/images/procedures/silofat/areas/legs.jpg' }
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="relative pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-400 via-elegant-400 to-teal-smoke-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-elegant-sans font-medium mb-4 border border-white/30">
                <Syringe className="w-4 h-4 mr-2" />
                Fat Extraction Injection
              </div>
              <div>
                <h1 className="text-5xl lg:text-6xl font-display font-light mb-4 tracking-wide">
                  SILO-FAT
                </h1>
                <h2 className="text-3xl lg:text-4xl font-display font-light mb-6 text-white/90">
                  실로팻
                </h2>
                <div className="w-24 h-0.5 bg-white/60 rounded-full mb-6"></div>
                <p className="text-lg font-elegant-sans font-light leading-relaxed text-white/90">
                  실로스만의 노하우로<br />
                  개인의 체형에 맞는 맞춤 라인으로 개선하여<br />
                  <span className="font-medium">매끄러운 바디라인</span>을 완성합니다.
                </p>
                <div className="mt-8">
                  <a
                    href="/consultation/request"
                    className="px-8 py-3 bg-white text-teal-smoke-700 rounded-xl font-elegant-sans font-medium hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>상담 신청하기</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden">
                <img 
                  src="/images/procedures/silofat/hero-main.jpg" 
                  alt="실로팻 시술"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Treatment Info Section */}
      <div className="relative -mt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-teal-smoke-50 to-white rounded-2xl">
                <Clock className="w-10 h-10 text-teal-smoke-500 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-teal-smoke-700 mb-1">시술시간</h3>
                  <p className="text-teal-smoke-800 font-elegant-sans font-medium">1시간 이내</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-elegant-50 to-white rounded-2xl">
                <Syringe className="w-10 h-10 text-elegant-500 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-teal-smoke-700 mb-1">마취방법</h3>
                  <p className="text-teal-smoke-800 font-elegant-sans font-medium">국소마취</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-teal-smoke-50 to-white rounded-2xl">
                <Calendar className="w-10 h-10 text-teal-smoke-500 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-teal-smoke-700 mb-1">회복기간</h3>
                  <p className="text-teal-smoke-800 font-elegant-sans font-medium">일상생활 바로가능</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 실로팻이란? 섹션 */}
      <div className="relative pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-teal-smoke-800 mb-8">
              실로팻이란?
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-12"></div>
            <p className="text-xl font-elegant-sans font-light text-teal-smoke-700 leading-relaxed max-w-5xl mx-auto">
              전용주사기로 간단하게 지방을 추출하는 시술, 지방세포를 직접 제거하는 방식으로<br />
              지방세포의 수와 크기를 줄여주어 원하는 부위를 교정해<br />
              <span className="font-medium text-elegant-600">이상적인 라인을 만들어 주는 시술</span>입니다.
            </p>
          </div>

          {/* 5가지 장점 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {[
              { icon: '🕒', title: '짧은 시술 시간', desc: '빠르고 간편한 시술' },
              { icon: '🫀', title: '순수지방세포 추출 바로 확인', desc: '즉시 확인 가능' },
              { icon: '💉', title: '전신마취, 수면마취 NO!', desc: '국소마취만으로 진행' },
              { icon: '💪', title: '불편한 압박복 NO!', desc: '압박복 착용 불필요' },
              { icon: '🧼', title: '비절개, 흉터 걱정 NO!', desc: '절개 없는 안전한 시술' }
            ].map((advantage, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-white to-teal-smoke-25 rounded-2xl shadow-lg border border-teal-smoke-200/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-4xl mb-4">{advantage.icon}</div>
                <h4 className="text-lg font-elegant font-bold text-teal-smoke-800 mb-3 leading-tight">{advantage.title}</h4>
                <p className="text-sm font-elegant-sans font-light text-teal-smoke-600">{advantage.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>


      {/* Dropdown Section */}
      <div className="py-24 bg-gradient-to-b from-white to-teal-smoke-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-light text-teal-smoke-700 mb-4">
              주사로 간단하게 쏙!
            </h2>
            <h3 className="text-4xl lg:text-5xl font-display font-light text-teal-smoke-800 mb-6">
              SILO-FAT 알아보기
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {dropdownItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-teal-smoke-200/50 transition-all duration-300"
              >
                <button
                  onClick={() => toggleDropdown(item.id)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-teal-smoke-50 transition-colors"
                >
                  <span className="text-lg font-elegant font-medium text-teal-smoke-800">{item.title}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-teal-smoke-500 transition-transform duration-300 ${
                      openDropdown === item.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openDropdown === item.id ? 'max-h-[600px]' : 'max-h-0'
                  }`}
                >
                  <div className="px-8 py-6 border-t border-teal-smoke-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 text-white rounded-full text-sm font-elegant-sans font-medium">
                          {item.label}
                        </span>
                        <p className="text-teal-smoke-700 whitespace-pre-line leading-relaxed font-elegant-sans font-light">
                          {item.content}
                        </p>
                      </div>
                      <div className="flex items-start justify-center">
                        <div className="w-full bg-white rounded-xl p-4 shadow-md border border-teal-smoke-200/30">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-auto object-contain rounded-lg max-h-80"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body Parts Section */}
      <div className="py-24 bg-gradient-to-br from-teal-smoke-100 to-elegant-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-light text-teal-smoke-800 mb-4">
              PART
            </h2>
            <h3 className="text-3xl font-display font-light text-teal-smoke-700 mb-6">
              실로팻 시술 부위
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                실로팻에 대해 더 자세한 상담을 원하시나요?<br />
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
                  <option value="부유방" className="text-teal-smoke-700">부유방</option>
                  <option value="팔 라인" className="text-teal-smoke-700">팔 라인</option>
                  <option value="복부" className="text-teal-smoke-700">복부</option>
                  <option value="러브핸들" className="text-teal-smoke-700">러브핸들</option>
                  <option value="종아리/허벅지" className="text-teal-smoke-700">종아리/허벅지</option>
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