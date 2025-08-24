'use client';

import { useState } from 'react';
import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
import { Clock, Shield, Star, ShoppingCart, Check, Heart } from 'lucide-react';

// 미니리프팅 데이터
const miniLiftingProcedures = [
  { 
    id: '01', 
    name: '미니 페이스 리프팅', 
    description: '최소 절개로 얼굴 하반부와 목 라인을 개선하는 수술',
    duration: '1-2시간',
    features: ['최소절개', '빠른회복', '자연스러운개선']
  },
  { 
    id: '02', 
    name: '미니 목 리프팅', 
    description: '이중턱과 목 주름을 집중적으로 개선하는 시술',
    duration: '1시간',
    features: ['목라인개선', '이중턱제거', '간편수술']
  },
  { 
    id: '03', 
    name: '미니 브로우 리프팅', 
    description: '처진 눈썹과 이마 주름을 자연스럽게 개선',
    duration: '1시간',
    features: ['눈썹리프팅', '이마주름개선', '자연스러운결과']
  },
  { 
    id: '04', 
    name: '미니 턱라인 리프팅', 
    description: '턱라인을 선명하게 만들어 갸름한 V라인 완성',
    duration: '1시간',
    features: ['턱라인정리', 'V라인완성', '선명한윤곽']
  }
];

const miniLiftingBenefits = [
  {
    number: '01',
    title: '최소 절개',
    description: '작은 절개로 흉터 부담을 줄이고 자연스러운 결과 완성'
  },
  {
    number: '02',
    title: '빠른 회복',
    description: '수술 범위가 작아 회복 기간이 짧고 일상 복귀가 빠름'
  },
  {
    number: '03',
    title: '부담 없는 수술',
    description: '전신마취 없이도 가능한 부담 적은 수술 방법'
  },
  {
    number: '04',
    title: '자연스러운 변화',
    description: '과하지 않은 자연스러운 개선으로 만족도 높은 결과'
  }
];

export default function MiniLiftingPage() {
  const [addedToCart, setAddedToCart] = useState<string[]>([]);
  const [selectedProcedure, setSelectedProcedure] = useState<string>('01');

  const handleAddToCart = (procedureId: string, procedureName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!addedToCart.includes(procedureId)) {
      setAddedToCart([...addedToCart, procedureId]);
      console.log(`Added to cart: 미니리프팅 - ${procedureName}`);
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
              <Heart className="w-4 h-4 mr-2" />
              MINI LIFTING
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-light mb-6 tracking-wide leading-tight">
              미니리프팅
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light max-w-4xl mx-auto leading-relaxed text-white/90">
              부담 없이 자연스럽게<br />
              작은 변화로 큰 만족을 주는<br />
              <span className="font-medium">스마트 미니리프팅</span>
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
                  <p className="text-cyan-800 font-elegant-sans font-medium">1-2시간</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-elegant-50 to-white rounded-2xl flex-shrink-0 w-72 md:w-auto">
                <Shield className="w-10 h-10 text-slate-700 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-slate-600 mb-1">마취방법</h3>
                  <p className="text-cyan-800 font-elegant-sans font-medium">국소마취 또는 수면마취</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-teal-smoke-50 to-white rounded-2xl flex-shrink-0 w-72 md:w-auto">
                <Star className="w-10 h-10 text-slate-600 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-slate-600 mb-1">회복기간</h3>
                  <p className="text-cyan-800 font-elegant-sans font-medium">1-2주</p>
                </div>
              </div>
            </div>
          </div>

          {/* 미니리프팅이란? */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-cyan-800 mb-8">
                미니리프팅이란?
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-12"></div>
              <p className="text-xl font-elegant-sans font-light text-slate-700 leading-relaxed max-w-5xl mx-auto">
                최소한의 절개로 최대한의 효과를<br />
                부담 없이 자연스럽게 개선하는<br />
                <span className="font-medium text-elegant-600">스마트한 리프팅 솔루션</span>입니다.
              </p>
            </div>

            {/* 4가지 장점 */}
            <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 mb-16 pb-4">
              {miniLiftingBenefits.map((benefit, index) => (
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
                미니리프팅 수술 종류
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 px-8">
              {/* 이미지 영역 */}
              <div className="xl:col-span-3">
                <div className="relative h-[500px] bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-teal-smoke-200/50 overflow-hidden sticky top-8">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-slate-700">
                      <Heart className="w-24 h-24 mx-auto mb-6" />
                      <h3 className="text-2xl font-elegant font-medium mb-2">미니리프팅</h3>
                      <p className="text-lg font-elegant-sans">부담 없는 자연스러운 변화</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* PROCEDURE 목록 */}
              <div className="xl:col-span-2">
                <div className="grid grid-cols-1 gap-3">
                  {miniLiftingProcedures.map((procedure) => (
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
        title="미니리프팅 상담 신청"
        description="전문 의료진과 함께 나에게 가장 적합한 미니리프팅을 찾아보세요"
        initialProcedureId="mini-lifting"
      />
    </PageLayout>
  );
}