'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
import { Clock, Shield, Star, ChevronDown, ChevronUp, ShoppingCart, Check, Eye, Users, Sparkles } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const eyelidProcedures = [
  {
    id: 'upper-blepharoplasty',
    title: '실로스 상안검',
    subtitle: 'SILOS UPPER BLEPHAROPLASTY',
    description: [
      '처진 윗눈꺼풀을 자연스럽게 개선하여',
      '젊고 또렷한 눈매를 만들어드립니다.',
      '개인의 눈 모양과 피부 두께를 고려한',
      '맞춤형 수술 계획으로 자연스러운 결과',
      '숙련된 의료진의 정밀한 수술 기법'
    ],
    features: ['자연스러운결과', '빠른회복', '맞춤수술'],
    duration: '약 1시간',
    category: '상안검'
  },
  {
    id: 'dual-upper-blepharoplasty',
    title: '실로스 듀얼 상안검',
    subtitle: 'SILOS DUAL UPPER BLEPHAROPLASTY',
    description: [
      '상안검 수술과 쌍꺼풀 수술을 동시에 진행',
      '처진 눈꺼풀 개선과 함께 아름다운 쌍꺼풀 라인',
      '한 번의 수술로 두 가지 효과를 얻는 효율적인 방법',
      '자연스러운 쌍꺼풀과 젊은 눈매를 동시에',
      '개인의 눈 구조에 맞는 최적의 디자인'
    ],
    features: ['동시수술', '효율적', '자연스러운라인'],
    duration: '약 1시간 30분',
    category: '상안검+쌍꺼풀'
  },
  {
    id: 'brow-incision',
    title: '실로스 눈썹하 절개',
    subtitle: 'SILOS BROW INCISION',
    description: [
      '눈썹 아래 절개를 통한 자연스러운 리프팅',
      '흉터가 눈썹에 가려져 거의 보이지 않음',
      '처진 눈꺼풀과 이마 주름을 함께 개선',
      '피부가 두껍거나 처짐이 심한 경우에 효과적',
      '자연스러운 눈매 개선과 젊어 보이는 효과'
    ],
    features: ['흉터최소화', '동시개선', '효과적'],
    duration: '약 1시간 30분',
    category: '눈썹절개'
  },
  {
    id: 'lower-blepharoplasty',
    title: '실로스 하안검',
    subtitle: 'SILOS LOWER BLEPHAROPLASTY',
    description: [
      '늘어진 아래 눈꺼풀과 눈밑 지방을 개선',
      '다크서클과 눈밑 주름을 동시에 해결',
      '피곤해 보이는 인상을 젊고 밝게 변화',
      '자연스러운 눈매로 전체적인 인상 개선',
      '정밀한 수술 기법으로 안전하고 확실한 결과'
    ],
    features: ['다크서클개선', '주름완화', '밝은인상'],
    duration: '약 1시간',
    category: '하안검'
  }
];

const procedureSteps = [
  {
    step: '01',
    title: '눈썹밑선을따라절개합니다.',
    description: '정밀한 절개선 설계로 자연스러운 결과'
  },
  {
    step: '02', 
    title: '피부절제후처지지않도록고정합니다.',
    description: '적절한 피부 제거와 안전한 고정'
  },
  {
    step: '03',
    title: '절개선을꼼꼼히봉합합니다.',
    description: '미세 봉합으로 흉터 최소화'
  }
];

const surgeryInfo = {
  duration: '약 1시간',
  anesthesia: '단기수면마취',
  hospitalization: '없음',
  stitchRemoval: '5~7일 후',
  recovery: '실밥제거 후 일상생활 가능'
};

