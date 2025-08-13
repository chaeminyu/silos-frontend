'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageLayout from '../../../components/PageLayout';
import { Sparkles, Clock, Shield, Star, ChevronDown, ChevronUp, ShoppingCart, Check } from 'lucide-react';

const silosliftingProcedures = [
  {
    id: 'thread-lifting',
    title: '실로스 실리프팅',
    subtitle: 'SILOS THREAD LIFTING',
    description: [
      '실로스만의 특허받은 실리프팅 기법으로',
      '개인의 얼굴 구조와 노화 패턴을 분석하여',
      '최적의 실 종류와 삽입 방향을 결정합니다.',
      '자연스러우면서도 효과적인 리프팅으로',
      '젊고 세련된 인상을 만들어드립니다.'
    ],
    features: ['무절개', '즉시효과', '자연스러움'],
    duration: '30분내외',
    category: '실리프팅'
  },
  {
    id: 'power-lifting',
    title: '실로스 파워 실리프팅',
    subtitle: 'SILOS POWER LIFTING',
    description: [
      '일반 실리프팅보다 더 강력한 리프팅 효과를 위해',
      '고강도 실을 사용하여 깊은 층까지 리프팅합니다.',
      '중등도 이상의 처짐에 효과적이며',
      '장기간 지속되는 리프팅 효과를 제공합니다.',
      '실로스만의 노하우로 안전하고 확실한 결과를 보장합니다.'
    ],
    features: ['고강도실', '장기지속', '깊은리프팅'],
    duration: '45분내외',
    category: '실리프팅'
  },
  {
    id: 'nose-lifting',
    title: '코리프팅',
    subtitle: 'NOSE LIFTING',
    description: [
      '비절개로 코끝과 콧대를 자연스럽게 리프팅',
      'PDO 실을 이용한 안전한 코 성형술',
      '수술 부담 없이 즉시 효과를 확인할 수 있으며',
      '자연스러운 코 라인을 만들어드립니다.',
      '개인의 얼굴 비율에 맞는 맞춤형 디자인'
    ],
    features: ['비절개', '즉시효과', '맞춤디자인'],
    duration: '20분내외',
    category: '코성형'
  },
  {
    id: 'jawline-lifting',
    title: '턱라인 리프팅',
    subtitle: 'JAWLINE LIFTING',
    description: [
      '처진 턱라인을 날렵하고 세련된 라인으로 개선',
      '이중턱과 불독살을 동시에 해결하는 시술',
      'V라인 효과로 작고 갸름한 얼굴 연출',
      '콜라겐 생성 촉진으로 지속적인 탄력 개선',
      '무절개로 부담 없는 자연스러운 결과'
    ],
    features: ['V라인효과', '이중턱개선', '콜라겐생성'],
    duration: '25분내외',
    category: '턱라인'
  },
  {
    id: 'forehead-lifting',
    title: '이마 리프팅',
    subtitle: 'FOREHEAD LIFTING',
    description: [
      '처진 이마와 눈썹을 자연스럽게 리프팅',
      '이마 주름 개선과 동시에 리프팅 효과',
      '눈이 더 커보이고 또렷한 인상을 연출',
      '최소한의 실로 최대한의 효과를 구현',
      '흉터 걱정 없는 안전한 비절개 시술'
    ],
    features: ['눈매개선', '주름완화', '비절개'],
    duration: '20분내외',
    category: '이마'
  },
  {
    id: 'jowl-lifting',
    title: '불독살 리프팅',
    subtitle: 'JOWL LIFTING',
    description: [
      '처진 불독살을 효과적으로 리프팅하여',
      '젊고 탄력있는 페이스 라인을 완성',
      '실로스만의 특수 기법으로 자연스러운 결과',
      '콜라겐 재생으로 지속적인 탄력 개선',
      '일상생활에 지장 없는 간편한 시술'
    ],
    features: ['불독살개선', '탄력증진', '간편시술'],
    duration: '25분내외',
    category: '볼살'
  },
  {
    id: 'nasolabial-lifting',
    title: '팔자주름 리프팅',
    subtitle: 'NASOLABIAL LIFTING',
    description: [
      '깊어진 팔자주름을 자연스럽게 개선',
      '볼의 처짐을 근본적으로 리프팅하여',
      '젊고 밝은 인상으로 변화시킵니다.',
      '실 시술과 동시에 볼륨 리프팅 효과',
      '지속적인 콜라겐 생성으로 오래가는 효과'
    ],
    features: ['주름개선', '볼륨리프팅', '오래가는효과'],
    duration: '30분내외',
    category: '주름'
  }
];

