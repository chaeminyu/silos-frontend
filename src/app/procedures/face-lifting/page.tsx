'use client';

import { useState } from 'react';
import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
import { Clock, Shield, Star, ShoppingCart, Check, User, Sparkles } from 'lucide-react';
import { useCart } from '../../../contexts/CartContext';

// SMAS 미니거상 데이터
const smasMiniFaceLift = {
  title: 'SMAS 미니거상',
  subtitle: '시간을 거스르는 마법같은 효과',
  subTitle2: '미니볼거상술 (효과는 UP! 부담은 DOWN!)',
  keyBenefit: '3cm 최소 절개로 눈에 띄는 흉터없이 얼굴지방흡입 + 리프팅 두가지 효과',
  targetAudience: '턱선이 많이 처지지 않고 볼처짐으로 인한 옅은 팔자주름이 고민인 분들에게 중안면부에 효과적인 리프팅 수술 방법',
  hiddenIncision: {
    title: '히든절개의 마법',
    description: '구레나룻 부근 작은 "히든절개"로 중안부를 넓게 잡아주어, 팔자주름, 처진 광대라인 개선, 불필요한 얼굴 지방 흡입.'
  },
  procedureInfo: {
    duration: '2-3시간',
    anesthesia: '전신마취',
    recovery: '1-2주',
    incisionSize: '3cm 미만'
  }
};

// 안면리프팅 시술 종류
const faceLiftingProcedures = [
  { 
    id: '01', 
    name: 'SMAS 미니거상', 
    description: smasMiniFaceLift.keyBenefit,
    duration: smasMiniFaceLift.procedureInfo.duration,
    features: ['3cm 최소절개', '지방흡입+리프팅', '히든절개', '즉시효과']
  },
  { 
    id: '02', 
    name: '풀 페이스 리프팅', 
    description: '전체 얼굴의 처진 피부와 근육을 종합적으로 개선하는 수술',
    duration: '3-4시간',
    features: ['전체개선', '지속적효과', '자연스러운결과']
  },
  { 
    id: '03', 
    name: '미드 페이스 리프팅', 
    description: '중안면부 처짐과 팔자주름을 집중적으로 개선하는 시술',
    duration: '2-3시간',
    features: ['중안면집중', '팔자주름개선', '볼륨복원']
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
    title: '마법같은 변화',
    description: '3cm 히든절개로 10년 젊어지는 놀라운 리프팅 효과!'
  },
  {
    number: '02',
    title: '2 IN 1 시너지',
    description: '지방흡입 + 리프팅 동시 진행으로 극대화된 V라인 완성'
  },
  {
    number: '03',
    title: '흉터 ZERO',
    description: '구레나룻 히든절개로 흉터 걱정 없는 완벽한 자연미'
  },
  {
    number: '04',
    title: '즉시 만족',
    description: '시술 직후부터 확인되는 극적인 얼굴라인 변화'
  }
];