const benefits = [
  {
    number: '01',
    title: '가려졌던 시야 확보',
    description: '처진 눈꺼풀로 인해 가려진 시야가 개선됩니다'
  },
  {
    number: '02',
    title: '자연스러운 동안 효과',
    description: '젊고 또렷한 눈매로 전체적인 인상이 젊어집니다'
  },
  {
    number: '03',
    title: '이마 주름 방지',
    description: '눈을 뜨기 위해 이마를 치켜올리는 습관이 개선됩니다'
  },
  {
    number: '04',
    title: '눈의 기능적인 문제 해결',
    description: '속눈썹이 눈을 찌르는 문제가 해결됩니다'
  }
];

const cases = [
  {
    number: '01',
    title: '처진 눈꺼풀로 나이 들어보이는 경우'
  },
  {
    number: '02',
    title: '항상 피곤해 보이는 경우'
  },
  {
    number: '03',
    title: '눈꺼풀이 눈을 가리는 경우'
  },
  {
    number: '04',
    title: '속눈썹이 눈을 찌르는 경우'
  },
  {
    number: '05',
    title: '쌍꺼풀 시술 외 처진 피부를 개선하고 싶은 경우'
  }
];

const faqData = [
  {
    question: '부기는 어느정도 가나요?',
    answer: '눈 수술은 수술방법에 따라 부기 차이가 있고, 개인의 차이에 따라 부기의 차이가 달라집니다. 매몰법의 경우 부기가 적은 편이며, 절개법의 경우 부기가 오래가는 편이라, 수술 후 3일간은 냉찜질을 통해 부기를 관리 해주셔야하며, 3일 후부터는 온찜질을 통해 부기를 빼주셔야 합니다. 부기가 빠지는 시기는 개인의 차이에 따라 다르지만 보통 부기는 1~3개월 정도에는 부기가 자연스럽게 빠집니다.'
  },
  {
    question: '실밥은 언제 푸나요?',
    answer: '실밥제거의 경우에는 수술 후 보통 1주일 정도면 상처가 아물기 때문에 1주일 이내로 방문하셔서 실밥제거를 하시면 됩니다.'
  },
  {
    question: '운동은 언제부터 가능한가요?',
    answer: '눈 수술 후 운동은 실밥제거 후 1주일 이후로부터 가능합니다.'
  },
  {
    question: '사우나는 언제부터 갈 수 있나요?',
    answer: '수술 부위는 상처가 뜨거운 열기에 노출 될 경우, 가벼운 화상을 수술 자국의 붉은 기운이 오래 갈 수 있기 때문에, 직접적으로 뜨거운 열기에 노출되는 것은 피하시는 것이 좋습니다. 사우나 및 찜질방은 수술 후 1개월 후에 이용해주시는 것이 좋습니다.'
  },
  {
    question: '수술 후 양쪽 모양이 다른듯한데...같아지는거죠?',
    answer: '눈 수술의 경우 1~3개월 정도에 부기가 빠지기 때문에 모양은 부기가 빠지면서 같아집니다.'
  }
];

