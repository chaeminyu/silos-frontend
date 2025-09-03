'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
import { Eye, Clock, Shield, Star, ChevronDown, ChevronUp, ShoppingCart, Check, Sparkles } from 'lucide-react';

const underEyeProcedures = [
  {
    id: 'under-eye-fat-laser',
    title: '반달레이저 (눈밑지방레이저)',
    subtitle: 'UNDER EYE FAT LASER',
    description: [
      '눈밑 지방을 단순히 제거하는 것이 아니라',
      '레이저를 활용해 피부절개없이 지방을 녹이거나 재배치',
      '자연스럽게 눈 밑을 평탄하게 만드는 시술',
      '레이저가 피부 아래 콜라겐 생성을 촉진하여',
      '눈밑 피부 탄력을 개선하는 이중 효과'
    ],
    features: ['비절개', '콜라겐생성', '자연스러운결과'],
    duration: '30분내외',
    category: '눈밑레이저'
  },
  {
    id: 'dark-circle-laser',
    title: '다크서클 레이저',
    subtitle: 'DARK CIRCLE LASER',
    description: [
      '색소침착으로 인한 다크서클을 개선하는 전용 레이저',
      '혈관성 다크서클과 색소성 다크서클 모두 치료',
      '눈가 주변 혈액순환을 개선하여 근본적 해결',
      '섬세한 눈가 피부에 안전한 레이저 에너지 적용',
      '점진적이고 자연스러운 개선 효과'
    ],
    features: ['색소개선', '혈액순환개선', '안전한에너지'],
    duration: '20분내외',
    category: '다크서클'
  }
];

const benefits = [
  {
    number: '01',
    title: '비절개 시술',
    description: '피부 절개 없이 레이저만으로 시술하여 흉터 걱정이 없습니다'
  },
  {
    number: '02',
    title: '빠른 회복',
    description: '수술 대비 통증과 부기가 적어 일상생활 복귀가 빠릅니다'
  },
  {
    number: '03',
    title: '이중 효과',
    description: '지방 개선과 콜라겐 생성으로 탄력까지 동시에 개선됩니다'
  },
  {
    number: '04',
    title: '자연스러운 결과',
    description: '지방을 재배치하여 과도하지 않은 자연스러운 개선 효과'
  }
];

const treatmentProcess = [
  {
    step: '01',
    title: '정밀 진단 및 디자인',
    description: '개인의 눈밑 지방 분포와 피부 상태를 정밀 분석'
  },
  {
    step: '02',
    title: '마취 및 레이저 조사',
    description: '국소 마취 후 정확한 부위에 레이저 에너지 조사'
  },
  {
    step: '03',
    title: '지방 재배치 및 마무리',
    description: '녹은 지방을 자연스럽게 재배치하고 마무리 케어'
  }
];

const beforeAfterCare = {
  before: [
    '시술 전 충분한 상담과 검진',
    '혈액순환 개선을 위한 금연, 금주',
    '아스피린 등 혈액순환 약물 중단',
    '충분한 수분 섭취'
  ],
  after: [
    '시술 후 2-3일간 냉찜질',
    '일주일간 사우나, 찜질방 금지',
    '자외선 차단제 필수 사용',
    '충분한 수면과 휴식'
  ]
};

const faqData = [
  {
    question: '시술 후 언제부터 일상생활이 가능한가요?',
    answer: '시술 직후부터 일상생활이 가능합니다. 다만 심한 운동이나 사우나는 일주일 정도 피해주시는 것이 좋습니다.'
  },
  {
    question: '효과는 언제부터 나타나나요?',
    answer: '시술 후 2-3일부터 붓기가 빠지면서 효과가 나타나기 시작하며, 2-3주 후 가장 자연스러운 결과를 확인하실 수 있습니다.'
  },
  {
    question: '부작용이나 위험성은 없나요?',
    answer: '비절개 레이저 시술로 기존 수술 대비 부작용 위험이 현저히 낮습니다. 일시적인 붓기나 멍은 자연스럽게 사라집니다.'
  },
  {
    question: '몇 번 정도 시술받아야 하나요?',
    answer: '개인의 상태에 따라 다르지만, 대부분 1-2회 시술로 만족스러운 결과를 얻으실 수 있습니다.'
  }
];

