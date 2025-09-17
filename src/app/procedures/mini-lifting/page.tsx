'use client';

import { useState } from 'react';
import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
import { Clock, Shield, Star, ShoppingCart, Check, Heart } from 'lucide-react';
import { useCart } from '../../../contexts/CartContext';

// 실로퀵미니거상 데이터
const silosQuickMiniLifting = {
  title: '실로퀵미니거상',
  subtitle: '약 1cm 미만 작은 절개, 특수 코그실 사용하여 피부와 근막 이중 리프팅',
  mainFeature: {
    title: '피부와 근막을 동시에',
    description: 'SILOS만의 고민별 절개 디자인과 근막을 연결하는 특수 코그실을 사용하여 피부와 근막을 동시에 당기는 기술을 사용합니다.',
    recommendation: '기존 실리프팅 시술 후 안면 비대칭, 살이 찝히는 느낌 등 일상생활에 있어 불편한 느낌이 있었던 부들에서 강력 추천합니다.'
  },
  keyBenefit: '0.5cm 미만 작은 절개 후 녹는 실로 피부 고정, 중안부를 당겨주어 흉터와 회복 걱정 없이 빠른 효과!',
  procedureInfo: {
    duration: '1-1.5시간',
    anesthesia: '국소마취 + 수면마취',
    recovery: '1주',
    incisionSize: '0.5-1cm 미만'
  }
};

const miniLiftingBenefits = [
  {
    number: '01',
    title: '최소 절개',
    description: '0.5cm 미만 미세 절개로 흉터 걱정 ZERO! 완벽한 자연미 완성'
  },
  {
    number: '02',
    title: '빠른 회복',
    description: '단 1주 만에 일상복귀! 바쁜 일상에도 부담 없는 스마트 케어'
  },
  {
    number: '03',
    title: '부담 없는 수술',
    description: '전신마취 NO! 국소+수면마취로 안전하고 편안한 시술'
  },
  {
    number: '04',
    title: '즉시 효과',
    description: '시술 직후부터 느낄 수 있는 눈에 띄는 리프팅 효과!'
  }
];

// 미니리프팅 시술 종류
const miniLiftingProcedures = [
  {
    id: '01',
    name: '실로퀵미니거상',
    description: silosQuickMiniLifting.subtitle,
    features: [
      '0.5cm 미만 절개',
      '특수 코그실 사용',
      '피부+근막 이중 리프팅',
      '빠른 회복'
    ],
    duration: silosQuickMiniLifting.procedureInfo.duration,
    anesthesia: silosQuickMiniLifting.procedureInfo.anesthesia,
    recovery: silosQuickMiniLifting.procedureInfo.recovery
  }
];

