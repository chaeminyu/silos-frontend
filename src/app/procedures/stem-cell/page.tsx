'use client';

import { useState } from 'react';
import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
import { Clock, Shield, Star, ShoppingCart, Check, User } from 'lucide-react';

// 줄기세포 데이터
const stemCellProcedures = [
  { 
    id: '01', 
    name: '자가 줄기세포 치료', 
    description: '본인의 줄기세포를 활용한 안전하고 효과적인 재생 치료',
    duration: '2-3시간',
    features: ['자가세포', '재생효과', '안전성']
  },
  { 
    id: '02', 
    name: '줄기세포 안티에이징', 
    description: '줄기세포를 이용한 피부 재생과 노화 방지 시술',
    duration: '1-2시간',
    features: ['피부재생', '노화방지', '자연스러움']
  },
  { 
    id: '03', 
    name: '모발 재생 치료', 
    description: '줄기세포를 활용한 모발 재생과 탈모 치료',
    duration: '2-3시간',
    features: ['모발재생', '탈모치료', '지속효과']
  },
  { 
    id: '04', 
    name: '상처 치유 촉진', 
    description: '줄기세포의 재생 능력으로 빠른 상처 회복',
    duration: '1시간',
    features: ['빠른회복', '흉터최소화', '재생촉진']
  }
];

const stemCellBenefits = [
  {
    number: '01',
    title: '자가 세포 사용',
    description: '본인의 줄기세포를 사용하여 부작용과 거부반응 최소화'
  },
  {
    number: '02',
    title: '근본적 재생',
    description: '손상된 조직의 근본적인 재생과 기능 회복'
  },
  {
    number: '03',
    title: '장기적 효과',
    description: '일회성 개선이 아닌 지속적이고 장기적인 효과'
  },
  {
    number: '04',
    title: '첨단 기술',
    description: '최신 줄기세포 기술과 의료진의 전문성으로 안전한 시술'
  }
];

export default function StemCellPage() {
  const [addedToCart, setAddedToCart] = useState<string[]>([]);
  const [selectedProcedure, setSelectedProcedure] = useState<string>('01');

  const handleAddToCart = (procedureId: string, procedureName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!addedToCart.includes(procedureId)) {
      setAddedToCart([...addedToCart, procedureId]);
      console.log(`Added to cart: 줄기세포 - ${procedureName}`);
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
              STEM CELL
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-light mb-6 tracking-wide leading-tight">
              줄기세포
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light max-w-4xl mx-auto leading-relaxed text-white/90">
              자연스러운 재생의 힘<br />
              미래 지향적인<br />
              <span className="font-medium">첨단 재생 치료</span>
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
                  <p className="text-cyan-800 font-elegant-sans font-medium">국소마취</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-cyan-50 to-white rounded-2xl flex-shrink-0 w-72 md:w-auto">
                <Star className="w-10 h-10 text-slate-600 flex-shrink-0" />
                <div>
                  <h3 className="font-elegant font-medium text-slate-600 mb-1">회복기간</h3>
                  <p className="text-cyan-800 font-elegant-sans font-medium">1-2주</p>
                </div>
              </div>
            </div>
          </div>

          {/* 줄기세포란? */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-cyan-800 mb-8">
                줄기세포 치료란?
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full mx-auto mb-12"></div>
              <p className="text-xl font-elegant-sans font-light text-slate-700 leading-relaxed max-w-5xl mx-auto">
                자가 줄기세포의 재생 능력을 활용하여<br />
                손상된 조직을 복구하고 기능을 회복하는<br />
                <span className="font-medium text-cyan-600">첨단 재생 의학 치료</span>입니다.
              </p>
            </div>

            {/* 4가지 장점 */}
            <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 mb-16 pb-4">
              {stemCellBenefits.map((benefit, index) => (
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
                줄기세포 치료 종류
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
                      <h3 className="text-2xl font-elegant font-medium mb-2">줄기세포</h3>
                      <p className="text-lg font-elegant-sans">자연스러운 재생의 힘</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* PROCEDURE 목록 */}
              <div className="xl:col-span-2">
                <div className="grid grid-cols-1 gap-3">
                  {stemCellProcedures.map((procedure) => (
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
        title="줄기세포 상담 신청"
        description="전문 의료진과 함께 나에게 가장 적합한 줄기세포 치료를 찾아보세요"
        initialProcedureId="stem-cell"
      />
    </PageLayout>
  );
}