export default function SilosLiftingPage() {
  const searchParams = useSearchParams();
  const [expandedProcedure, setExpandedProcedure] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState<string[]>([]);
  const [selectedThread, setSelectedThread] = useState<number>(0);

  // Handle URL parameter for auto-expanding and scrolling
  useEffect(() => {
    const procedureParam = searchParams.get('procedure');
    if (procedureParam) {
      setExpandedProcedure(procedureParam);
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

  const handleAddToCart = (procedureId: string, procedureName: string) => {
    if (!addedToCart.includes(procedureId)) {
      setAddedToCart([...addedToCart, procedureId]);
      console.log(`Added to cart: ${procedureName}`);
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
              <Sparkles className="w-4 h-4 mr-2" />
              SILOS CUSTOMIZING LIFTING
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-light mb-6 tracking-wide leading-tight">
              SILOS CUSTOMIZING<br />
              <span className="text-5xl lg:text-6xl">실리프팅</span>
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-lg lg:text-xl font-elegant-sans font-light max-w-4xl mx-auto leading-relaxed text-white/90">
              시술 부위, 피부 처짐, 지방량, 골격, 니즈 등을 고려해<br />
              다양한 실을 복합적으로 활용하여<br />
              <span className="font-medium">보다 안전적이고, 만족스러운 실리프팅 시술을 진행해드립니다</span>
            </p>
          </div>
        </div>
      </div>

      {/* 메인 섹션 */}
      <div className="relative pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">



          {/* 실리프팅 후 부기 및 통증 케어 */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-display font-light text-teal-smoke-800 mb-6">
                실리프팅만 하면 끝? NO!
              </h3>
              <p className="text-lg font-elegant-sans font-light text-teal-smoke-700 leading-relaxed mb-8">
                시술 후 빠른 회복과 일상 생활 복귀를 위한<br />
                부기 및 통증 케어
              </p>

            {/* 5가지 리프팅 타입 */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
              {[
                { title: '베이직 리프팅', color: 'from-teal-smoke-300 to-teal-smoke-400' },
                { title: '듀얼 리프팅', color: 'from-elegant-300 to-elegant-400' },
                { title: '트리플 리프팅', color: 'from-teal-smoke-400 to-elegant-400' },
                { title: '쿼드 리프팅', color: 'from-elegant-400 to-teal-smoke-500' },
                { title: '프리미엄 펜타 리프팅', color: 'from-teal-smoke-500 to-elegant-600', isPremium: true }
              ].map((type, index) => (
                <div key={index} className={`text-center p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${type.isPremium ? 'bg-gradient-to-br from-teal-smoke-50 to-elegant-50 border-2 border-teal-smoke-400' : 'bg-white border border-teal-smoke-200/30'}`}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <h4 className={`text-lg font-elegant font-bold text-teal-smoke-800 ${type.isPremium ? 'text-teal-smoke-900' : ''}`}>{type.title}</h4>
                  {type.isPremium && (
                    <div className="mt-2">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white text-xs font-bold rounded-full">
                        PREMIUM
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

              <h3 className="text-3xl lg:text-4xl font-display font-bold text-teal-smoke-800 mb-6 leading-tight">
                실리프팅 후 주변 세포 조직이 가장 활발히 움직이는 시기에<br />
                시나지 시술까지, 실리프팅 특화 애프터케어
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-8"></div>
              <p className="text-2xl lg:text-3xl font-bold text-elegant-600">
                실로케어
              </p>
            </div>

            {/* 얼굴 시술 부위 이미지 */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="relative bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-3xl p-8 shadow-xl">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <img 
                    src="/images/procedures/silos-lifting/face-areas.jpg" 
                    alt="얼굴 시술 부위"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* 3M 실프케어키트 증정 */}
            <div className="text-center mb-12">
              <h4 className="text-3xl lg:text-4xl font-display font-bold text-teal-smoke-800 mb-6">
                3M 실프케어키트 증정
              </h4>
              <p className="text-lg font-elegant-sans font-medium text-elegant-600">
                자체제작 리프팅밴드
              </p>
            </div>

            {/* 3가지 실 종류 설명 - 인터랙티브 */}
            <div className="mb-12">
              {/* 작은 썸네일들 */}
              <div className="grid grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
                {[
                  { image: '/images/procedures/silos-lifting/thread-type-1.jpg' },
                  { image: '/images/procedures/silos-lifting/thread-type-2.jpg' },
                  { image: '/images/procedures/silos-lifting/thread-type-3.jpg' }
                ].map((thread, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedThread(index)}
                    className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      selectedThread === index 
                        ? 'ring-4 ring-teal-smoke-400 shadow-2xl scale-105' 
                        : 'hover:shadow-lg'
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-4 shadow-lg border border-teal-smoke-200/30">
                      <div className="overflow-hidden rounded-xl">
                        <img 
                          src={thread.image} 
                          alt={`실 종류 ${index + 1}`}
                          className="w-full h-auto object-contain"
                          style={{ maxHeight: '200px' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 선택된 실 종류 큰 이미지 */}
              <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-3xl p-8 shadow-2xl border border-teal-smoke-200/30">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img 
                      src={[
                        '/images/procedures/silos-lifting/thread-type-1.jpg',
                        '/images/procedures/silos-lifting/thread-type-2.jpg',
                        '/images/procedures/silos-lifting/thread-type-3.jpg'
                      ][selectedThread]} 
                      alt={`선택된 실 종류`}
                      className="w-full h-auto object-contain transform transition-all duration-500 ease-in-out"
                      style={{ maxHeight: '700px' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* YouTube 비디오 */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-teal-smoke-200/30">
                <h4 className="text-xl font-elegant font-medium text-teal-smoke-800 mb-4 text-center">
                  실로스 리프팅 시술 영상
                </h4>
                <div className="relative">
                  <div 
                    className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl cursor-pointer group flex items-center justify-center hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800 transition-all"
                    onClick={() => window.open('https://www.youtube.com/watch?v=YOUR_VIDEO_ID', '_blank')}
                  >
                    <div className="text-center text-white">
                      <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 transition-colors">
                        <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <p className="font-elegant-sans">클릭하여 YouTube에서 시청하기</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SILOS 커스텀 리프팅 강조 섹션 */}
          <div className="mb-20 py-8">
            <div className="bg-gradient-to-br from-teal-smoke-700 via-elegant-700 to-teal-smoke-800 rounded-3xl p-12 text-white text-center shadow-2xl transform hover:scale-[1.01] transition-all duration-500">
              <h3 className="text-3xl lg:text-4xl font-display font-bold mb-6 tracking-wide">
                SILOS 커스텀 리프팅
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-white/40 via-white/80 to-white/40 rounded-full mx-auto mb-8"></div>
              <p className="text-lg lg:text-xl font-elegant-sans font-medium max-w-4xl mx-auto leading-relaxed">
                실리프팅? 레이저리프팅? 똑같은 시술은 그만<br />
                <span className="text-xl lg:text-2xl font-bold text-yellow-300 mt-3 block">
                  숙련된 의료진이 집도하는 실로스 커스텀 리프팅
                </span>
              </p>
            </div>
          </div>

          {/* 장비 사진 */}
          <div className="mb-20">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-teal-smoke-200/30">
                <div className="aspect-video bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-xl overflow-hidden">
                  <img 
                    src="/images/procedures/silos-lifting/professional-equipment.jpg" 
                    alt="전문 장비"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 피부층 설명 이미지 */}
          <div className="mb-20">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-smoke-200/30">
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="/images/procedures/silos-lifting/skin-layers-diagram.jpg" 
                    alt="피부층 설명 다이어그램"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: '500px' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CASE 섹션 */}
          <div className="bg-gradient-to-br from-teal-smoke-600 to-elegant-700 rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-display font-light mb-4">CASE</h3>
              <h4 className="text-2xl font-elegant font-light mb-6">실로스 실리프팅이 필요한 경우</h4>
              <div className="w-20 h-0.5 bg-white/60 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  case: 'CASE 01',
                  title: '처진 볼살과\n팔자주름이 깊어진 경우'
                },
                {
                  case: 'CASE 02', 
                  title: '이중턱과 턱라인이\n무너진 경우'
                },
                {
                  case: 'CASE 03',
                  title: '전체적으로 늘어져\n나이 들어 보이는 경우'  
                },
                {
                  case: 'CASE 04',
                  title: '자연스러우면서도\n확실한 리프팅을 원하는 경우'
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

          {/* PROCEDURE 섹션 - 아코디언 스타일 */}
          <div className="mb-20 mt-20">
            <div className="text-center mb-16">
              <h3 className="text-4xl lg:text-5xl font-display font-bold text-teal-smoke-800 mb-6">
                PROCEDURE
              </h3>
              <h4 className="text-2xl lg:text-3xl font-elegant font-bold text-elegant-600 mb-8">
                실로스 커스터마이징 실리프팅 시술
              </h4>
              <div className="w-32 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto"></div>
            </div>

            {/* 아코디언 프로시저 리스트 */}
            <div className="space-y-6">
              {silosliftingProcedures.map((procedure, index) => {
                const isExpanded = expandedProcedure === procedure.id;
                return (
                  <div
                    key={procedure.id}
                    id={procedure.id}
                    className="bg-white rounded-3xl shadow-xl border border-teal-smoke-200/30 overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
                  >
                    {/* 헤더 - 클릭 가능 */}
                    <button
                      onClick={() => toggleProcedure(procedure.id)}
                      className="w-full bg-gradient-to-r from-teal-smoke-500 to-elegant-500 py-8 px-8 hover:from-teal-smoke-600 hover:to-elegant-600 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-lg font-bold text-white">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <h3 className="text-2xl lg:text-3xl font-display font-bold text-white tracking-wide">
                            {procedure.title}
                          </h3>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-7 h-7 text-white transition-transform" />
                        ) : (
                          <ChevronDown className="w-7 h-7 text-white transition-transform" />
                        )}
                      </div>
                    </button>

                    {/* 확장 가능한 콘텐츠 */}
                    {isExpanded && (
                      <div className="p-10 bg-gradient-to-br from-white to-teal-smoke-25">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                          {/* 왼쪽: 설명 (2/3 너비) */}
                          <div className="lg:col-span-2">
                            <h4 className="text-3xl lg:text-4xl font-display font-bold text-teal-smoke-800 mb-8 tracking-wide">
                              {procedure.subtitle}
                            </h4>
                            <div className="space-y-4 mb-10">
                              {procedure.description.map((desc, i) => (
                                <p key={i} className="text-lg text-teal-smoke-700 font-elegant-sans font-light leading-relaxed">
                                  {desc}
                                </p>
                              ))}
                            </div>

                            {/* 특징 배지들 */}
                            <div className="flex flex-wrap gap-4 mb-8">
                              {procedure.features.map((feature, i) => (
                                <div key={i} className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-bold bg-gradient-to-r from-teal-smoke-100 to-elegant-100 text-teal-smoke-800 border-2 border-teal-smoke-200 shadow-lg">
                                  <Sparkles className="w-4 h-4 mr-2" />
                                  {feature}
                                </div>
                              ))}
                            </div>

                            {/* 시술시간 */}
                            <div className="flex items-center space-x-4">
                              <div className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-bold bg-gradient-to-r from-elegant-200 to-teal-smoke-200 text-teal-smoke-800 border-2 border-elegant-300 shadow-lg">
                                <Clock className="w-4 h-4 mr-2" />
                                {procedure.duration}
                              </div>
                              <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-elegant-sans font-bold bg-gray-200 text-gray-700 border border-gray-300">
                                {procedure.category}
                              </div>
                            </div>
                          </div>

                          {/* 오른쪽: 이미지 및 장바구니 (1/3 너비) */}
                          <div className="flex flex-col items-center justify-between">
                            <div className="w-full h-56 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-2xl border-2 border-teal-smoke-200/30 flex items-center justify-center mb-8 shadow-lg">
                              <div className="text-center text-teal-smoke-400">
                                <Sparkles className="w-16 h-16 mx-auto mb-3" />
                                <p className="font-elegant-sans font-medium">
                                  {procedure.title}
                                </p>
                              </div>
                            </div>

                            {/* 장바구니 버튼 */}
                            <button
                              onClick={() => handleAddToCart(procedure.id, procedure.title)}
                              className={`w-full py-4 px-6 rounded-xl font-elegant-sans font-bold text-base transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                                addedToCart.includes(procedure.id)
                                  ? 'bg-gradient-to-r from-green-200 to-green-300 text-green-800 cursor-default border-2 border-green-400'
                                  : 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white hover:from-teal-smoke-500 hover:to-elegant-500 border-2 border-transparent'
                              }`}
                              disabled={addedToCart.includes(procedure.id)}
                            >
                              {addedToCart.includes(procedure.id) ? (
                                <>
                                  <Check className="w-5 h-5" />
                                  <span>상담 리스트에 담김</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="w-5 h-5" />
                                  <span>상담 신청하기</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 전체 상담 신청 섹션 */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-white/80 to-teal-smoke-50/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50">
              <h3 className="text-3xl lg:text-4xl font-display font-bold text-teal-smoke-800 mb-6">
                실로스 커스터마이징 실리프팅 상담 신청
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-8"></div>
              <p className="text-xl font-elegant-sans font-medium text-teal-smoke-700 mb-10">
                전문 의료진과 함께 나에게 가장 적합한 실리프팅을 찾아보세요
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
    </PageLayout>
  );
}