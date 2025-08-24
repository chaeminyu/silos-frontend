'use client';

import { useState } from 'react';
import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
import { Clock, Shield, Star, ShoppingCart, Check, User } from 'lucide-react';

// 피부올인원 데이터
const skinAllInOneProcedures = [
  { 
    id: '01', 
    name: '토탈 스킨 케어', 
    description: '모든 피부 고민을 한번에 해결하는 종합 관리',
    duration: '2-3시간',
    features: ['종합관리', '맞춤시술', '즉시효과']
  },
  { 
    id: '02', 
    name: '안티에이징 패키지', 
    description: '주름과 탄력 개선을 위한 복합 시술',
    duration: '1-2시간',
    features: ['주름개선', '탄력강화', '젊은피부']
  },
  { 
    id: '03', 
    name: '미백 브라이트닝', 
    description: '색소침착과 기미를 집중 개선하는 시술',
    duration: '1-2시간',
    features: ['미백효과', '색소개선', '균일한톤']
  },
  { 
    id: '04', 
    name: '모공 타이트닝', 
    description: '확장된 모공과 피지분비 개선 프로그램',
    duration: '1시간',
    features: ['모공축소', '피지조절', '매끄러운피부']
  }
];

const skinAllInOneBenefits = [
  {
    number: '01',
    title: '원스톱 솔루션',
    description: '다양한 피부 고민을 한 번에 해결하는 통합 솔루션'
  },
  {
    number: '02',
    title: '개인 맞춤형',
    description: '개인의 피부 타입과 고민에 맞춘 맞춤형 시술 계획'
  },
  {
    number: '03',
    title: '시너지 효과',
    description: '여러 시술의 조합으로 극대화되는 개선 효과'
  },
  {
    number: '04',
    title: '지속적 관리',
    description: '일회성이 아닌 지속적인 피부 건강 관리 시스템'
  }
];

