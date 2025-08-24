'use client';

import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
import { Sparkles, Clock, Shield } from 'lucide-react';

export default function NeckLiftingNewPage() {
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
              NECK LIFTING
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-light mb-6 tracking-wide leading-tight">
              넥(Neck)리프팅
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light max-w-3xl mx-auto leading-relaxed text-white/90">
              목주름과 이중턱을 동시에 개선하여<br />
              젊고 선명한 목라인을 완성합니다
            </p>
          </div>
        </div>
      </div>

      {/* 메인 섹션 */}
      <div className="relative -mt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-display font-light text-cyan-800 mb-8 tracking-wide">
                목 리프팅 시술
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full mx-auto mb-8"></div>
              <p className="text-lg font-elegant-sans font-light text-slate-600 leading-relaxed max-w-4xl mx-auto">
                나이가 들면서 생기는 목주름과 처진 피부를<br />
                개인별 맞춤 시술로 효과적으로 개선합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-teal-smoke-50 to-elegant-50 rounded-2xl p-8 border border-cyan-200/30">
                <h3 className="text-2xl font-display font-medium text-cyan-800 mb-4">커스텀 넥리프팅</h3>
                <p className="text-slate-600 font-elegant-sans mb-6">개인의 목 상태에 맞춰 최적의 시술을 설계합니다.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">맞춤형시술</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">복합치료</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">자연스러움</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-elegant-50 to-teal-smoke-50 rounded-2xl p-8 border border-cyan-200/30">
                <h3 className="text-2xl font-display font-medium text-cyan-800 mb-4">목주름 개선</h3>
                <p className="text-slate-600 font-elegant-sans mb-6">가로밴드와 세로주름을 효과적으로 개선합니다.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">가로밴드</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">세로주름</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">탄력개선</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-cyan-200/30">
              <Clock className="w-12 h-12 text-cyan-700 mx-auto mb-4" />
              <h4 className="font-elegant font-medium text-cyan-800 mb-2">시술시간</h4>
              <p className="text-slate-600 font-elegant-sans">30-60분</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-cyan-200/30">
              <Shield className="w-12 h-12 text-cyan-700 mx-auto mb-4" />
              <h4 className="font-elegant font-medium text-cyan-800 mb-2">마취방법</h4>
              <p className="text-slate-600 font-elegant-sans">부분마취</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-cyan-200/30">
              <Sparkles className="w-12 h-12 text-cyan-700 mx-auto mb-4" />
              <h4 className="font-elegant font-medium text-cyan-800 mb-2">회복기간</h4>
              <p className="text-slate-600 font-elegant-sans">즉시 일상생활</p>
            </div>
          </div>
        </div>
      </div>

      <StandardConsultationSection
        title="넥리프팅 상담 신청"
        description="전문 의료진과 함께 나에게 가장 적합한 목 리프팅을 찾아보세요"
        initialProcedureId="neck-lifting-new"
      />
    </PageLayout>
  );
}