export default function EyelidLiftingPage() {
  const searchParams = useSearchParams();
  const { addToCart, isInCart } = useCart();
  const [activeProcedureTab, setActiveProcedureTab] = useState<string>('upper-blepharoplasty');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Handle URL parameter for direct access to procedures
  useEffect(() => {
    const procedureParam = searchParams.get('procedure');
    if (procedureParam) {
      const validProcedure = eyelidProcedures.find(proc => proc.id === procedureParam);
      if (validProcedure) {
        setActiveProcedureTab(procedureParam);
        
        setTimeout(() => {
          const procedureSection = document.querySelector('[data-procedure-section]');
          if (procedureSection) {
            procedureSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, [searchParams]);

  const handleAddToCart = (procedureId: string, procedureName: string) => {
    if (!isInCart(procedureId)) {
      addToCart({
        id: procedureId,
        name: procedureName,
        category: '눈꺼풀 처짐 리프팅'
      });
      console.log(`Added to cart: ${procedureName}`);
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <div className="relative pb-16 overflow-hidden h-[400px] lg:h-[480px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/procedures/droopy-eye-lifting/eyelid-hero.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-smoke-400/50 via-elegant-400/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
            <div className="text-white space-y-6">
              <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-elegant-sans font-medium mb-4 border border-white/30">
                <Eye className="w-4 h-4 mr-2" />
                SILOS EYELID LIFTING
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-display font-light mb-4 tracking-wide leading-tight">
                  실로스 처진눈리프팅<br />
                  <span className="text-4xl lg:text-5xl">눈꺼풀 처짐 리프팅</span>
                </h1>
                <div className="w-24 h-0.5 bg-white/60 rounded-full mb-4"></div>
                <p className="text-base lg:text-lg font-elegant-sans font-light leading-relaxed text-white/90">
                  개성과 보편적인 아름다움<br />
                  그 사이의 균형을 찾아가는 과정입니다.<br />
                  <span className="font-medium">눈은 첫인상을 결정하는 중요한 부분에 손꼽힙니다. 실로스는 개인이 가지고 있는 얼굴의 밸런스와 피부타입이 다른 점을 고려하여 개성을 살리고 자연스러운 조화를 만들어냅니다.</span>
                </p>
              </div>
            </div>
            <div className="relative">
              {/* 오른쪽 공간은 배경 이미지가 채움 */}
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">

          {/* 눈썹 거상술 설명 텍스트 */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <p className="text-lg lg:text-xl font-elegant-sans font-light text-slate-600 leading-relaxed max-w-5xl mx-auto">
                눈썹 거상술은 눈썹 위 혹은 아래 부분을 절개하여 처진 피부를 당겨주어 주름을 개선하는 수술법으로<br />
                절개 부위가 눈썹이기 때문에 피부가 두껍고 단단한 경우에도 시술이 가능합니다.
              </p>
            </div>

            {/* 눈썹 거상술 설명 이미지 */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-3xl p-8 shadow-xl">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <img 
                    src="/images/procedures/droopy-eye-lifting/brow-lift-explanation.jpg" 
                    alt="눈썹 거상술 설명"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 눈꺼풀 처짐이 필요한 경우 */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h3 className="text-3xl lg:text-4xl font-display font-light text-slate-800 mb-6">
                <span className="font-medium">상안검/하안검,</span> <span className="text-slate-600">누구에게 필요할까?</span>
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-8"></div>
            </div>

            <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-2 lg:grid-cols-5 md:gap-6 mb-16 pb-4">
              {cases.map((item, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-teal-smoke-200/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex-shrink-0 w-60 md:w-auto">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-smoke-400 to-elegant-400 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{item.number}</span>
                  </div>
                  <p className="text-sm font-elegant-sans font-medium text-slate-600 leading-relaxed">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* 수술 관련 정보 */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-display font-light text-slate-800 mb-6">
                <span className="font-medium">상안검/하안검</span> <span className="text-slate-600">수술 관련 정보</span>
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto"></div>
            </div>

            <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-5 md:gap-6 max-w-4xl mx-auto pb-4">
              <div className="text-center p-6 bg-gradient-to-br from-white to-teal-smoke-50 rounded-2xl shadow-lg border border-teal-smoke-200/30 flex-shrink-0 w-48 md:w-auto">
                <Clock className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h4 className="font-elegant font-bold text-slate-800 mb-2">수술시간</h4>
                <p className="text-sm text-slate-600">{surgeryInfo.duration}</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-white to-elegant-50 rounded-2xl shadow-lg border border-elegant-200/30 flex-shrink-0 w-48 md:w-auto">
                <Shield className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h4 className="font-elegant font-bold text-slate-800 mb-2">마취방법</h4>
                <p className="text-sm text-slate-600">{surgeryInfo.anesthesia}</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-white to-teal-smoke-50 rounded-2xl shadow-lg border border-teal-smoke-200/30 flex-shrink-0 w-48 md:w-auto">
                <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h4 className="font-elegant font-bold text-slate-800 mb-2">입원치료</h4>
                <p className="text-sm text-slate-600">{surgeryInfo.hospitalization}</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-white to-elegant-50 rounded-2xl shadow-lg border border-elegant-200/30 flex-shrink-0 w-48 md:w-auto">
                <Star className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h4 className="font-elegant font-bold text-slate-800 mb-2">실밥제거</h4>
                <p className="text-sm text-slate-600">{surgeryInfo.stitchRemoval}</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-white to-teal-smoke-50 rounded-2xl shadow-lg border border-teal-smoke-200/30 flex-shrink-0 w-48 md:w-auto">
                <Check className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h4 className="font-elegant font-bold text-slate-800 mb-2">회복과정</h4>
                <p className="text-sm text-slate-600">{surgeryInfo.recovery}</p>
              </div>
            </div>
          </div>

          {/* 실로스만의 상안검/하안검 */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-display font-light text-slate-800 mb-6">
                실로스만의 <span className="font-medium text-slate-700">상안검/하안검</span>
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-8"></div>
            </div>

            {/* 실로스만의 상안검/하안검 4개 이미지 */}
            <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 pb-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-2xl p-4 shadow-xl flex-shrink-0 w-72 md:w-auto">
                  <div className="bg-white rounded-xl overflow-hidden mb-4">
                    <img 
                      src={`/images/procedures/droopy-eye-lifting/benefit-${index + 1}.jpg`}
                      alt={benefit.title}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-elegant-400 to-teal-smoke-400 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-base">{benefit.number}</span>
                    </div>
                    <h4 className="font-elegant font-bold text-slate-800 mb-2 text-lg">
                      {benefit.title}
                    </h4>
                    <p className="text-sm font-elegant-sans text-slate-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 수술 과정 */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-display font-light text-slate-800 mb-6">
                <span className="font-medium">상안검/하안검</span> <span className="text-slate-600">수술 과정</span>
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-8"></div>
            </div>

            <div className="max-w-5xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-3xl p-8 shadow-xl">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <img 
                    src="/images/procedures/droopy-eye-lifting/eyelid-process.jpg" 
                    alt="상안검/하안검 수술 과정"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-3 md:gap-8 pb-4">
              {procedureSteps.map((step, index) => (
                <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg border border-teal-smoke-200/30 flex-shrink-0 w-72 md:w-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">{step.step}</span>
                  </div>
                  <h4 className="font-elegant font-bold text-slate-800 mb-4 text-lg">
                    {step.title}
                  </h4>
                  <p className="text-sm font-elegant-sans text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* PROCEDURE 섹션 - 탭 네비게이션 */}
          <div className="mb-20" data-procedure-section>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-display font-light text-slate-800 mb-4">
                PROCEDURE
              </h3>
              <h4 className="text-2xl font-elegant font-light text-slate-700 mb-6">
                눈꺼풀 처짐 리프팅 시술
              </h4>
              <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto"></div>
            </div>

            {/* 탭 버튼들 */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-6xl mx-auto">
              {eyelidProcedures.map((procedure) => (
                <button
                  key={procedure.id}
                  onClick={() => setActiveProcedureTab(procedure.id)}
                  className={`px-6 py-3 rounded-xl font-elegant-sans font-medium transition-all duration-300 text-sm ${
                    activeProcedureTab === procedure.id
                      ? 'bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white shadow-lg'
                      : 'bg-white text-slate-700 border-2 border-teal-smoke-200 hover:border-teal-smoke-300 hover:bg-teal-smoke-50'
                  }`}
                >
                  {procedure.title}
                </button>
              ))}
            </div>

            {/* 선택된 시술 상세 정보 */}
            {(() => {
              const activeProcedure = eyelidProcedures.find(proc => proc.id === activeProcedureTab) || eyelidProcedures[0];
              return (
                <div className="bg-white rounded-3xl shadow-2xl border border-teal-smoke-200/30 overflow-hidden">
                  {/* 헤더 */}
                  <div className="bg-gradient-to-r from-teal-smoke-500 to-elegant-500 py-12 px-8 text-center">
                    <h3 className="text-4xl font-display font-light text-white mb-4 tracking-wide">
                      {activeProcedure.title}
                    </h3>
                    <p className="text-xl font-elegant-sans font-light text-white/90">
                      {activeProcedure.subtitle}
                    </p>
                  </div>

                  {/* 콘텐츠 */}
                  <div className="p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      {/* 설명 (2/3) */}
                      <div className="lg:col-span-2">
                        <div className="space-y-6 mb-10">
                          {activeProcedure.description.map((desc, i) => (
                            <div key={i} className="flex items-start space-x-4">
                              <div className="w-2 h-2 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mt-3 flex-shrink-0"></div>
                              <p className="text-lg text-slate-600 font-elegant-sans font-light leading-relaxed">
                                {desc}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* 특징 배지들 */}
                        <div className="flex flex-wrap gap-4 mb-8">
                          {activeProcedure.features.map((feature, i) => (
                            <div key={i} className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-bold bg-gradient-to-r from-teal-smoke-100 to-elegant-100 text-slate-700 border-2 border-teal-smoke-200 shadow-lg">
                              <Sparkles className="w-4 h-4 mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>

                        {/* 시술시간 및 카테고리 */}
                        <div className="flex items-center space-x-4">
                          <div className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-bold bg-gradient-to-r from-elegant-200 to-teal-smoke-200 text-slate-700 border-2 border-elegant-300 shadow-lg">
                            <Clock className="w-4 h-4 mr-2" />
                            {activeProcedure.duration}
                          </div>
                          <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-elegant-sans font-bold bg-gray-200 text-slate-800 border border-gray-300">
                            {activeProcedure.category}
                          </div>
                        </div>
                      </div>

                      {/* 이미지 및 장바구니 (1/3) */}
                      <div className="flex flex-col items-center justify-between">
                        <div className="w-full h-64 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-2xl border-2 border-teal-smoke-200/30 flex items-center justify-center mb-8 shadow-lg">
                          <div className="text-center text-slate-700">
                            <Eye className="w-20 h-20 mx-auto mb-4 text-slate-600" />
                            <p className="font-elegant-sans font-medium">
                              {activeProcedure.title}
                            </p>
                          </div>
                        </div>

                        {/* 장바구니 버튼 */}
                        <button
                          onClick={() => handleAddToCart(activeProcedure.id, activeProcedure.title)}
                          className={`w-full py-4 px-6 rounded-xl font-elegant-sans font-bold text-base transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                            isInCart(activeProcedure.id)
                              ? 'bg-gradient-to-r from-green-200 to-green-300 text-green-800 cursor-default border-2 border-green-400'
                              : 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white hover:from-teal-smoke-500 hover:to-elegant-500 border-2 border-transparent'
                          }`}
                          disabled={isInCart(activeProcedure.id)}
                        >
                          {isInCart(activeProcedure.id) ? (
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
                </div>
              );
            })()}
          </div>

          {/* FAQ 섹션 */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-display font-light text-slate-800 mb-6">
                FAQ
              </h3>
              <h4 className="text-2xl font-elegant font-light text-slate-700 mb-6">
                처진눈리프팅 자주 묻는 질문
              </h4>
              <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto"></div>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-teal-smoke-200/30 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-teal-smoke-50/50 transition-all duration-300"
                  >
                    <span className="font-elegant-sans font-bold text-slate-800 text-lg">
                      Q. {faq.question}
                    </span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-6 h-6 text-slate-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-slate-600 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-8 pb-6 border-t border-teal-smoke-200/30">
                      <p className="font-elegant-sans text-slate-600 leading-relaxed pt-4">
                        A. {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 상담 신청 섹션 */}
      <StandardConsultationSection
        title="눈꺼풀 처짐 리프팅 상담 신청"
        description="전문 의료진과 함께 나에게 가장 적합한 처진눈리프팅을 찾아보세요"
        initialProcedureId="droopy-eye-lifting"
      />
    </PageLayout>
  );
}