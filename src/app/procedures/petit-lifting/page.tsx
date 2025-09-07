'use client';

import { useState, useRef } from 'react';
import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
import { Clock, Shield, Star, ShoppingCart, Check, Sparkles, Target, Layers, Zap, User, ChevronRight, Eye } from 'lucide-react';
import { useCart } from '../../../contexts/CartContext';

export default function PetitLiftingPage() {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [selectedProcedure, setSelectedProcedure] = useState('advanced-filler');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const procedureId = 'petit-lifting';
  const isAdded = isInCart(procedureId);

  const handleToggleCart = () => {
    if (isAdded) {
      removeFromCart(procedureId);
    } else {
      addToCart({
        id: procedureId,
        name: '쁘띠 리프팅',
        category: '미용성형'
      });
    }
  };

  const handleProcedureChange = (procedureId: string) => {
    setSelectedProcedure(procedureId);
    
    // Smooth scroll to content section
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // 상세 시술 데이터
  const procedures = [
    {
      id: 'advanced-filler',
      title: '고난도 필러',
      subtitle: 'ADVANCED FILLER',
      description: '내 얼굴의 장점을 살리는 맞춤형 필러',
      features: [
        '기본형/심화형 맞춤 시술',
        '얼굴 상태 실시간 관찰',
        '앉은 상태로 정밀 시술'
      ],
      details: [
        '완성도 높은 시술을 위해 기본형 / 심화형으로 나누어 시술합니다',
        '시술 부위의 조직 상태와 연령, 개인의 구조별 특징 시술 이력을 고려해 난이도에 따라 구분',
        '꺼짐 정도와 얼굴 모양이 달라 얼굴과 표정의 변화를 관찰하면서 세밀하게 시술',
        '중력에 의한 일상생활의 얼굴 상태를 실시간으로 관찰하면서 필러 주입'
      ],
      icon: Layers
    },
    {
      id: 'special-area-filler',
      title: '특수부위 필러',
      subtitle: 'SPECIAL AREA FILLER',
      description: '얼굴의 특수한 부위와 라인 개선',
      features: [
        '귀필러, 쇄골필러, 어깨필러',
        '부족한 부위 라인 개선',
        '전체적인 실루엣 완성'
      ],
      areas: [
        { name: '귀필러', desc: '잔주름을 지워주고 빈 곳을 채워주어 개개인마다 다른 얼굴 및 바디 쉐입에 맞춰 디자인하기' },
        { name: '쇄골필러', desc: '움푹 들어간 쇄골 부위 볼륨 개선' },
        { name: '어깨필러', desc: '어깨 라인 교정 및 실루엣 개선' }
      ],
      carePoints: [
        '시술 후 특수부위 보아업, 부기, 통증 등이 생길 수 있습니다',
        '시술 당일 중량운동은 자제하시기 바랍니다', 
        '시술 후 외상이나 감출 금여하시기 바랍니다',
        '시술 후 쇄골이나 사우나, 찜질방 땀목욕 등은 피하시기 바랍니다',
        '시술 후 시술부위 과도하게 만지거나 눈파게수 손을 넣으모 금합니다'
      ],
      icon: Target
    },
    {
      id: 'botox',
      title: '보톡스',
      subtitle: 'BOTOX TREATMENT',
      description: '근육의 움직임까지 고려한 섬세한 터치',
      features: [
        '근육 보톡스',
        '주름 보톡스', 
        '리프팅 보톡스(스킨보톡스)'
      ],
      procedureInfo: {
        duration: '5-10분 이내',
        anesthesia: '국소마취',
        recovery: '즉시',
        frequency: '6-8개월'
      },
      types: [
        {
          name: '근육 보톡스',
          target: '사각턱 축소와 과한 근육의 부피를 줄여주어 슬림한 라인을 만들어 수 있습니다.',
          image: '/images/procedures/petit-lifting/muscle-botox.jpg'
        },
        {
          name: '주름 보톡스', 
          target: '표정 주름, 생활습관 주름, 노화 이완 다양한 주름을 펠렸하게 개선합니다.',
          image: '/images/procedures/petit-lifting/wrinkle-botox.jpg'
        },
        {
          name: '리프팅 보톡스(스킨보톡스)',
          target: '탄력이 있고, 얼애 교정, 얼을 라인 등 얼를 전체에 타목을 주는 효과가 있습니다.',
          image: '/images/procedures/petit-lifting/lifting-botox.jpg'
        }
      ],
      concerns: [
        { area: '이마주름', desc: '눈썹을 올리느-비주먹이 의해 이마 주름이 방생한 경우' },
        { area: '미간 주름', desc: '찌그리는 습관으로 인해 미간 근육의 자움으로 골이 패인 미간 주름 개선' },
        { area: '눈가 주름', desc: '눈가의 주름으로 상제히 비해 더 나이가 들어 보이는 경우' },
        { area: '사각턱', desc: '자칫근의 운동으로 인해 각지고 커진 사각 턱을 개선' },
        { area: '송모근', desc: '씨아 오를 송모근으로 인해 목이 짧아 보이고 이깨가 좁아 보이는 등을 개선' },
        { area: '종아리', desc: '근육성에서 주된 나타나는 엽대로 종아리 칸이라 부르는 곳을 개선' }
      ],
      expertise: '고민 부위와 피부 타입, 나이 등 현재 상태를 다각도로 고려하며 근육의 움직임과 전체적인 인상을 고려하며 디테일하게 시술합니다.',
      icon: Zap
    },
    {
      id: 'melting-injection',
      title: '멜팅주사 / 슬림멜팅주사',
      subtitle: 'MELTING & SLIM MELTING INJECTION',
      description: '안전하고 효과적인 지방분해주사 / NO 스테로이드',
      features: [
        '지방세포 분해',
        '부기 완화',
        '피부 탄력 개선'
      ],
      faceInjection: {
        title: '멜팅주사 (얼굴)',
        benefits: [
          '비침습적 시술 → 주사 기법으로 간단하게 가능',
          '비교적 빠른 시술 시간 → 약 10~15분이면 끝! 점심시간에도 가능',
          '시술 후 원활한 일상생활 가능 → 맞고 나서도 크게 티 안 남',
          '점진적인 변화 → 급격한 변화 없이 자연스럽게 라인 정리',
          '부기, 지방 정리 효과 → 단순 살 빼기가 아닌 윤곽 개선'
        ],
        targetAreas: [
          { 
            area: '볼살 (심부볼)', 
            desc: '둥글둥글한 얼굴 교정!',
            detail: '윤곽주사로 볼 아래쪽 살을 정리하면, 얼굴이 갸름해 보이고 광대도 덜 도드라져 보이는 효과!'
          },
          { 
            area: '이중턱 (턱살)', 
            desc: '브이라인 핵심!',
            detail: '이중턱 부위에 윤곽주사를 맞으면? 턱선이 더 또렷해지면서 자연스럽게 V라인 완성!'
          },
          { 
            area: '광대 밑 살', 
            desc: '얼굴 축소 효과!',
            detail: '윤곽주사로 광대 부위를 정리하면 덜 튀어나와 보이고 얼굴이 작아 보이는 효과!'
          },
          { 
            area: '턱 끝 (V라인 정리)', 
            desc: '정리된 턱선 완성!',
            detail: '자연스럽게 턱선이 살아나고, 더 세련된 인상 연출 가능!'
          },
          { 
            area: '페이스라인 전체', 
            desc: '전체적인 윤곽 정리',
            detail: '특정 부위만이 아니라 페이스라인 전체를 정리하면 얼굴이 전체적으로 작고 갸림해 보이는 효과'
          }
        ],
        concerns: [
          '볼은 홀쭉한데 턱선은 둔탁한 경우',
          '광대 주변이 볼록해서 얼굴이 커 보이는 경우', 
          '이중턱 때문에 전체적으로 둔해 보이는 경우'
        ]
      },
      bodyInjection: {
        title: '슬림멜팅주사 (바디)',
        targetAreas: [
          { area: '복부', desc: '뱃살 집중 분해' },
          { area: '허벅지', desc: '허벅지 라인 정리' },
          { area: '팔뚝', desc: '팔뚝 살 제거' },
          { area: '등살', desc: '브래지어 라인 정리' }
        ],
        benefits: [
          '멜팅주사보다 강화된 분해력',
          '신체 부위별 맞춤 시술',
          '더욱 빠른 라인 개선 효과'
        ]
      },
      mechanism: [
        '지방 세포 분해 → 특정 성분이 지방 세포를 서서히 분해',
        '부기 완화 → 체내 림프 순환을 도와 불필요한 수분 제거',
        '피부 탄력 개선 → 지방이 줄어든 자리에 피부 탄력을 유지'
      ],
      icon: Target
    },
    {
      id: 'violet-injection',
      title: '브이올렛',
      subtitle: 'VIOLET DCA INJECTION',
      description: '허가받은 반영구적 지방파괴주사',
      tagline: '이중턱, 턱밑살 안녕!',
      subtitle2: '이중턱 전용 DCA주사',
      tags: ['지방파괴주사', '이중턱', '턱밑지방개선', 'NO스테로이드', 'DCA'],
      procedureInfo: {
        cycle: '4주',
        sessions: '3회',
        duration: '10분'
      },
      keyPoints: [
        {
          title: 'POINT 1',
          desc: '국내 유일, 허가받은 이중턱주사'
        },
        {
          title: 'POINT 2', 
          desc: '스테로이드 無'
        },
        {
          title: 'POINT 3',
          desc: '지방세포막 사멸을 유도하여 이중턱 개선'
        },
        {
          title: 'POINT 4',
          desc: '이중턱 개선에 효과적'
        }
      ],
      features: [
        '턱밑지방개선',
        '지방세포파괴', 
        'NO스테로이드',
        '간편한주사시술',
        '연고마취',
        '다른시술과병행가능'
      ],
      description2: '식약처 허가 받은 이중턱 및 턱밑 개선 윤곽주사',
      precautions: [
        '시술 후 통증과 붓기, 가벼운 멍이 발생할 수있으며 증상은 자연스럽게 사라집니다.',
        'DCA 성분의 지방세포 파괴 효과로 붓기가 1주일 이상 지속 될 수 있음을 유의해야 합니다.',
        '시술 후 사우나, 찜질방, 뜨거운 욕조 목욕, 핫팩 등의 고온 자극은 피하는 편이 좋습니다.'
      ],
      icon: Zap
    }
  ];

  const benefits = [
    {
      number: '01',
      title: '맞춤형 진단',
      description: '개인별 얼굴 구조와 상태를 정밀 분석하여 최적의 시술 계획 수립',
      icon: User
    },
    {
      number: '02', 
      title: '전문 기술력',
      description: '풍부한 경험과 노하우를 바탕으로 안전하고 자연스러운 결과 구현',
      icon: Star
    },
    {
      number: '03',
      title: '프리미엄 재료',
      description: 'FDA 승인 정품 필러와 보톡스만을 사용하여 안전성과 지속성 보장',
      icon: Shield
    }
  ];

  const faqData = [
    {
      question: '시술 후 일상생활은 언제부터 가능한가요?',
      answer: '대부분의 쁘띠 시술은 당일 일상생활이 가능합니다. 다만 격한 운동이나 사우나는 2-3일 정도 피해주시는 것이 좋습니다.'
    },
    {
      question: '시술 효과는 얼마나 지속되나요?',
      answer: '필러의 경우 6개월~1년, 보톡스는 3-6개월 정도 지속됩니다. 개인차에 따라 차이가 있을 수 있습니다.'
    },
    {
      question: '부작용이나 위험성은 없나요?',
      answer: '정품 제품과 숙련된 의료진에 의한 시술로 부작용 위험을 최소화합니다. 일시적인 붓기나 멍은 자연스럽게 사라집니다.'
    }
  ];

  const getSelectedProcedure = () => {
    return procedures.find(proc => proc.id === selectedProcedure) || procedures[0];
  };

  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <div className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-400 via-elegant-400 to-teal-smoke-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
        
        {/* 배경 장식 */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32 w-full">
            <div className="text-center">
              {/* 배지 */}
              <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-elegant-sans font-medium text-white mb-6 shadow-lg border border-white/30">
                <Sparkles className="w-4 h-4 mr-2" />
                <span>PREMIUM PETIT LIFTING</span>
              </div>
              
              {/* 타이틀 */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-white mb-6 leading-tight">
                <span className="block">쁘띠 리프팅</span>
                <span className="text-2xl sm:text-3xl lg:text-4xl text-white/90 font-medium mt-2 block">
                  정밀한 맞춤형 미세 시술
                </span>
              </h1>
              
              {/* 설명 */}
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 font-elegant-sans leading-relaxed">
                고난도 필러 / 특수부위 필러 / 보톡스<br/>
                <span className="text-base text-white/80 mt-1 block">
                  멜팅주사·슬림멜팅주사 / 브이올렛
                </span>
              </p>
              
              {/* CTA 버튼 */}
              <div className="flex justify-center">
                <button
                  onClick={handleToggleCart}
                  className={`group px-8 py-4 rounded-2xl font-elegant-sans font-medium transition-all duration-300 flex items-center justify-center ${
                    isAdded 
                      ? 'bg-white/20 text-white border-2 border-white/50 backdrop-blur-sm hover:bg-white/30' 
                      : 'bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      장바구니에 추가됨
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      상담 신청하기
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 주요 특징 섹션 */}
      <div className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-light text-slate-900 mb-4">
              쁘띠 리프팅의 차별점
            </h2>
            <p className="text-lg text-slate-600 font-elegant-sans">
              개인 맞춤형 정밀 진단과 프리미엄 시술
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-10 h-10 text-teal-smoke-600" />
                  </div>
                  <div className="bg-gradient-to-br from-teal-smoke-400 to-elegant-400 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {benefit.number}
                  </div>
                  <h3 className="text-xl font-display font-medium text-slate-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 font-elegant-sans">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 시술 정보 섹션 */}
      <div className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-light text-slate-900 mb-4">
              전문 시술 프로그램
            </h2>
            <p className="text-lg text-slate-600 font-elegant-sans">
              개인별 맞춤 진단을 통한 최적의 시술 선택
            </p>
          </div>

          {/* 시술 선택 및 상세 정보 - 사이드바 레이아웃 */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* 왼쪽 사이드바 - 시술 선택 탭 (데스크톱만) */}
            <div className="hidden lg:block lg:col-span-1">
              {/* 데스크톱용 세로 탭 */}
              <div className="space-y-3 sticky top-8">
                {procedures.map((procedure) => {
                  const IconComponent = procedure.icon;
                  return (
                    <button
                      key={procedure.id}
                      onClick={() => handleProcedureChange(procedure.id)}
                      className={`w-full p-4 rounded-xl font-elegant-sans font-medium transition-all duration-300 text-left flex items-center ${
                        selectedProcedure === procedure.id
                          ? 'bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white shadow-lg transform scale-105'
                          : 'bg-white text-slate-600 border-2 border-teal-smoke-200 hover:border-teal-smoke-300 hover:bg-teal-smoke-50 hover:transform hover:scale-102'
                      }`}
                    >
                      <IconComponent className={`w-5 h-5 mr-3 flex-shrink-0 ${
                        selectedProcedure === procedure.id ? 'text-white' : 'text-teal-smoke-600'
                      }`} />
                      <div className="text-left">
                        <div className="text-sm font-medium leading-tight">
                          {procedure.title}
                        </div>
                        <div className={`text-xs mt-1 ${
                          selectedProcedure === procedure.id ? 'text-white/80' : 'text-slate-500'
                        }`}>
                          {procedure.subtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 콘텐츠 영역 */}
            <div className="lg:col-span-3 relative">
              {/* 모바일용 스티키 탭 바 (lg 미만에서만 표시) */}
              <div className="lg:hidden sticky top-20 z-20 bg-white/95 backdrop-blur-md border border-teal-smoke-200/50 rounded-xl shadow-lg mb-6 p-3">
                <div className="overflow-x-auto">
                  <div className="flex space-x-2 min-w-max justify-center">
                    {procedures.map((procedure) => {
                      const IconComponent = procedure.icon;
                      return (
                        <button
                          key={procedure.id}
                          onClick={() => handleProcedureChange(procedure.id)}
                          className={`flex-shrink-0 px-2 py-2 rounded-lg font-elegant-sans font-medium transition-all duration-300 text-center min-w-[80px] flex flex-col items-center ${
                            selectedProcedure === procedure.id
                              ? 'bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white shadow-md'
                              : 'bg-white text-slate-600 border border-teal-smoke-200 hover:border-teal-smoke-300 hover:bg-teal-smoke-50'
                          }`}
                        >
                          <IconComponent className={`w-4 h-4 mb-1 ${
                            selectedProcedure === procedure.id ? 'text-white' : 'text-teal-smoke-600'
                          }`} />
                          <div className="text-xs font-medium leading-tight">
                            {procedure.title.split(' ')[0]}
                          </div>
                          <div className={`text-[10px] leading-tight ${
                            selectedProcedure === procedure.id ? 'text-white/70' : 'text-slate-500'
                          }`}>
                            {procedure.title.split(' ').slice(1).join(' ') || procedure.subtitle.split(' ')[0]}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div ref={contentRef} className="bg-white rounded-3xl shadow-2xl border border-teal-smoke-200/30 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-smoke-500 to-elegant-500 py-12 px-8 text-center">
                  <h3 className="text-4xl font-display font-light text-white mb-4">
                    {getSelectedProcedure().title}
                  </h3>
                  <p className="text-xl font-elegant-sans font-light text-white/90">
                    {getSelectedProcedure().subtitle}
                  </p>
                </div>

                <div className="p-8 sm:p-12">
                  <div className="mb-8">
                    <h4 className="text-2xl font-display font-medium text-slate-900 mb-4">
                      {getSelectedProcedure().description}
                    </h4>
                    
                    {/* 특징 배지들 */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {getSelectedProcedure().features.map((feature, i) => (
                        <div key={i} className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-teal-smoke-100 to-elegant-100 text-teal-smoke-800 border border-teal-smoke-200">
                          <Sparkles className="w-4 h-4 mr-2" />
                          <span className="text-sm font-elegant-sans font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 시술별 상세 내용 */}
                  {selectedProcedure === 'advanced-filler' && (
                    <div className="space-y-6">
                  <div>
                    <h5 className="text-lg font-display font-medium text-slate-900 mb-4">시술 특징</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {getSelectedProcedure().details?.map((detail, i) => (
                        <div key={i} className="flex items-start p-4 bg-teal-smoke-50 rounded-xl">
                          <div className="w-2 h-2 bg-teal-smoke-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-sm text-slate-700 font-elegant-sans">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedProcedure === 'special-area-filler' && (
                <div className="space-y-8">
                  {/* 특수부위 필러 영역들 */}
                  <div>
                    <h5 className="text-lg font-display font-medium text-slate-900 mb-6">시술 부위</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                      {getSelectedProcedure().areas?.map((area, i) => (
                        <div key={i} className="text-center p-6 bg-gradient-to-br from-teal-smoke-50 to-elegant-50 rounded-2xl">
                          <div className="w-16 h-16 bg-gradient-to-br from-teal-smoke-400 to-elegant-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Target className="w-8 h-8 text-white" />
                          </div>
                          <h6 className="text-lg font-display font-medium text-slate-900 mb-3">{area.name}</h6>
                          <p className="text-sm text-slate-600 font-elegant-sans">{area.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 주의사항 */}
                  <div className="bg-orange-50 rounded-2xl p-6">
                    <h5 className="text-lg font-display font-medium text-slate-900 mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-orange-600" />
                      시술 후 주의사항
                    </h5>
                    <div className="space-y-2">
                      {getSelectedProcedure().carePoints?.map((point, i) => (
                        <div key={i} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-sm text-slate-700 font-elegant-sans">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedProcedure === 'botox' && (
                <div className="space-y-8">
                  {/* 시술 정보 카드 */}
                  <div className="bg-gradient-to-r from-teal-smoke-100 to-elegant-100 rounded-2xl p-6">
                    <h5 className="text-lg font-display font-medium text-slate-900 mb-4">보톡스 시술정보</h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="text-center">
                        <Clock className="w-8 h-8 text-teal-smoke-600 mx-auto mb-2" />
                        <p className="text-sm font-elegant-sans text-slate-700">수술시간</p>
                        <p className="text-sm font-bold text-slate-900">{getSelectedProcedure().procedureInfo?.duration}</p>
                      </div>
                      <div className="text-center">
                        <Shield className="w-8 h-8 text-teal-smoke-600 mx-auto mb-2" />
                        <p className="text-sm font-elegant-sans text-slate-700">마취방법</p>
                        <p className="text-sm font-bold text-slate-900">{getSelectedProcedure().procedureInfo?.anesthesia}</p>
                      </div>
                      <div className="text-center">
                        <Star className="w-8 h-8 text-teal-smoke-600 mx-auto mb-2" />
                        <p className="text-sm font-elegant-sans text-slate-700">회복기간</p>
                        <p className="text-sm font-bold text-slate-900">{getSelectedProcedure().procedureInfo?.recovery}</p>
                      </div>
                      <div className="text-center">
                        <Target className="w-8 h-8 text-teal-smoke-600 mx-auto mb-2" />
                        <p className="text-sm font-elegant-sans text-slate-700">시술주기</p>
                        <p className="text-sm font-bold text-slate-900">{getSelectedProcedure().procedureInfo?.frequency}</p>
                      </div>
                    </div>
                  </div>

                  {/* 보톡스 종류 */}
                  <div>
                    <h5 className="text-lg font-display font-medium text-slate-900 mb-6">시술 부위·목적에 맞는 보톡스 효과</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                      {getSelectedProcedure().types?.map((type, i) => (
                        <div key={i} className="bg-white border border-teal-smoke-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                          <div className="w-full h-40 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-xl flex items-center justify-center mb-4">
                            <Eye className="w-16 h-16 text-teal-smoke-600" />
                          </div>
                          <h6 className="text-lg font-display font-medium text-slate-900 mb-3">{type.name}</h6>
                          <p className="text-sm text-slate-600 font-elegant-sans">{type.target}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 시술 부위별 고민 */}
                  <div className="bg-slate-50 rounded-2xl p-6">
                    <h5 className="text-lg font-display font-medium text-slate-900 mb-6">부위별 시술 고민</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getSelectedProcedure().concerns?.map((concern, i) => (
                        <div key={i} className="bg-white rounded-xl p-4">
                          <h6 className="font-elegant-sans font-bold text-slate-800 mb-2">{concern.area}</h6>
                          <p className="text-xs text-slate-600 font-elegant-sans leading-relaxed">{concern.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 전문성 강조 */}
                  <div className="bg-gradient-to-r from-teal-smoke-500 to-elegant-500 rounded-2xl p-6 text-center">
                    <p className="text-white font-elegant-sans leading-relaxed">
                      {getSelectedProcedure().expertise}
                    </p>
                  </div>
                </div>
              )}

              {selectedProcedure === 'melting-injection' && (
                <div className="space-y-8">
                  {/* 멜팅주사 작용 원리 */}
                  <div>
                    <h5 className="text-lg font-display font-medium text-slate-900 mb-6">지방분해주사 작용 원리</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                      {getSelectedProcedure().mechanism?.map((mechanism, i) => (
                        <div key={i} className="text-center p-6 bg-gradient-to-br from-teal-smoke-50 to-elegant-50 rounded-2xl">
                          <div className="w-16 h-16 bg-gradient-to-br from-teal-smoke-400 to-elegant-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-lg">{i + 1}</span>
                          </div>
                          <p className="text-sm text-slate-700 font-elegant-sans leading-relaxed">{mechanism}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 멜팅주사 (얼굴) */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
                    <h5 className="text-xl font-display font-medium text-slate-900 mb-6 text-center">
                      {getSelectedProcedure().faceInjection?.title}
                    </h5>
                    
                    {/* 얼굴 고민 상황 */}
                    <div className="mb-8">
                      <h6 className="text-lg font-display font-medium text-slate-900 mb-4 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-blue-600" />
                        이런 고민이 있으신가요?
                      </h6>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {getSelectedProcedure().faceInjection?.concerns?.map((concern, i) => (
                          <div key={i} className="flex items-start p-4 bg-white/80 rounded-xl">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p className="text-sm text-slate-700 font-elegant-sans">{concern}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 얼굴 시술 부위 */}
                    <div className="mb-8">
                      <h6 className="text-lg font-display font-medium text-slate-900 mb-6">집중 시술 부위</h6>
                      <div className="space-y-4">
                        {getSelectedProcedure().faceInjection?.targetAreas?.map((area, i) => (
                          <div key={i} className="bg-white border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                <Target className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center mb-2">
                                  <h6 className="text-lg font-display font-medium text-slate-900 mr-3">{area.area}</h6>
                                  <span className="text-sm bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-3 py-1 rounded-full font-elegant-sans">{area.desc}</span>
                                </div>
                                <p className="text-sm text-slate-600 font-elegant-sans leading-relaxed">{area.detail}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 얼굴 시술 장점 */}
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6">
                      <h6 className="text-lg font-display font-medium text-white mb-6">멜팅주사의 장점</h6>
                      <div className="space-y-3">
                        {getSelectedProcedure().faceInjection?.benefits?.map((benefit, i) => (
                          <div key={i} className="flex items-start">
                            <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p className="text-white font-elegant-sans text-sm leading-relaxed">{benefit}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 슬림멜팅주사 (바디) */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
                    <h5 className="text-xl font-display font-medium text-slate-900 mb-6 text-center">
                      {getSelectedProcedure().bodyInjection?.title}
                    </h5>
                    
                    {/* 바디 시술 부위 */}
                    <div className="mb-8">
                      <h6 className="text-lg font-display font-medium text-slate-900 mb-6">집중 시술 부위</h6>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {getSelectedProcedure().bodyInjection?.targetAreas?.map((area, i) => (
                          <div key={i} className="text-center p-6 bg-white rounded-2xl border border-purple-200">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h6 className="text-lg font-display font-medium text-slate-900 mb-3">{area.area}</h6>
                            <p className="text-sm text-slate-600 font-elegant-sans">{area.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 바디 시술 특징 */}
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6">
                      <h6 className="text-lg font-display font-medium text-white mb-6">슬림멜팅주사의 특별함</h6>
                      <div className="space-y-3">
                        {getSelectedProcedure().bodyInjection?.benefits?.map((benefit, i) => (
                          <div key={i} className="flex items-start">
                            <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p className="text-white font-elegant-sans text-sm leading-relaxed">{benefit}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedProcedure === 'violet-injection' && (
                <div className="space-y-8">
                  {/* 브이올렛 헤드라인 */}
                  <div className="text-center bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8">
                    <h5 className="text-2xl font-display font-bold text-violet-800 mb-2">{getSelectedProcedure().tagline}</h5>
                    <p className="text-lg text-violet-600 font-elegant-sans mb-4">{getSelectedProcedure().subtitle2}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {getSelectedProcedure().tags?.map((tag, i) => (
                        <span key={i} className="text-sm bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-elegant-sans">#{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* 시술 정보 */}
                  <div className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-2xl p-6">
                    <h5 className="text-lg font-display font-medium text-slate-900 mb-4">Treatment Information</h5>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <Clock className="w-10 h-10 text-violet-600 mx-auto mb-2" />
                        <p className="text-sm font-elegant-sans text-slate-700 mb-1">시술 시간</p>
                        <p className="text-lg font-bold text-slate-900">{getSelectedProcedure().procedureInfo?.duration}</p>
                      </div>
                      <div className="text-center">
                        <Target className="w-10 h-10 text-violet-600 mx-auto mb-2" />
                        <p className="text-sm font-elegant-sans text-slate-700 mb-1">시술 권장 주기</p>
                        <p className="text-lg font-bold text-slate-900">{getSelectedProcedure().procedureInfo?.cycle}</p>
                      </div>
                      <div className="text-center">
                        <Star className="w-10 h-10 text-violet-600 mx-auto mb-2" />
                        <p className="text-sm font-elegant-sans text-slate-700 mb-1">권장횟수</p>
                        <p className="text-lg font-bold text-slate-900">{getSelectedProcedure().procedureInfo?.sessions}</p>
                      </div>
                    </div>
                  </div>

                  {/* Key Points */}
                  <div>
                    <h5 className="text-lg font-display font-medium text-slate-900 mb-6">Key Points</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {getSelectedProcedure().keyPoints?.map((point, i) => (
                        <div key={i} className="bg-white border-2 border-violet-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-start">
                            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                              <span className="text-white font-bold text-sm">{i + 1}</span>
                            </div>
                            <div className="flex-grow">
                              <h6 className="text-sm font-display font-bold text-violet-600 mb-2">{point.title}</h6>
                              <p className="text-sm text-slate-700 font-elegant-sans leading-relaxed">{point.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 시술 특징 */}
                  <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl p-6">
                    <h5 className="text-lg font-display font-medium text-white mb-2">{getSelectedProcedure().description2}</h5>
                    <div className="flex flex-wrap gap-3 mt-4">
                      {getSelectedProcedure().features?.map((feature, i) => (
                        <span key={i} className="text-sm bg-white/20 text-white px-3 py-1 rounded-full font-elegant-sans border border-white/30">#{feature}</span>
                      ))}
                    </div>
                  </div>

                  {/* 주의사항 */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6">
                    <h5 className="text-lg font-display font-medium text-slate-900 mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-orange-600" />
                      시술 후 주의사항
                    </h5>
                    <div className="space-y-3">
                      {getSelectedProcedure().precautions?.map((precaution, i) => (
                        <div key={i} className="flex items-start p-3 bg-white/80 rounded-xl">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-sm text-slate-700 font-elegant-sans leading-relaxed">{precaution}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ 섹션 */}
      <div className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-light text-slate-900 mb-4">
              자주 묻는 질문
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-teal-smoke-200/30 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-teal-smoke-50 transition-colors"
                >
                  <span className="font-display font-medium text-slate-900">
                    Q. {faq.question}
                  </span>
                  <ChevronRight className={`w-5 h-5 text-teal-smoke-600 transition-transform ${
                    expandedFaq === index ? 'rotate-90' : ''
                  }`} />
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 pb-5 pt-0 border-t border-teal-smoke-200/30">
                    <p className="text-slate-600 font-elegant-sans leading-relaxed pt-4">
                      A. {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 상담 신청 섹션 */}
      <StandardConsultationSection 
        title="쁘띠 리프팅 맞춤 상담"
        description="전문 의료진과 함께 나만의 맞춤형 시술 계획을 수립하세요"
        initialProcedureId="petit-lifting"
      />
    </PageLayout>
  );
}