export default function FaceLiftingPage() {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [selectedProcedure, setSelectedProcedure] = useState<string>('01');

  const handleToggleCart = (procedureId: string, procedureName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (isInCart(procedureId)) {
      removeFromCart(procedureId);
    } else {
      addToCart({
        id: procedureId,
        name: procedureName,
        category: '안면리프팅'
      });
    }
  };

  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <div className="relative pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-elegant-400 via-teal-smoke-400 to-elegant-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-6 py-3 glass-effect rounded-full text-sm font-elegant-sans font-medium mb-8 shadow-lg">
              <User className="w-4 h-4 mr-2" />
              FACE LIFTING
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-light mb-6 tracking-wide leading-tight">
              {smasMiniFaceLift.title}
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light max-w-4xl mx-auto leading-relaxed text-white/90">
              {smasMiniFaceLift.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative -mt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 핵심 혜택 섹션 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 mb-24">
            <div className="text-center">
              <h3 className="text-4xl lg:text-5xl font-display font-light text-gray-800 mb-6">미니볼거상술</h3>
              <div className="inline-flex items-center px-8 py-3 glass-effect rounded-full text-lg font-elegant-sans font-medium shadow-lg border border-white/30">
                <Sparkles className="w-5 h-5 mr-3 text-elegant-500" />
                <span className="text-gray-700">효과는 UP! 부담은 DOWN!</span>
              </div>
            </div>
          </div>

          {/* SMAS 미니거상이란? */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-800 mb-8">
                {smasMiniFaceLift.title}이란?
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-12"></div>
              <p className="text-xl font-elegant-sans font-light text-slate-700 leading-relaxed max-w-5xl mx-auto">
                {smasMiniFaceLift.targetAudience}
              </p>
            </div>
            
            {/* 히든절개 섹션 - 이미지 왼쪽, 텍스트 오른쪽 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* 왼쪽: 이미지 */}
              <div className="relative flex justify-center items-center">
                <div className="relative w-80 h-56 overflow-hidden shadow-2xl" style={{
                  borderRadius: '50%/40%',
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
                }}>
                  <img 
                    src="/images/procedures/face-lifting/smas-model.png" 
                    alt="SMAS 미니거상 모델 - 히든절개 부위"
                    className="w-full h-full object-cover"
                    style={{
                      borderRadius: '50%/40%'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden items-center justify-center w-full h-full bg-gradient-to-br from-teal-smoke-100 to-elegant-100">
                    <div className="text-center text-slate-700">
                      <Sparkles className="w-16 h-16 mx-auto mb-4 text-teal-smoke-400" />
                      <h3 className="text-xl font-elegant font-medium mb-2">히든절개</h3>
                      <p className="text-sm font-elegant-sans">SMAS 미니거상 모델</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 오른쪽: 텍스트 */}
              <div className="flex flex-col justify-center">
                <div className="bg-gradient-to-br from-cyan-50 to-teal-smoke-50 rounded-3xl p-8 shadow-lg border border-cyan-200">
                  <h3 className="text-3xl font-display font-bold text-cyan-800 mb-6">
                    <Sparkles className="w-8 h-8 inline-block mr-3 text-yellow-500" />
                    {smasMiniFaceLift.hiddenIncision.title}
                  </h3>
                  <p className="text-lg font-elegant-sans text-slate-700 leading-relaxed mb-6">
                    {smasMiniFaceLift.hiddenIncision.description}
                  </p>
                  <div className="bg-white/80 rounded-2xl p-4 border border-cyan-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span className="text-sm font-elegant font-semibold text-cyan-800">팔자주름 개선</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span className="text-sm font-elegant font-semibold text-cyan-800">처진 광대라인 개선</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span className="text-sm font-elegant font-semibold text-cyan-800">불필요한 얼굴 지방 흡입</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4가지 장점 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {faceLiftingBenefits.map((benefit, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-teal-smoke-200/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
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
                SMAS 안면리프팅 수술 종류
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 px-8">
              {/* 이미지 영역 */}
              <div className="xl:col-span-3">
                <div className="relative rounded-3xl overflow-hidden sticky top-8">
                  <div className="flex items-center justify-center">
                    <img 
                      src="/images/procedures/face-lifting/smas-procedure.png" 
                      alt="SMAS 미니거상 시술 과정"
                      className="max-w-full max-h-full object-contain rounded-3xl"
                      onError={(e) => {
                        // 이미지가 없을 경우 fallback
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden items-center justify-center h-96 bg-gradient-to-br from-elegant-50 to-teal-smoke-50 rounded-3xl shadow-xl border border-elegant-200 w-full">
                      <div className="text-center text-slate-700">
                        <Sparkles className="w-24 h-24 mx-auto mb-6 text-elegant-400" />
                        <h3 className="text-3xl font-elegant font-bold mb-2 text-slate-800">{smasMiniFaceLift.title}</h3>
                        <p className="text-lg font-elegant-sans mb-4 text-slate-600">{smasMiniFaceLift.subtitle}</p>
                        <div className="bg-white/80 rounded-xl p-4 border border-elegant-100">
                          <p className="text-sm font-elegant-sans font-medium text-slate-700">{smasMiniFaceLift.subTitle2}</p>
                        </div>
                      </div>
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
                            selectedProcedure === procedure.id ? 'text-cyan-800' : 'text-cyan-700'
                          }`}>
                            {procedure.id}
                          </span>
                          <div className="flex-1">
                            <p className={`text-sm font-elegant font-medium transition-colors mb-1 ${
                              selectedProcedure === procedure.id 
                                ? 'text-cyan-900' 
                                : 'text-cyan-800 group-hover:text-cyan-900'
                            }`}>
                              {procedure.name}
                            </p>
                            <p className="text-xs font-elegant-sans text-slate-700 leading-relaxed mb-2">
                              {procedure.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {procedure.features.slice(0, 2).map((feature, i) => (
                                <span key={i} className="inline-block px-2 py-0.5 bg-cyan-100 text-cyan-800 text-xs font-elegant-sans rounded-full">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={(e) => handleToggleCart(procedure.id, procedure.name, e)}
                          className={`px-2 py-1 rounded-md font-elegant-sans text-xs transition-all duration-300 flex items-center space-x-1 ${
                            isInCart(procedure.id)
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-cyan-500 text-white hover:bg-cyan-600 hover:shadow-lg'
                          }`}
                        >
                          {isInCart(procedure.id) ? (
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
        title={`${smasMiniFaceLift.title} 상담 신청`}
        description={`전문 의료진과 함께 나에게 가장 적합한 ${smasMiniFaceLift.title}을 찾아보세요`}
        initialProcedureId="face-lifting"
      />
    </PageLayout>
  );
}