'use client';

import Image from 'next/image';
import { Search, Award, Lightbulb, Shield, Heart } from 'lucide-react';
import PageLayout from '../../../components/PageLayout';

const philosophySections = [
  {
    id: 1,
    title: 'SILOS실로스의 디테일\n정확한 진단',
    icon: Search,
    description: '정확한 진단은 좋은 결과의 시작입니다. 실로스는 피부와 얼굴의 상태를 다각도로 분석해 환자에게 꼭 필요한 리프팅만을 설계합니다.',
    color: 'from-teal-smoke-100 to-teal-smoke-200',
    accentColor: 'teal-smoke-300',
    image: '/images/philosophy/diagnosis.jpg', // Add your image here: diagnosis.jpg
    imagePlaceholder: 'diagnosis-image.jpg'
  },
  {
    id: 2,
    title: 'SILOS실로스의 자부심\n리프팅 선도병원',
    icon: Award,
    description: '실로스는 수많은 임상 경험과 기술력을 바탕으로 리프팅 분야를 선도하고 있습니다. 정확한 진단, 맞춤 설계, 그리고 안전한 시술 시스템은 실로스 리프팅의 핵심입니다. 환자 한 사람의 얼굴에 집중하며, 리프팅 그 이상의 가치를 실현합니다.',
    color: 'from-elegant-100 to-elegant-200',
    accentColor: 'elegant-300',
    image: '/images/philosophy/leading-hospital.jpg', // Add your image here: leading-hospital.jpg
    imagePlaceholder: 'leading-hospital.jpg'
  },
  {
    id: 3,
    title: 'SILOS실로스의 혁신\n실리프팅 R&D 센터',
    icon: Lightbulb,
    description: '실로스는 혁신 소재와 시술 연구 개발을 위해 실리프팅 R&D 센터를 운영하고 있습니다. 리프팅에 사용되는 실, 부스터 등 핵심 요소를 자체 개발 함으로써 보다 전문화된 리프팅 서비스를 제공하기 위해 노력하고 있습니다.',
    color: 'from-teal-smoke-200 to-elegant-200',
    accentColor: 'teal-smoke-400',
    image: '/images/philosophy/rnd-center.jpg', // Add your image here: rnd-center.jpg
    imagePlaceholder: 'rnd-center.jpg'
  },
  {
    id: 4,
    title: 'SILOS실로스의 프라이빗\n서비스',
    icon: Shield,
    description: '실로스에서는 진단부터 1인 맞춤으로 진행되며 모든 시술과 수술은 1인실 환경을 제공하고 있습니다.',
    color: 'from-elegant-200 to-teal-smoke-300',
    accentColor: 'elegant-400',
    image: '/images/philosophy/private-service.jpg', // Add your image here: private-service.jpg
    imagePlaceholder: 'private-service.jpg'
  },
  {
    id: 5,
    title: 'SILOS실로스의 사후 관리\n서비스',
    icon: Heart,
    description: '시술은 끝이 아니라 시작입니다. 실로스의 리프팅 케어 서비스는 붓기 완화 케어, 회복 단계별 맞춤 안내 등을 제공, 환자의 빠른 회복을 돕습니다.',
    color: 'from-teal-smoke-300 to-elegant-300',
    accentColor: 'teal-smoke-500',
    image: '/images/philosophy/aftercare-service.jpg', // Add your image here: aftercare-service.jpg
    imagePlaceholder: 'aftercare-service.jpg'
  }
];

