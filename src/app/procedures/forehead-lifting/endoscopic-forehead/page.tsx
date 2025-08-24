'use client';

import PageLayout from '../../../../components/PageLayout';
import StandardConsultationSection from '../../../../components/StandardConsultationSection';
import { Sparkles, Clock, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function EndoscopicForeheadPage() {
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = () => {
    if (!isInCart('endoscopic-forehead')) {
      addToCart({
        id: 'endoscopic-forehead',
        name: '내시경 이마거상',
        category: '이마리프팅'
      });
    }
  };

  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <div className="relative pb-16 overflow-hidden h-[500px] lg:h-[600px]">
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/images/banners/forehead-lifting.jpg)',
            backgroundPosition: 'center center'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
            <div className="text-white space-y-6">
              <div className="inline-flex items-center px-6 py-3 glass-effect rounded-full text-sm font-elegant-sans font-medium mb-4 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                ENDOSCOPIC FOREHEAD LIFTING
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-display font-light mb-4 tracking-wide leading-tight">
                  내시경<br />
                  <span className="text-4xl lg:text-5xl">이마거상</span>
                </h1>
                <div className="w-24 h-0.5 bg-white/60 rounded-full mb-4"></div>
                <p className="text-base lg:text-lg font-elegant-sans font-light leading-relaxed text-white/90">
                  내시경을 통한 최소 절개로<br />
                  자연스러운 이마 리프팅<br />
                  <span className="font-medium">또렷하고 젊은 인상을 완성합니다</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 섹션 */}
      <div className="relative pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          
          {/* 시술 소개 */}
          <div className="bg-white rounded-3xl shadow-2xl border border-teal-smoke-200/30 overflow-hidden mb-20">
            <div className="bg-gradient-to-r from-teal-smoke-500 to-elegant-500 py-12 px-8 text-center">
              <h3 className="text-4xl font-display font-light text-white mb-4 tracking-wide">
                내시경 이마거상
              </h3>
              <p className="text-xl font-elegant-sans font-light text-white/90">
                ENDOSCOPIC FOREHEAD LIFT
              </p>
            </div>

            <div className="p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <div className="space-y-6 mb-10">
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-lg text-slate-700 font-elegant-sans font-light leading-relaxed">
                        내시경을 이용하여 최소한의 절개로 이마와 눈썹을 리프팅합니다
                      </p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-lg text-slate-700 font-elegant-sans font-light leading-relaxed">
                        처진 이마와 눈썹을 자연스럽게 끌어올려 젊고 또렷한 인상을 연출합니다
                      </p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-lg text-slate-700 font-elegant-sans font-light leading-relaxed">
                        이마 주름 개선과 동시에 상안면부 전체적인 리프팅 효과를 얻을 수 있습니다
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-bold bg-gradient-to-r from-teal-smoke-100 to-elegant-100 text-cyan-800 border-2 border-teal-smoke-200 shadow-lg">
                      <Sparkles className="w-4 h-4 mr-2" />
                      최소절개
                    </div>
                    <div className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-bold bg-gradient-to-r from-teal-smoke-100 to-elegant-100 text-cyan-800 border-2 border-teal-smoke-200 shadow-lg">
                      <Sparkles className="w-4 h-4 mr-2" />
                      내시경수술
                    </div>
                    <div className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-bold bg-gradient-to-r from-teal-smoke-100 to-elegant-100 text-cyan-800 border-2 border-teal-smoke-200 shadow-lg">
                      <Sparkles className="w-4 h-4 mr-2" />
                      자연스러움
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-bold bg-gradient-to-r from-elegant-200 to-teal-smoke-200 text-cyan-800 border-2 border-elegant-300 shadow-lg">
                      <Clock className="w-4 h-4 mr-2" />
                      약 1시간
                    </div>
                    <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-elegant-sans font-bold bg-gray-200 text-slate-600 border border-gray-300">
                      이마리프팅
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-between">
                  <div className="w-full h-64 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-2xl border-2 border-teal-smoke-200/30 flex items-center justify-center mb-8 shadow-lg">
                    <div className="text-center text-slate-600">
                      <Sparkles className="w-20 h-20 mx-auto mb-4" />
                      <p className="font-elegant-sans font-medium">
                        내시경 이마거상
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-4 px-6 rounded-xl font-elegant-sans font-bold text-base transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      isInCart('endoscopic-forehead')
                        ? 'bg-gradient-to-r from-green-200 to-green-300 text-green-800 cursor-default border-2 border-green-400'
                        : 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white hover:from-teal-smoke-500 hover:to-elegant-500 border-2 border-transparent'
                    }`}
                    disabled={isInCart('endoscopic-forehead')}
                  >
                    {isInCart('endoscopic-forehead') ? (
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

        </div>
      </div>

      <StandardConsultationSection
        title="내시경 이마거상 상담 신청"
        description="전문 의료진과 함께 나에게 가장 적합한 이마리프팅을 찾아보세요"
        initialProcedureId="forehead-lifting"
      />
    </PageLayout>
  );
}