export default function MiniLiftingPage() {
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
        category: '미니리프팅'
      });
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
              흉터 걱정 없는 0.5cm 미세 절개<br />
              단 1주 만에 완성되는 완벽한 리프팅<br />
              <span className="font-medium">실로퀵 미니거상의 혁신</span>
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
                  <p className="text-cyan-800 font-elegant-sans font-medium">{silosQuickMiniLifting.procedureInfo.duration}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-elegant-50 to-white rounded-2xl flex-shrink-0 w-72 md:w-auto">
                <Shield className="w-10 h-10 text-slate-700 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-slate-600 mb-1">마취방법</h3>
                  <p className="text-cyan-800 font-elegant-sans font-medium">{silosQuickMiniLifting.procedureInfo.anesthesia}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-teal-smoke-50 to-white rounded-2xl flex-shrink-0 w-72 md:w-auto">
                <Star className="w-10 h-10 text-slate-600 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-slate-600 mb-1">회복기간</h3>
                  <p className="text-cyan-800 font-elegant-sans font-medium">{silosQuickMiniLifting.procedureInfo.recovery}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 실로퀵미니거상이란? */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-cyan-800 mb-8">
                {silosQuickMiniLifting.title}
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-12"></div>
              <p className="text-xl font-elegant-sans font-light text-slate-700 leading-relaxed max-w-5xl mx-auto">
                {silosQuickMiniLifting.subtitle}
              </p>
            </div>
            
            {/* 메인 특징 섹션 */}
            <div className="bg-gradient-to-br from-teal-smoke-50 to-white rounded-3xl p-8 mb-12 shadow-lg border border-teal-smoke-200/30">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-display font-bold text-cyan-800 mb-4">
                  {silosQuickMiniLifting.mainFeature.title}
                </h3>
                <p className="text-lg font-elegant-sans text-slate-700 leading-relaxed mb-6">
                  {silosQuickMiniLifting.mainFeature.description}
                </p>
                <div className="bg-gradient-to-r from-cyan-50 to-teal-smoke-50 border border-cyan-200 rounded-2xl p-6">
                  <p className="text-base font-elegant-sans font-semibold text-cyan-800 leading-relaxed">
                    💡 {silosQuickMiniLifting.mainFeature.recommendation}
                  </p>
                </div>
              </div>
            </div>
            
            {/* 핵심 혜택 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-teal-smoke-200/30 mb-12">
              <div className="text-center">
                <h3 className="text-xl font-display font-bold text-cyan-800 mb-4">핵심 혜택</h3>
                <p className="text-lg font-elegant-sans text-slate-700 leading-relaxed">
                  {silosQuickMiniLifting.keyBenefit}
                </p>
              </div>
            </div>

            {/* 4가지 장점 + 친근한 여성 이미지 */}
            <div className="mb-16">
              {/* 모바일: 이미지 + 4개 카드 패턴 */}
              <div className="block lg:hidden">
                {/* 상단: 여성 이미지 */}
                <div className="relative h-64 bg-gradient-to-br from-teal-smoke-50 to-white rounded-3xl shadow-lg border border-teal-smoke-200/30 overflow-hidden mb-6">
                  <img 
                    src="/images/procedures/mini-lifting/friendly-lady.png" 
                    alt="전문의 상담 - 친근한 전문의"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full bg-gradient-to-br from-teal-smoke-100 to-elegant-100 items-center justify-center">
                    <div className="text-center text-slate-700">
                      <Heart className="w-16 h-16 mx-auto mb-4 text-teal-smoke-400" />
                      <h3 className="text-lg font-elegant font-medium mb-1">전문의 상담</h3>
                      <p className="text-sm font-elegant-sans">친근한 전문의와 함께</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                    <h3 className="text-white text-lg font-elegant font-bold mb-1">전문의 1:1 상담</h3>
                    <p className="text-white/90 text-xs font-elegant-sans">나에게 딱 맞는 맞춤 시술 방법을 전문의와 함께 찾아보세요</p>
                  </div>
                </div>
                
                {/* 하단: 4개 장점 카드들 */}
                <div className="grid grid-cols-2 gap-4">
                  {miniLiftingBenefits.map((benefit, index) => (
                    <div key={index} className="text-center p-4 bg-white rounded-2xl shadow-lg border border-teal-smoke-200/30 hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-smoke-400 to-elegant-400 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">{benefit.number}</span>
                      </div>
                      <h4 className="text-sm font-elegant font-bold text-cyan-800 mb-2 leading-tight">{benefit.title}</h4>
                      <p className="text-xs font-elegant-sans font-light text-slate-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 데스크탑: 기존 레이아웃 */}
              <div className="hidden lg:grid lg:grid-cols-3 gap-8">
                {/* 왼쪽: 4가지 장점 박스들 */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-2 gap-4">
                    {miniLiftingBenefits.map((benefit, index) => (
                      <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-teal-smoke-200/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-smoke-400 to-elegant-400 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">{benefit.number}</span>
                        </div>
                        <h4 className="text-lg font-elegant font-bold text-cyan-800 mb-3 leading-tight">{benefit.title}</h4>
                        <p className="text-sm font-elegant-sans font-light text-slate-600 leading-relaxed">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 오른쪽: 친근한 여성 이미지 */}
                <div className="lg:col-span-1">
                  <div className="relative h-full min-h-[400px] bg-gradient-to-br from-teal-smoke-50 to-white rounded-3xl shadow-lg border border-teal-smoke-200/30 overflow-hidden">
                    <img 
                      src="/images/procedures/mini-lifting/friendly-lady.png" 
                      alt="전문의 상담 - 친근한 전문의"
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full bg-gradient-to-br from-teal-smoke-100 to-elegant-100 items-center justify-center">
                      <div className="text-center text-slate-700">
                        <Heart className="w-24 h-24 mx-auto mb-6 text-teal-smoke-400" />
                        <h3 className="text-2xl font-elegant font-medium mb-2">전문의 상담</h3>
                        <p className="text-lg font-elegant-sans">친근한 전문의와 함께</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6">
                      <h3 className="text-white text-xl font-elegant font-bold mb-2">전문의 1:1 상담</h3>
                      <p className="text-white/90 text-sm font-elegant-sans">나에게 딱 맞는 맞춤 시술 방법을<br/>전문의와 함께 찾아보세요</p>
                    </div>
                  </div>
                </div>
              </div>
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
                <div className="relative rounded-3xl overflow-hidden sticky top-8">
                  {/* 시술 부위 다이어그램 이미지 */}
                  <div className="flex items-center justify-center">
                    <img 
                      src="/images/procedures/mini-lifting/mini-lifting-silos-quick.png" 
                      alt="실로퀵미니거상 시술 부위 다이어그램"
                      className="max-w-full max-h-full object-contain rounded-3xl"
                      onError={(e) => {
                        // 이미지가 없을 경우 fallback
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden items-center justify-center h-64 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-3xl w-full shadow-xl border border-teal-smoke-200/50">
                      <div className="text-center text-slate-700">
                        <Heart className="w-24 h-24 mx-auto mb-6 text-teal-smoke-400" />
                        <h3 className="text-2xl font-elegant font-medium mb-2">{silosQuickMiniLifting.title}</h3>
                        <p className="text-lg font-elegant-sans">시술 부위 다이어그램</p>
                      </div>
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
        title={`${silosQuickMiniLifting.title} 상담 신청`}
        description={`전문 의료진과 함께 나에게 가장 적합한 ${silosQuickMiniLifting.title}을 찾아보세요`}
        initialProcedureId="mini-lifting"
      />
    </PageLayout>
  );
}