export default function PhilosophyPage() {

  return (
    <PageLayout>

      {/* 히어로 섹션 - 대각선 디자인 */}
      <div className="relative pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-400 via-elegant-400 to-teal-smoke-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
        
        {/* 대각선 장식 요소 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-6 py-3 glass-effect rounded-full text-sm font-elegant-sans font-medium mb-8 border border-white/30">
              <Award className="w-4 h-4 mr-2" />
              About SILOS Philosophy
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-light mb-6 tracking-wide leading-tight">
              실로스 리프팅 철학
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light max-w-3xl mx-auto leading-relaxed text-white/90">
              정확한 진단과 맞춤형 시술로 환자 중심의 의료 서비스를 제공하는<br />
              실로스만의 철학을 소개합니다
            </p>
          </div>
        </div>
      </div>

      {/* 진심 섹션 */}
      <div className="relative -mt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 첫 번째 소개 섹션 */}
          <div className="mb-32">
            <div className="glass-effect rounded-3xl p-12 shadow-xl border border-white/50">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-smoke-200 to-elegant-200 rounded-full text-sm font-elegant-sans font-medium mb-8 text-slate-700">
                  <Heart className="w-4 h-4 mr-2" />
                  Our Passion
                </div>
                <h2 className="text-4xl lg:text-5xl font-display font-light text-cyan-800 mb-8 tracking-wide">
                  SILOS 실로스, 리프팅에 진심을 담다
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full mx-auto mb-12"></div>
              </div>
              
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-lg font-elegant-sans font-light text-slate-700 leading-relaxed whitespace-pre-line">
                  수년간 리프팅 한 길을 연구하고,
                  수많은 임상 데이터를 쌓아온 실로스는
                  단순한 시술이 아닌, 얼굴의 흐름과 삶의 변화까지 고민해왔습니다.
                  자체 실 개발과 국내외 의사를 대상으로 하는 교육을 통해
                  글로벌 리프팅 의료기술을 선도하며, 실리프팅의 기준을 만들어가고 있습니다.
                  정확한 진단, 체계적인 시스템, 그리고 환자에 대한 깊은 이해를 바탕으로
                  당신만을 위한 리프팅 결과를 완성합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 두 번째 소개 섹션 */}
          <div className="mb-32">
            <div className="bg-gradient-to-br from-elegant-50 to-teal-smoke-50 rounded-3xl p-12 shadow-xl border border-teal-smoke-200/30">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-elegant-200 to-teal-smoke-200 rounded-full text-sm font-elegant-sans font-medium mb-8 text-slate-700">
                  <Search className="w-4 h-4 mr-2" />
                  Understanding You
                </div>
                <h2 className="text-4xl lg:text-5xl font-display font-light text-cyan-800 mb-8 tracking-wide">
                  SILOS 실로스, 얼굴의 흐름을 이해하다
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-elegant-300 to-teal-smoke-300 rounded-full mx-auto mb-12"></div>
              </div>
              
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-lg font-elegant-sans font-light text-slate-700 leading-relaxed whitespace-pre-line">
                  세상에 똑같은 피부란 게 있을까요?
                  똑같은 치료를 받아도 효과가 다른 이유.
                  원인이 다르기 때문입니다.
                  실로스는 개개인의 얼굴 구조, 피부 상태,
                  노화 속도를 고려해 가장 자연스럽고 조화로운
                  리프팅 솔루션을 제시합니다.
                  기본에 충실하고, 결과에 책임지는
                  실로스는 &apos;나를 위한 커스텀 리프팅&apos; 메디컬 파트너입니다.
                </p>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <div className="flex items-center justify-center mb-24">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-teal-smoke-300 to-transparent"></div>
            <div className="w-4 h-4 bg-gradient-to-br from-teal-smoke-300 to-elegant-300 rounded-full mx-6 shadow-lg"></div>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-elegant-300 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 - 지그재그 레이아웃 */}
      <div className="relative pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {philosophySections.map((section, index) => {
            const IconComponent = section.icon;
            const isEven = index % 2 === 1;
            
            return (
              <div key={section.id} className="mb-32">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* 이미지 섹션 */}
                  <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'} relative group`}>
                    <div className="relative">
                      {/* 이미지 컨테이너 */}
                      <div className={`aspect-[4/3] rounded-3xl shadow-2xl overflow-hidden border border-white/50 group-hover:scale-105 transition-all duration-700 relative`}>
                        {section.image ? (
                          <Image 
                            src={section.image} 
                            alt={section.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement?.querySelector('.image-placeholder')?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        {/* Placeholder shown when no image or image fails to load */}
                        <div className={`${section.image ? 'hidden' : ''} image-placeholder absolute inset-0 bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                          <div className="text-center">
                            <div className={`w-24 h-24 bg-${section.accentColor} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                              <IconComponent className="w-12 h-12 text-white" />
                            </div>
                            <p className="text-slate-700 font-elegant-sans font-light text-sm">
                              이미지를 추가해주세요
                            </p>
                            <p className="text-teal-smoke-500 font-elegant-sans font-light text-xs mt-1">
                              {section.imagePlaceholder}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* 플로팅 요소 */}
                      <div className={`absolute -top-6 -right-6 w-16 h-16 bg-${section.accentColor} rounded-2xl flex items-center justify-center shadow-xl border border-white/50 group-hover:rotate-12 transition-all duration-500`}>
                        <span className="text-white font-display font-bold text-lg">{section.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* 텍스트 섹션 */}
                  <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'} space-y-8`}>
                    <div>
                      <div className="flex items-center mb-6">
                        <div className={`w-12 h-12 bg-${section.accentColor} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className={`px-4 py-2 bg-gradient-to-r ${section.color} rounded-full`}>
                          <span className="text-slate-700 font-elegant-sans font-medium text-sm">
                            0{section.id}
                          </span>
                        </div>
                      </div>
                      
                      <h2 className="text-3xl lg:text-4xl font-display font-light text-cyan-800 mb-8 leading-tight tracking-wide whitespace-pre-line">
                        {section.title}
                      </h2>
                      
                      <div className="w-16 h-1 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full mb-8"></div>
                      
                      <p className="text-lg font-elegant-sans font-light text-slate-700 leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* 구분선 (마지막 섹션 제외) */}
                {index < philosophySections.length - 1 && (
                  <div className="flex items-center justify-center mt-24">
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-teal-smoke-300 to-transparent"></div>
                    <div className="w-3 h-3 bg-teal-smoke-300 rounded-full mx-4"></div>
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-elegant-300 to-transparent"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 핵심 가치 섹션 */}
      <div className="bg-gradient-to-br from-teal-smoke-100 via-elegant-100 to-teal-smoke-200 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect rounded-3xl p-12 shadow-xl border border-white/50">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-display font-light text-cyan-800 mb-6">
                SILOS 실로스, 핵심 가치를 말하다
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-smoke-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-elegant font-medium text-cyan-800 mb-3">환자 중심</h4>
                    <p className="text-slate-700 font-elegant-sans font-light leading-relaxed">
                      모든 결정과 행동의 중심에 환자를 두고, 환자의 만족을 최우선으로 합니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-elegant-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-elegant font-medium text-cyan-800 mb-3">전문성</h4>
                    <p className="text-slate-700 font-elegant-sans font-light leading-relaxed">
                      지속적인 교육과 연구를 통해 최고의 의료 서비스를 제공합니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-smoke-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-elegant font-medium text-cyan-800 mb-3">신뢰와 정직</h4>
                    <p className="text-slate-700 font-elegant-sans font-light leading-relaxed">
                      투명한 정보 제공과 정직한 상담으로 환자의 신뢰를 얻습니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-elegant-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-elegant font-medium text-cyan-800 mb-3">혁신</h4>
                    <p className="text-slate-700 font-elegant-sans font-light leading-relaxed">
                      최신 의료 기술과 트렌드를 반영하여 지속적으로 발전합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-teal-smoke-200/50">
              <p className="text-lg font-elegant-sans font-light text-slate-700 leading-relaxed max-w-4xl mx-auto">
                실로스의원은 리프팅 선도 병원으로서 환자 개개인의 아름다움을 실현하고, 신뢰받는 메디컬 파트너로서의 역할을 다하고자 합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

    </PageLayout>
  );
}