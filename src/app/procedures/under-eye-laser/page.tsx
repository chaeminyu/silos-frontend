'use client';

import { useState } from 'react';
import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
import { Eye, Clock, ChevronRight, Check, AlertCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '../../../contexts/CartContext';

export default function UnderEyeLaserPage() {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [showFaq, setShowFaq] = useState<number | null>(null);

  const procedureId = 'under-eye-laser';
  const isAdded = isInCart(procedureId);

  const handleToggleCart = () => {
    if (isAdded) {
      removeFromCart(procedureId);
    } else {
      addToCart({
        id: procedureId,
        name: '눈밑지방 레이저',
        category: '실로스 시그니처'
      });
    }
  };

  const recommendedFor = [
    "눈 밑 지방이 튀어나오고 피부가 처져서 나이 들어 보이는 분",
    "하안검 수술이 무섭고 부담스러운 분", 
    "자연스럽고 빠른 일상 복귀를 원하시는 분",
    "다크서클이 고민이신 분"
  ];


  const targetAreas = [
    {
      title: "다크서클",
      description: "눈밑 어두운 그림자 개선"
    },
    {
      title: "눈밑지방",
      description: "튀어나온 지방 제거"
    },
    {
      title: "눈밑 피부처짐",
      description: "늘어진 피부 타이트닝"
    }
  ];

  const procedure = {
    title: "고주파 눈밑지방제거",
    steps: [
      "고주파 눈밑 지방 제거",
      "피부 진피층 자극으로 스킨 타이트닝",
      "콜라겐 재생"
    ]
  };

  const faqs = [
    {
      question: "시술은 한번이면 끝나나요?",
      answer: "1회로 끝나지만, 피부 늘어짐과 지방 양이 많은 분은 한달후 추가 시술이 필요할 수 있습니다."
    },
    {
      question: "시술 후 일상생활이 가능한가요?",
      answer: "당일 약간의 붓기가 있으나, 일상생활에는 지장이 없으며 일주일 이내 붓기가 거의 소실되기 때문에 일상생활 가능합니다."
    },
    {
      question: "시술 후 주의사항은?",
      answer: "3일간은 냉찜질 하시고, 2주정도는 눈밑 경락이나 과도한 마사지는 금지"
    }
  ];

  const notRecommendedFor = [
    "눈 밑 지방이 튀어나오고 피부가 처져서 나이 들어 보인다는 분",
    "하안검 수술이 무섭고 부담스러운 분",
    "자연스럽고 빠른 일상 복귀를 원하시는 분",
    "다크서클이 고민이신 분"
  ];

  return (
    <PageLayout>
      {/* 히어로 섹션 - 모바일 최적화 */}
      <div className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-400 via-elegant-400 to-teal-smoke-500"></div>
        
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
                <Eye className="w-4 h-4 mr-2" />
                <span>10분 눈밑지방 해결</span>
              </div>
              
              {/* 타이틀 */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-white mb-6 leading-tight">
                <span className="block">눈밑지방 레이저</span>
                <span className="text-2xl sm:text-3xl lg:text-4xl text-white/90 font-medium mt-2 block">
                  10분이면 해결
                </span>
              </h1>
              
              {/* 설명 */}
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 font-elegant-sans leading-relaxed">
                다크서클 / 눈밑지방 / 눈밑 피부처짐
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

      {/* 추천 대상 섹션 */}
      <div className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-light text-slate-900 mb-4">
              이런 분들께 추천합니다
            </h2>
            <p className="text-lg text-slate-600 font-elegant-sans">
              눈밑지방레이저로 젊고 생기있는 눈매를 되찾으세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {recommendedFor.map((item, index) => (
              <div key={index} className="flex items-start p-6 bg-gradient-to-br from-teal-smoke-50 to-elegant-50 rounded-2xl">
                <div className="flex-shrink-0 w-10 h-10 bg-teal-smoke-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  {index + 1}
                </div>
                <p className="text-slate-700 font-elegant-sans leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 주요 효과 섹션 */}
      <div className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-light text-slate-900 mb-4">
              눈밑지방 레이저의 3가지 효과
            </h2>
          </div>
          
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            {targetAreas.map((area, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Eye className="w-8 h-8 sm:w-12 sm:h-12 text-teal-smoke-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-display font-medium text-slate-900 mb-2 sm:mb-3">
                  {area.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 font-elegant-sans">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 시술 과정 섹션 */}
      <div className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-light text-slate-900 mb-4">
                시술 과정
              </h2>
              <p className="text-lg text-slate-600 font-elegant-sans">
                고주파 눈밑지방제거로 안전하고 효과적인 개선
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-teal-smoke-50 to-elegant-50 rounded-3xl p-8 sm:p-12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {procedure.steps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 bg-teal-smoke-600 text-white rounded-full flex items-center justify-center font-bold mr-6">
                      {index + 1}
                    </div>
                    <p className="text-lg text-slate-700 font-elegant-sans">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="sm:col-span-3 mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl">
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 text-teal-smoke-600 mr-2" />
                  <h4 className="text-lg font-display font-medium text-slate-900">
                    시술 시간
                  </h4>
                </div>
                <p className="text-2xl font-display font-bold text-teal-smoke-600">
                  10분 눈밑지방
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  10분이면 해결
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ 섹션 */}
      <div className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-light text-slate-900 mb-4">
              자주 묻는 질문
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setShowFaq(showFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-teal-smoke-50 transition-colors"
                >
                  <span className="font-display font-medium text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronRight className={`w-5 h-5 text-teal-smoke-600 transition-transform ${
                    showFaq === index ? 'rotate-90' : ''
                  }`} />
                </button>
                
                {showFaq === index && (
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-slate-600 font-elegant-sans leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 주의사항 섹션 */}
      <div className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 sm:p-12">
            <div className="flex items-center mb-6">
              <AlertCircle className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="text-2xl font-display font-medium text-slate-900">
                눈밑지방레이저 추천대상
              </h3>
            </div>
            
            <div className="space-y-3">
              {notRecommendedFor.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-orange-600 mr-3 mt-0.5">•</span>
                  <p className="text-slate-700 font-elegant-sans">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-white/80 backdrop-blur-sm rounded-xl">
              <p className="text-sm text-slate-600 font-elegant-sans">
                <strong className="text-orange-600">※ 참고:</strong> 지방이 너무 많으신 분은 지방제거가 필요할 수도 있습니다
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 상담 신청 섹션 */}
      <div id="consultation">
        <StandardConsultationSection 
          title="눈밑지방 레이저 상담 예약"
          description="10분 만에 맑고 생기있는 눈매로 변신하세요"
          initialProcedureId="under-eye-laser"
        />
      </div>
    </PageLayout>
  );
}