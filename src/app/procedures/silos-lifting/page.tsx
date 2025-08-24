'use client';

import { useState } from 'react';
import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
import { Clock, Shield, Star, ShoppingCart, Check, Zap } from 'lucide-react';

// 실리프팅(실로프팅) 데이터
const threadLiftingProcedures = [
  { 
    id: '01', 
    name: 'PDO 실 리프팅', 
    description: 'PDO 실을 이용한 안전하고 효과적인 리프팅 시술',
    duration: '30-60분',
    features: ['PDO실사용', '안전한재료', '자연스러운리프팅']
  },
  { 
    id: '02', 
    name: '코그 실 리프팅', 
    description: '갈고리 모양의 특수 실로 강력한 리프팅 효과',
    duration: '45-90분',
    features: ['강력한리프팅', '코그실', '지속적효과']
  },
  { 
    id: '03', 
    name: '몰딩 실 리프팅', 
    description: '자연스러운 볼륨과 리프팅을 동시에 개선',
    duration: '60-90분',
    features: ['볼륨+리프팅', '자연스러운결과', '몰딩실']
  },
  { 
    id: '04', 
    name: '바브 실 리프팅', 
    description: '가시 모양의 실로 확실한 고정력과 리프팅 효과',
    duration: '45-75분',
    features: ['확실한고정', '바브실', '즉시효과']
  }
];

const threadLiftingBenefits = [
  {
    number: '01',
    title: '비수술 리프팅',
    description: '메스 없이 실만으로 안전하게 리프팅 효과를 얻을 수 있습니다'
  },
  {
    number: '02',
    title: '즉시 효과',
    description: '시술 직후부터 바로 확인할 수 있는 리프팅 효과'
  },
  {
    number: '03',
    title: '콜라겐 생성',
    description: '실 주변으로 콜라겐이 생성되어 지속적인 탄력 개선'
  },
  {
    number: '04',
    title: '빠른 회복',
    description: '일상생활에 지장 없는 빠른 회복과 자연스러운 결과'
  }
];

export default function SilosLiftingPage() {
  const [addedToCart, setAddedToCart] = useState<string[]>([]);
  const [selectedProcedure, setSelectedProcedure] = useState<string>('01');

  const handleAddToCart = (procedureId: string, procedureName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!addedToCart.includes(procedureId)) {
      setAddedToCart([...addedToCart, procedureId]);
      console.log(`Added to cart: 실로프팅 - ${procedureName}`);
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
              <Zap className="w-4 h-4 mr-2" />
              THREAD LIFTING
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-light mb-6 tracking-wide leading-tight">
              실로프팅
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light max-w-4xl mx-auto leading-relaxed text-white/90">
              메스 없이 실만으로<br />
              즉시 확인되는 리프팅 효과<br />
              <span className="font-medium">안전하고 자연스러운 실리프팅</span>
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
                  <h3 className="font-elegant font-medium text-slate-600 mb-1">시술시간</h3>
                  <p className="text-cyan-800 font-elegant-sans font-medium">30-90분</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-elegant-50 to-white rounded-2xl flex-shrink-0 w-72 md:w-auto">
                <Shield className="w-10 h-10 text-slate-700 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-slate-600 mb-1">마취방법</h3>
                  <p className="text-cyan-800 font-elegant-sans font-medium">국소마취</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-teal-smoke-50 to-white rounded-2xl flex-shrink-0 w-72 md:w-auto">
                <Star className="w-10 h-10 text-slate-600 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-slate-600 mb-1">회복기간</h3>
                  <p className="text-cyan-800 font-elegant-sans font-medium">일상생활 바로가능</p>
                </div>
              </div>
            </div>
          </div>

          {/* 실로프팅이란? */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-cyan-800 mb-8">
                실로프팅이란?
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-12"></div>
              <p className="text-xl font-elegant-sans font-light text-slate-700 leading-relaxed max-w-5xl mx-auto">
                특수 실을 피부 아래에 삽입하여<br />
                처진 부위를 끌어올리고 고정하는<br />
                <span className="font-medium text-elegant-600">비수술 리프팅 시술</span>입니다.
              </p>
            </div>

            {/* 4가지 장점 */}
            <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 mb-16 pb-4">
              {threadLiftingBenefits.map((benefit, index) => (
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
                실로프팅 시술 종류
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 px-8">
              {/* 이미지 영역 */}
              <div className="xl:col-span-3">
                <div className="relative h-[500px] bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-teal-smoke-200/50 overflow-hidden sticky top-8">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-slate-700">
                      <Zap className="w-24 h-24 mx-auto mb-6" />
                      <h3 className="text-2xl font-elegant font-medium mb-2">실로프팅</h3>
                      <p className="text-lg font-elegant-sans">메스 없는 리프팅</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* PROCEDURE 목록 */}
              <div className="xl:col-span-2">
                <div className="grid grid-cols-1 gap-3">
                  {threadLiftingProcedures.map((procedure) => (
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
        title="실로프팅 상담 신청"
        description="전문 의료진과 함께 나에게 가장 적합한 실로프팅을 찾아보세요"
        initialProcedureId="silos-lifting"
      />
    </PageLayout>
  );
}