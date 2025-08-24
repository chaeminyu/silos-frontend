'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageLayout from '../../../../components/PageLayout';
import StandardConsultationSection from '../../../../components/StandardConsultationSection';
import { Sparkles, Clock, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const neckLiftingProcedures = [
  {
    id: 'custom-neck-lifting',
    title: '커스텀 넥리프팅',
    subtitle: 'CUSTOM NECK LIFTING',
    description: [
      '개인의 목 상태와 얼굴형에 맞춘 맞춤형 목 리프팅',
      '처진 목선과 이중턱을 동시에 개선하여',
      '선명하고 세련된 턱라인을 완성합니다.',
      '최소 절개로 자연스러우면서도 확실한 효과',
      '빠른 회복과 일상생활 복귀가 가능합니다.'
    ],
    features: ['맞춤형', '이중턱개선', '자연스러움'],
    duration: '45분내외',
    category: '넥리프팅'
  },
  {
    id: 'neck-wrinkles',
    title: '목주름(가로밴드/세로주름)',
    subtitle: 'NECK WRINKLES TREATMENT',
    description: [
      '목에 생긴 가로 밴드와 세로 주름을 집중 개선',
      '보톡스와 실리프팅을 조합한 복합 시술',
      '목 근육의 과도한 수축을 억제하여',
      '부드럽고 매끈한 목선을 만들어드립니다.',
      '시술 후 즉시 일상생활이 가능합니다.'
    ],
    features: ['주름집중', '복합시술', '즉시효과'],
    duration: '30분내외',
    category: '주름개선'
  }
];

export default function NeckLiftingPage() {
  const searchParams = useSearchParams();
  const { addToCart, isInCart } = useCart();
  const [activeProcedureTab, setActiveProcedureTab] = useState<string>('custom-neck-lifting');

  // Handle URL parameter for direct access to procedures
  useEffect(() => {
    const procedureParam = searchParams.get('procedure');
    if (procedureParam) {
      const validProcedure = neckLiftingProcedures.find(proc => proc.id === procedureParam);
      if (validProcedure) {
        setActiveProcedureTab(procedureParam);
        
        // PROCEDURE 섹션으로 스크롤
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
        category: '넥(Neck)리프팅'
      });
      console.log(`Added to cart: ${procedureName}`);
    }
  };

  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <div className="relative pb-16 overflow-hidden h-[500px] lg:h-[600px]">
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/images/banners/neck-lifting.jpg)',
            backgroundPosition: 'center center'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
            <div className="text-white space-y-6">
              <div className="inline-flex items-center px-6 py-3 glass-effect rounded-full text-sm font-elegant-sans font-medium mb-4 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                SILOS NECK LIFTING
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-display font-light mb-4 tracking-wide leading-tight">
                  SILOS<br />
                  <span className="text-4xl lg:text-5xl">넥리프팅</span>
                </h1>
                <div className="w-24 h-0.5 bg-white/60 rounded-full mb-4"></div>
                <p className="text-base lg:text-lg font-elegant-sans font-light leading-relaxed text-white/90">
                  처진 목선과 이중턱을 개선하여<br />
                  선명한 턱라인을 연출하는<br />
                  <span className="font-medium">실로스만의 넥리프팅 시술</span>
                </p>
              </div>
            </div>
            <div className="relative">
              {/* 오른쪽 공간은 배경 이미지가 채움 */}
            </div>
          </div>
        </div>
      </div>

      {/* 메인 섹션 */}
      <div className="relative pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">

          {/* SILOS 넥리프팅 소개 */}
          <div className="mb-20 py-8">
            <div className="bg-gradient-to-br from-teal-smoke-300 via-teal-smoke-400 to-teal-smoke-500 rounded-3xl p-12 text-white text-center shadow-2xl transform hover:scale-[1.01] transition-all duration-500">
              <h3 className="text-3xl lg:text-4xl font-display font-bold mb-6 tracking-wide">
                SILOS 넥리프팅
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-white/40 via-white/80 to-white/40 rounded-full mx-auto mb-8"></div>
              <p className="text-lg lg:text-xl font-elegant-sans font-medium max-w-4xl mx-auto leading-relaxed">
                처진 목선과 이중턱을 동시에 개선<br />
                <span className="text-xl lg:text-2xl font-bold text-yellow-300 mt-3 block">
                  선명하고 아름다운 턱라인을 완성하는 넥리프팅
                </span>
              </p>
            </div>
          </div>

          {/* CASE 섹션 */}
          <div className="bg-gradient-to-br from-teal-smoke-300 to-teal-smoke-400 rounded-3xl p-12 text-white shadow-2xl mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-display font-light mb-4">CASE</h3>
              <h4 className="text-2xl font-elegant font-light mb-6">넥리프팅이 필요한 경우</h4>
              <div className="w-20 h-0.5 bg-white/60 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  case: 'CASE 01',
                  title: '이중턱이 생겨\n목라인이 흐릿한 경우'
                },
                {
                  case: 'CASE 02', 
                  title: '목주름이 깊어져\n나이 들어 보이는 경우'
                },
                {
                  case: 'CASE 03',
                  title: '턱라인이 처져\n또렷하지 않은 경우'  
                }
              ].map((item, index) => (
                <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>
                  <h5 className="font-elegant font-medium text-sm mb-2 text-slate-600">{item.case}</h5>
                  <p className="font-elegant-sans font-light text-sm leading-relaxed whitespace-pre-line">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* PROCEDURE 섹션 - 탭 네비게이션 */}
          <div className="mb-20" data-procedure-section>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-display font-light text-cyan-800 mb-4">
                PROCEDURE
              </h3>
              <h4 className="text-2xl font-elegant font-light text-slate-700 mb-6">
                넥리프팅 시술
              </h4>
              <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto"></div>
            </div>

            {/* 탭 버튼들 */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {neckLiftingProcedures.map((procedure) => (
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
              const activeProcedure = neckLiftingProcedures.find(proc => proc.id === activeProcedureTab) || neckLiftingProcedures[0];
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
                              <p className="text-lg text-slate-700 font-elegant-sans font-light leading-relaxed">
                                {desc}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* 특징 배지들 */}
                        <div className="flex flex-wrap gap-4 mb-8">
                          {activeProcedure.features.map((feature, i) => (
                            <div key={i} className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-bold bg-gradient-to-r from-teal-smoke-100 to-elegant-100 text-cyan-800 border-2 border-teal-smoke-200 shadow-lg">
                              <Sparkles className="w-4 h-4 mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>

                        {/* 시술시간 및 카테고리 */}
                        <div className="flex items-center space-x-4">
                          <div className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-bold bg-gradient-to-r from-elegant-200 to-teal-smoke-200 text-cyan-800 border-2 border-elegant-300 shadow-lg">
                            <Clock className="w-4 h-4 mr-2" />
                            {activeProcedure.duration}
                          </div>
                          <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-elegant-sans font-bold bg-gray-200 text-slate-600 border border-gray-300">
                            {activeProcedure.category}
                          </div>
                        </div>
                      </div>

                      {/* 이미지 및 장바구니 (1/3) */}
                      <div className="flex flex-col items-center justify-between">
                        <div className="w-full h-64 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-2xl border-2 border-teal-smoke-200/30 flex items-center justify-center mb-8 shadow-lg">
                          <div className="text-center text-slate-600">
                            <Sparkles className="w-20 h-20 mx-auto mb-4" />
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

        </div>
      </div>

      {/* 상담 신청 섹션 */}
      <StandardConsultationSection
        title="넥리프팅 상담 신청"
        description="전문 의료진과 함께 나에게 가장 적합한 넥리프팅을 찾아보세요"
        initialProcedureId="silos-signature"
      />
    </PageLayout>
  );
}