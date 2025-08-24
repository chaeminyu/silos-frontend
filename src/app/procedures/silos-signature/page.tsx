'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
import { Sparkles, Clock, Shield, Star, ArrowRight } from 'lucide-react';

const signatureProcedures = [
  {
    id: 'silos-lifting',
    title: '실로프팅(실리프팅)',
    subtitle: 'SILOS THREAD LIFTING',
    description: '실로스만의 특허받은 실리프팅 기법으로 개인의 얼굴 구조와 노화 패턴을 분석하여 최적의 결과를 만들어드립니다.',
    features: ['무절개', '즉시효과', '자연스러움'],
    link: '/procedures/silos-signature/silos-lifting'
  },
  {
    id: 'silofat',
    title: '실로팻(지방추출주사)',
    subtitle: 'SILO-FAT',
    description: '지방세포를 직접 파괴하고 배출시켜 확실한 체형 개선 효과를 제공합니다.',
    features: ['짧은시술시간', '순수지방추출', '압박복불필요'],
    link: '/procedures/silos-signature/silofat'
  },
  {
    id: 'under-eye-laser',
    title: '반달레이저(눈밑지방레이저)',
    subtitle: 'UNDER-EYE FAT LASER',
    description: '절개 없이 10분 만에 눈밑 지방을 개선하여 젊고 밝은 눈매를 만들어드립니다.',
    features: ['비절개', '10분시술', '자연개선'],
    link: '/procedures/silos-signature/under-eye-laser'
  },
  {
    id: 'neck-lifting',
    title: '넥리프팅(목리프팅)',
    subtitle: 'NECK LIFTING',
    description: '처진 목선과 이중턱을 개선하여 선명한 턱라인과 젊은 목선을 연출합니다.',
    features: ['복합시술', '목주름개선', '자연결과'],
    link: '/procedures/silos-signature/neck-lifting'
  }
];

export default function SilosSignaturePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <div className="relative pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-cyan-700 to-cyan-800"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-elegant-sans font-medium mb-8 border border-white/30">
              <Star className="w-4 h-4 mr-2" />
              SILOS SIGNATURE
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-light mb-6 tracking-wide leading-tight">
              실로스 시그니처
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light max-w-3xl mx-auto leading-relaxed text-white/90">
              실로스만의 특별한 시술<br />
              개인맞춤 아름다움을 완성합니다
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
                SILOS SIGNATURE
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full mx-auto mb-8"></div>
              <p className="text-lg font-elegant-sans font-light text-slate-600 leading-relaxed max-w-4xl mx-auto">
                실로스가 자신있게 선보이는 시그니처 시술들입니다.<br />
                오랜 경험과 노하우, 그리고 끊임없는 연구를 통해<br />
                가장 효과적이고 안전한 시술을 제공합니다.
              </p>
            </div>
          </div>

          {/* 시술 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {signatureProcedures.map((procedure) => (
              <Link
                key={procedure.id}
                href={procedure.link}
                className="group"
                onMouseEnter={() => setHoveredCard(procedure.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`relative bg-white rounded-3xl shadow-xl border-2 transition-all duration-500 ${
                  hoveredCard === procedure.id 
                    ? 'border-cyan-400 shadow-2xl transform -translate-y-2' 
                    : 'border-cyan-200/30 hover:border-cyan-300'
                }`}>
                  {/* 헤더 */}
                  <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-t-3xl py-8 px-8">
                    <h3 className="text-2xl font-display font-light text-white mb-2">
                      {procedure.title}
                    </h3>
                    <p className="text-sm font-elegant-sans text-white/80">
                      {procedure.subtitle}
                    </p>
                  </div>

                  {/* 콘텐츠 */}
                  <div className="p-8">
                    <p className="text-slate-600 font-elegant-sans font-light mb-6 leading-relaxed">
                      {procedure.description}
                    </p>

                    {/* 특징 배지들 */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {procedure.features.map((feature, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-elegant-sans font-medium bg-cyan-100 text-cyan-800 border border-cyan-200">
                          <Sparkles className="w-3 h-3 mr-1" />
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* 바로가기 */}
                    <div className="flex items-center text-cyan-600 group-hover:text-cyan-700 transition-colors">
                      <span className="font-elegant-sans font-medium">자세히 보기</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 특별함 섹션 */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-12 shadow-xl border border-cyan-200/30">
            <div className="text-center">
              <h3 className="text-3xl font-display font-light text-cyan-800 mb-8">
                왜 실로스 시그니처인가?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-elegant font-medium text-cyan-800 mb-2">검증된 안전성</h4>
                  <p className="text-sm text-slate-600 font-elegant-sans">수많은 임상 경험</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-elegant font-medium text-cyan-800 mb-2">특별한 기술</h4>
                  <p className="text-sm text-slate-600 font-elegant-sans">실로스만의 노하우</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-elegant font-medium text-cyan-800 mb-2">빠른 회복</h4>
                  <p className="text-sm text-slate-600 font-elegant-sans">일상 복귀 가능</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-elegant font-medium text-cyan-800 mb-2">확실한 효과</h4>
                  <p className="text-sm text-slate-600 font-elegant-sans">만족도 높은 결과</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 상담 신청 섹션 */}
      <StandardConsultationSection
        title="실로스 시그니처 상담 신청"
        description="실로스만의 특별한 시술로 아름다움을 완성하세요"
        initialProcedureId="silos-signature"
      />
    </PageLayout>
  );
}