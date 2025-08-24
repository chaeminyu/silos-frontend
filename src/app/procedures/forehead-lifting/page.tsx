'use client';

import Link from 'next/link';
import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';

export default function ForeheadLiftingPage() {
  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <div className="relative pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-400 via-elegant-400 to-teal-smoke-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-elegant-sans font-medium mb-8 border border-white/30">
              <Sparkles className="w-4 h-4 mr-2" />
              FOREHEAD LIFTING
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-light mb-6 tracking-wide leading-tight">
              이마리프팅
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light max-w-3xl mx-auto leading-relaxed text-white/90">
              내시경을 통한 최소 절개로<br />
              자연스러운 이마 리프팅을 완성합니다
            </p>
          </div>
        </div>
      </div>

      {/* 메인 섹션 */}
      <div className="relative -mt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 소개 카드 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-display font-light text-cyan-800 mb-8 tracking-wide">
                내시경 이마거상
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full mx-auto mb-8"></div>
              <p className="text-lg font-elegant-sans font-light text-slate-600 leading-relaxed max-w-4xl mx-auto">
                처진 이마와 눈썹을 자연스럽게 리프팅하여<br />
                젊고 또렷한 인상을 만들어드립니다.<br />
                최소 절개로 흉터 걱정 없이 안전한 시술입니다.
              </p>
            </div>

            {/* 시술 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-gradient-to-br from-teal-smoke-50 to-elegant-50 rounded-2xl">
                <Clock className="w-12 h-12 text-cyan-700 mx-auto mb-4" />
                <h4 className="font-elegant font-medium text-cyan-800 mb-2">시술시간</h4>
                <p className="text-slate-600 font-elegant-sans">약 1시간</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-elegant-50 to-teal-smoke-50 rounded-2xl">
                <Sparkles className="w-12 h-12 text-cyan-700 mx-auto mb-4" />
                <h4 className="font-elegant font-medium text-cyan-800 mb-2">마취방법</h4>
                <p className="text-slate-600 font-elegant-sans">수면마취</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-teal-smoke-50 to-elegant-50 rounded-2xl">
                <Clock className="w-12 h-12 text-cyan-700 mx-auto mb-4" />
                <h4 className="font-elegant font-medium text-cyan-800 mb-2">회복기간</h4>
                <p className="text-slate-600 font-elegant-sans">1-2주</p>
              </div>
            </div>

            {/* 상세 페이지 링크 */}
            <div className="text-center">
              <Link href="/procedures/forehead-lifting/endoscopic-forehead" className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl font-elegant-sans font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <span>내시경 이마거상 자세히 보기</span>
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 이마리프팅이 필요한 경우 */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-12 shadow-xl border border-cyan-200/30">
            <h3 className="text-3xl font-display font-light text-cyan-800 mb-8 text-center">
              이마리프팅이 필요한 경우
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                '이마 주름이 깊어진 경우',
                '눈썹이 처져 눈이 작아 보이는 경우',
                '이마가 좁아 보이는 경우',
                '나이 들어 보이는 인상을 개선하고 싶은 경우'
              ].map((text, index) => (
                <div key={index} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-cyan-200/30">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <p className="text-slate-700 font-elegant-sans">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 상담 신청 섹션 */}
      <StandardConsultationSection
        title="이마리프팅 상담 신청"
        description="전문 의료진과 함께 나에게 가장 적합한 이마리프팅을 찾아보세요"
        initialProcedureId="forehead-lifting"
      />
    </PageLayout>
  );
}