export default function UnderEyeLaserPage() {
  const searchParams = useSearchParams();
  const [activeProcedureTab, setActiveProcedureTab] = useState<string>('under-eye-fat-laser');
  const [addedToCart, setAddedToCart] = useState<string[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Handle URL parameter for direct access to procedures
  useEffect(() => {
    const procedureParam = searchParams.get('procedure');
    if (procedureParam) {
      const validProcedure = underEyeProcedures.find(proc => proc.id === procedureParam);
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
    if (!addedToCart.includes(procedureId)) {
      setAddedToCart([...addedToCart, procedureId]);
      console.log(`Added to cart: ${procedureName}`);
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
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
              <Eye className="w-4 h-4 mr-2" />
              UNDER EYE LASER
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-light mb-6 tracking-wide leading-tight">
              눈밑지방 레이저
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light max-w-4xl mx-auto leading-relaxed text-white/90">
              비절개 레이저로 눈밑 지방을 개선하고<br />
              콜라겐 생성까지 촉진하는<br />
              <span className="font-medium">안전하고 자연스러운 눈가 개선술</span>
            </p>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">

          {/* 시술 정보 카드 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-16">
            <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-3 md:gap-6 pb-4">
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-teal-smoke-50 to-white rounded-2xl flex-shrink-0 w-72 md:w-auto">
                <Clock className="w-10 h-10 text-slate-600 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-slate-600 mb-1">시술시간</h3>
                  <p className="text-teal-smoke-800 font-elegant-sans font-medium">20-30분내외</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-elegant-50 to-white rounded-2xl flex-shrink-0 w-72 md:w-auto">
                <Shield className="w-10 h-10 text-slate-700 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-slate-600 mb-1">마취방법</h3>
                  <p className="text-teal-smoke-800 font-elegant-sans font-medium">국소마취</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-teal-smoke-50 to-white rounded-2xl flex-shrink-0 w-72 md:w-auto">
                <Star className="w-10 h-10 text-slate-600 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-slate-600 mb-1">회복기간</h3>
                  <p className="text-teal-smoke-800 font-elegant-sans font-medium">일상생활 바로가능</p>
                </div>
              </div>
            </div>
          </div>

          {/* 시술 특징 */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h3 className="text-3xl lg:text-4xl font-display font-light text-teal-smoke-800 mb-6">
                눈밑지방 레이저의 <span className="text-slate-700">특별한 점</span>
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-8"></div>
              <p className="text-lg font-elegant-sans font-light text-slate-600 leading-relaxed max-w-4xl mx-auto">
                수술이 아닌 레이저로 눈밑 지방을 개선하고<br />
                동시에 피부 탄력까지 향상시키는 혁신적인 시술입니다
              </p>
            </div>

            <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 pb-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-teal-smoke-200/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex-shrink-0 w-60 md:w-auto">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-smoke-400 to-elegant-400 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{benefit.number}</span>
                  </div>
                  <h4 className="text-lg font-elegant font-bold text-teal-smoke-800 mb-3">
                    {benefit.title}
                  </h4>
                  <p className="text-sm font-elegant-sans text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 시술 과정 */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-display font-light text-teal-smoke-800 mb-6">
                시술 <span className="text-slate-700">과정</span>
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto"></div>
            </div>

            <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-3 md:gap-8 pb-4">
              {treatmentProcess.map((step, index) => (
                <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg border border-teal-smoke-200/30 flex-shrink-0 w-72 md:w-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">{step.step}</span>
                  </div>
                  <h4 className="font-elegant font-bold text-teal-smoke-800 mb-4 text-lg">
                    {step.title}
                  </h4>
                  <p className="text-sm font-elegant-sans text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 주의사항 */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-display font-light text-teal-smoke-800 mb-6">
                시술 전후 <span className="text-slate-700">주의사항</span>
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-smoke-200/30">
                <h4 className="text-xl font-elegant font-bold text-teal-smoke-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">전</span>
                  </div>
                  시술 전 주의사항
                </h4>
                <div className="space-y-3">
                  {beforeAfterCare.before.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-slate-600 font-elegant-sans">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-smoke-200/30">
                <h4 className="text-xl font-elegant font-bold text-teal-smoke-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">후</span>
                  </div>
                  시술 후 주의사항
                </h4>
                <div className="space-y-3">
                  {beforeAfterCare.after.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-slate-600 font-elegant-sans">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PROCEDURE 섹션 */}
          <div className="mb-20" data-procedure-section>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-display font-light text-teal-smoke-800 mb-4">
                PROCEDURE
              </h3>
              <h4 className="text-2xl font-elegant font-light text-slate-700 mb-6">
                눈밑지방 레이저 시술
              </h4>
              <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto"></div>
            </div>

            {/* 탭 버튼들 */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto">
              {underEyeProcedures.map((procedure) => (
                <button
                  key={procedure.id}
                  onClick={() => setActiveProcedureTab(procedure.id)}
                  className={`px-6 py-3 rounded-xl font-elegant-sans font-medium transition-all duration-300 text-sm ${
                    activeProcedureTab === procedure.id
                      ? 'bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white shadow-lg'
                      : 'bg-white text-slate-600 border-2 border-teal-smoke-200 hover:border-teal-smoke-300 hover:bg-teal-smoke-50'
                  }`}
                >
                  {procedure.title}
                </button>
              ))}
            </div>

            {/* 선택된 시술 상세 정보 */}
            {(() => {
              const activeProcedure = underEyeProcedures.find(proc => proc.id === activeProcedureTab) || underEyeProcedures[0];
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
                            <div key={i} className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-bold bg-gradient-to-r from-teal-smoke-100 to-elegant-100 text-teal-smoke-800 border-2 border-teal-smoke-200 shadow-lg">
                              <Sparkles className="w-4 h-4 mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>

                        {/* 시술시간 및 카테고리 */}
                        <div className="flex items-center space-x-4">
                          <div className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-bold bg-gradient-to-r from-elegant-200 to-teal-smoke-200 text-teal-smoke-800 border-2 border-elegant-300 shadow-lg">
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
                            <Eye className="w-20 h-20 mx-auto mb-4" />
                            <p className="font-elegant-sans font-medium">
                              {activeProcedure.title}
                            </p>
                          </div>
                        </div>

                        {/* 장바구니 버튼 */}
                        <button
                          onClick={() => handleAddToCart(activeProcedure.id, activeProcedure.title)}
                          className={`w-full py-4 px-6 rounded-xl font-elegant-sans font-bold text-base transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                            addedToCart.includes(activeProcedure.id)
                              ? 'bg-gradient-to-r from-green-200 to-green-300 text-green-800 cursor-default border-2 border-green-400'
                              : 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white hover:from-teal-smoke-500 hover:to-elegant-500 border-2 border-transparent'
                          }`}
                          disabled={addedToCart.includes(activeProcedure.id)}
                        >
                          {addedToCart.includes(activeProcedure.id) ? (
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
              <h3 className="text-3xl font-display font-light text-teal-smoke-800 mb-6">
                FAQ
              </h3>
              <h4 className="text-2xl font-elegant font-light text-slate-700 mb-6">
                자주 묻는 질문
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
                    <span className="font-elegant-sans font-bold text-teal-smoke-800 text-lg">
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
        title="눈밑지방 레이저 상담 신청"
        description="전문 의료진과 함께 나에게 가장 적합한 눈밑 개선술을 찾아보세요"
        initialProcedureId="silos-signature"
      />
    </PageLayout>
  );
}