export default function SkinAllInOnePage() {
  const [addedToCart, setAddedToCart] = useState<string[]>([]);
  const [selectedProcedure, setSelectedProcedure] = useState<string>('01');

  const handleAddToCart = (procedureId: string, procedureName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!addedToCart.includes(procedureId)) {
      setAddedToCart([...addedToCart, procedureId]);
      console.log(`Added to cart: 피부올인원 - ${procedureName}`);
    }
  };

  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <div className="relative pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-800 via-cyan-700 to-cyan-900"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-6 py-3 glass-effect rounded-full text-sm font-elegant-sans font-medium mb-8 shadow-lg">
              <User className="w-4 h-4 mr-2" />
              SKIN ALL-IN-ONE
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-light mb-6 tracking-wide leading-tight">
              피부올인원
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light max-w-4xl mx-auto leading-relaxed text-white/90">
              모든 피부 고민을 한번에<br />
              완벽하고 통합적인<br />
              <span className="font-medium">토탈 스킨 솔루션</span>
            </p>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative -mt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 시술 정보 카드 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-16">
            <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-3 md:gap-6 pb-4">
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-cyan-50 to-white rounded-2xl flex-shrink-0 w-72 md:w-auto">
                <Clock className="w-10 h-10 text-slate-600 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-slate-600 mb-1">시술시간</h3>
                  <p className="text-cyan-800 font-elegant-sans font-medium">1-3시간</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-cyan-50 to-white rounded-2xl flex-shrink-0 w-72 md:w-auto">
                <Shield className="w-10 h-10 text-slate-700 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-slate-600 mb-1">마취방법</h3>
                  <p className="text-cyan-800 font-elegant-sans font-medium">표면마취</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-cyan-50 to-white rounded-2xl flex-shrink-0 w-72 md:w-auto">
                <Star className="w-10 h-10 text-slate-600 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-slate-600 mb-1">회복기간</h3>
                  <p className="text-cyan-800 font-elegant-sans font-medium">3-7일</p>
                </div>
              </div>
            </div>
          </div>

          {/* 피부올인원이란? */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-cyan-800 mb-8">
                피부올인원이란?
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full mx-auto mb-12"></div>
              <p className="text-xl font-elegant-sans font-light text-slate-700 leading-relaxed max-w-5xl mx-auto">
                주름, 색소침착, 모공, 탄력 등<br />
                다양한 피부 고민을 한번에 해결하는<br />
                <span className="font-medium text-cyan-600">통합 피부 관리 프로그램</span>입니다.
              </p>
            </div>

            {/* 4가지 장점 */}
            <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 mb-16 pb-4">
              {skinAllInOneBenefits.map((benefit, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-cyan-200/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex-shrink-0 w-60 md:w-auto">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-cyan-400 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{benefit.number}</span>
                  </div>
                  <h4 className="text-lg font-elegant font-bold text-cyan-800 mb-3 leading-tight">{benefit.title}</h4>
                  <p className="text-sm font-elegant-sans font-light text-slate-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PROCEDURE 시술 섹션 */}
          <div className="py-24 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-3xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-cyan-800 mb-4">
                PROCEDURE
              </h2>
              <h3 className="text-3xl font-display font-light text-slate-700 mb-6">
                피부올인원 시술 종류
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 px-8">
              {/* 이미지 영역 */}
              <div className="xl:col-span-3">
                <div className="relative h-[500px] bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-cyan-200/50 overflow-hidden sticky top-8">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-slate-700">
                      <User className="w-24 h-24 mx-auto mb-6" />
                      <h3 className="text-2xl font-elegant font-medium mb-2">피부올인원</h3>
                      <p className="text-lg font-elegant-sans">완벽한 토탈 스킨 솔루션</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* PROCEDURE 목록 */}
              <div className="xl:col-span-2">
                <div className="grid grid-cols-1 gap-3">
                  {skinAllInOneProcedures.map((procedure) => (
                    <div
                      key={procedure.id}
                      onClick={() => setSelectedProcedure(procedure.id)}
                      className={`group cursor-pointer rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border ${
                        selectedProcedure === procedure.id 
                          ? 'bg-gradient-to-r from-cyan-100 to-cyan-50 border-cyan-400' 
                          : 'bg-white/60 backdrop-blur-sm border-cyan-200/50 hover:border-cyan-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <span className={`text-sm font-display font-light ${
                            selectedProcedure === procedure.id ? 'text-cyan-600' : 'text-cyan-500'
                          }`}>
                            {procedure.id}
                          </span>
                          <div className="flex-1">
                            <p className={`text-sm font-elegant font-medium transition-colors mb-1 ${
                              selectedProcedure === procedure.id 
                                ? 'text-cyan-800' 
                                : 'text-cyan-700 group-hover:text-cyan-900'
                            }`}>
                              {procedure.name}
                            </p>
                            <p className="text-xs font-elegant-sans text-slate-600 leading-relaxed mb-2">
                              {procedure.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {procedure.features.slice(0, 2).map((feature, i) => (
                                <span key={i} className="inline-block px-2 py-0.5 bg-cyan-200/50 text-cyan-700 text-xs font-elegant-sans rounded-full">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={(e) => handleAddToCart(procedure.id, procedure.name, e)}
                          className={`px-2 py-1 rounded-md font-elegant-sans text-xs transition-all duration-300 flex items-center space-x-1 ${
                            addedToCart.includes(procedure.id)
                              ? 'bg-green-100 text-green-700 cursor-default'
                              : 'bg-cyan-600 text-white hover:bg-cyan-700 hover:shadow-lg'
                          }`}
                          disabled={addedToCart.includes(procedure.id)}
                        >
                          {addedToCart.includes(procedure.id) ? (
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

        </div>
      </div>

      {/* 표준화된 상담 섹션 */}
      <StandardConsultationSection
        title="피부올인원 상담 신청"
        description="전문 의료진과 함께 나에게 가장 적합한 피부 솔루션을 찾아보세요"
        initialProcedureId="skin-all-in-one"
      />
    </PageLayout>
  );
}