'use client';

import { useState } from 'react';
import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
import { Clock, Shield, Star, ShoppingCart, Check, User } from 'lucide-react';

// 안면리프팅 데이터
const faceLiftingProcedures = [
  { 
    id: '01', 
    name: '풀 페이스 리프팅', 
    description: '전체 얼굴의 처진 피부와 근육을 종합적으로 개선하는 수술',
    duration: '3-4시간',
    features: ['전체개선', '지속적효과', '자연스러운결과']
  },
  { 
    id: '02', 
    name: '미드 페이스 리프팅', 
    description: '중안면부 처짐과 팔자주름을 집중적으로 개선하는 시술',
    duration: '2-3시간',
    features: ['중안면집중', '팔자주름개선', '볼륨복원']
  },
  { 
    id: '03', 
    name: '로우 페이스 리프팅', 
    description: '하안면과 목 라인을 개선하여 갸름한 V라인 완성',
    duration: '2-3시간',
    features: ['하안면개선', 'V라인완성', '목라인정리']
  },
  { 
    id: '04', 
    name: '내시경 안면리프팅', 
    description: '내시경을 이용한 최소절개 안면리프팅',
    duration: '1-2시간',
    features: ['최소절개', '빠른회복', '흉터최소화']
  }
];

const faceLiftingBenefits = [
  {
    number: '01',
    title: '근본적 개선',
    description: '피부와 근막층까지 종합적으로 개선하여 오래 지속되는 효과'
  },
  {
    number: '02',
    title: '자연스러운 결과',
    description: '개인의 얼굴 특징을 살린 자연스럽고 조화로운 개선'
  },
  {
    number: '03',
    title: '전문적 기술',
    description: '풍부한 경험과 전문적 기술로 안전하고 확실한 결과'
  },
  {
    number: '04',
    title: '맞춤형 설계',
    description: '개인별 얼굴 구조와 노화 정도에 맞는 맞춤형 수술 계획'
  }
];

export default function FaceLiftingPage() {
  const [addedToCart, setAddedToCart] = useState<string[]>([]);
  const [selectedProcedure, setSelectedProcedure] = useState<string>('01');

  const handleAddToCart = (procedureId: string, procedureName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!addedToCart.includes(procedureId)) {
      setAddedToCart([...addedToCart, procedureId]);
      console.log(`Added to cart: 안면리프팅 - ${procedureName}`);
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
            <div className="inline-flex items-center px-6 py-3 glass-effect rounded-full text-sm font-elegant-sans font-medium mb-8 shadow-lg">
              <User className="w-4 h-4 mr-2" />
              FACE LIFTING
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-light mb-6 tracking-wide leading-tight">
              안면리프팅
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light max-w-4xl mx-auto leading-relaxed text-white/90">
              시간이 멈춘 듯한 젊고 아름다운 얼굴<br />
              근본적이고 지속적인 변화를 위한<br />
              <span className="font-medium">프리미엄 안면리프팅</span>
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
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-teal-smoke-50 to-white rounded-2xl flex-shrink-0 w-72 md:w-auto">
                <Clock className="w-10 h-10 text-slate-600 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-slate-600 mb-1">수술시간</h3>
                  <p className="text-cyan-800 font-elegant-sans font-medium">1-4시간</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-elegant-50 to-white rounded-2xl flex-shrink-0 w-72 md:w-auto">
                <Shield className="w-10 h-10 text-slate-700 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-slate-600 mb-1">마취방법</h3>
                  <p className="text-cyan-800 font-elegant-sans font-medium">전신마취</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-teal-smoke-50 to-white rounded-2xl flex-shrink-0 w-72 md:w-auto">
                <Star className="w-10 h-10 text-slate-600 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-slate-600 mb-1">회복기간</h3>
                  <p className="text-cyan-800 font-elegant-sans font-medium">2-3주</p>
                </div>
              </div>
            </div>
          </div>

          {/* 안면리프팅이란? */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-cyan-800 mb-8">
                안면리프팅이란?
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-12"></div>
              <p className="text-xl font-elegant-sans font-light text-slate-700 leading-relaxed max-w-5xl mx-auto">
                나이가 들면서 처진 얼굴 피부와 근육을<br />
                근본적으로 개선하여 젊고 자연스러운<br />
                <span className="font-medium text-elegant-600">아름다운 얼굴을 되찾는 수술</span>입니다.
              </p>
            </div>

            {/* 4가지 장점 */}
            <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 mb-16 pb-4">
              {faceLiftingBenefits.map((benefit, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-teal-smoke-200/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex-shrink-0 w-60 md:w-auto">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-smoke-400 to-elegant-400 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{benefit.number}</span>
                  </div>
                  <h4 className="text-lg font-elegant font-bold text-cyan-800 mb-3 leading-tight">{benefit.title}</h4>
                  <p className="text-sm font-elegant-sans font-light text-slate-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PROCEDURE 시술 섹션 */}
          <div className="py-24 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-3xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-cyan-800 mb-4">
                PROCEDURE
              </h2>
              <h3 className="text-3xl font-display font-light text-slate-700 mb-6">
                안면리프팅 수술 종류
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 px-8">
              {/* 이미지 영역 */}
              <div className="xl:col-span-3">
                <div className="relative h-[500px] bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-teal-smoke-200/50 overflow-hidden sticky top-8">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-slate-700">
                      <User className="w-24 h-24 mx-auto mb-6" />
                      <h3 className="text-2xl font-elegant font-medium mb-2">안면리프팅</h3>
                      <p className="text-lg font-elegant-sans">근본적이고 지속적인 변화</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* PROCEDURE 목록 */}
              <div className="xl:col-span-2">
                <div className="grid grid-cols-1 gap-3">
                  {faceLiftingProcedures.map((procedure) => (
                    <div
                      key={procedure.id}
                      onClick={() => setSelectedProcedure(procedure.id)}
                      className={`group cursor-pointer rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border ${
                        selectedProcedure === procedure.id 
                          ? 'bg-gradient-to-r from-teal-smoke-100 to-elegant-100 border-teal-smoke-400' 
                          : 'bg-white/60 backdrop-blur-sm border-teal-smoke-200/50 hover:border-teal-smoke-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <span className={`text-sm font-display font-light ${
                            selectedProcedure === procedure.id ? 'text-teal-smoke-600' : 'text-teal-smoke-500'
                          }`}>
                            {procedure.id}
                          </span>
                          <div className="flex-1">
                            <p className={`text-sm font-elegant font-medium transition-colors mb-1 ${
                              selectedProcedure === procedure.id 
                                ? 'text-teal-smoke-800' 
                                : 'text-teal-smoke-700 group-hover:text-teal-smoke-900'
                            }`}>
                              {procedure.name}
                            </p>
                            <p className="text-xs font-elegant-sans text-slate-600 leading-relaxed mb-2">
                              {procedure.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {procedure.features.slice(0, 2).map((feature, i) => (
                                <span key={i} className="inline-block px-2 py-0.5 bg-teal-smoke-200/50 text-teal-smoke-700 text-xs font-elegant-sans rounded-full">
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
                              : 'bg-teal-smoke-300 text-white hover:bg-teal-smoke-400 hover:shadow-lg'
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
        title="안면리프팅 상담 신청"
        description="전문 의료진과 함께 나에게 가장 적합한 안면리프팅을 찾아보세요"
        initialProcedureId="face-lifting"
      />
    </PageLayout>
  );
}