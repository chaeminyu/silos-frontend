import PageLayout from '../../components/PageLayout';
import StandardConsultationSection from '../../components/StandardConsultationSection';
import { Award, Users, Clock, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const aboutSections = [
  {
    title: '실로스 리프팅 철학',
    href: '/about/philosophy',
    description: '정확한 진단과 맞춤형 시술로 환자 중심의 의료 서비스를 제공',
    icon: Award,
    color: 'from-teal-smoke-300 to-teal-smoke-400'
  },
  {
    title: '의료진 소개',
    href: '/about/doctors',
    description: '풍부한 경험과 전문성을 갖춘 의료진이 함께합니다',
    icon: Users,
    color: 'from-elegant-300 to-elegant-400'
  },
  {
    title: '둘러보기',
    href: '/about/tour',
    description: '최신 시설과 쾌적한 환경을 갖춘 실로스를 둘러보세요',
    icon: Clock,
    color: 'from-teal-smoke-400 to-elegant-400'
  },
  {
    title: '진료시간 안내/오시는길',
    href: '/about/location',
    description: '실로스를 찾아오시는 방법과 진료시간을 안내해드립니다',
    icon: MapPin,
    color: 'from-elegant-400 to-teal-smoke-500'
  }
];

export default function AboutPage() {
  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <div className="relative pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-400 via-elegant-400 to-teal-smoke-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-elegant-sans font-medium mb-8 border border-white/30">
              <Award className="w-4 h-4 mr-2" />
              About SILOS
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-light mb-6 tracking-wide leading-tight">
              병원 소개
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light max-w-3xl mx-auto leading-relaxed text-white/90">
              실로스 성형외과를 소개합니다<br />
              리프팅의 새로운 기준, 실로스가 함께합니다
            </p>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative -mt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 소개 카드 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-display font-light text-slate-800 mb-8 tracking-wide">
                실로스와 함께하는 아름다움의 여정
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-slate-300 to-slate-400 rounded-full mx-auto mb-12"></div>
            </div>
            
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg font-elegant-sans font-light text-slate-700 leading-relaxed">
                실로스 성형외과는 리프팅 전문 의료기관으로서,
                환자 개개인의 아름다움을 실현하기 위해 최선을 다하고 있습니다.
                정확한 진단과 맞춤형 시술, 그리고 따뜻한 마음으로
                여러분의 신뢰할 수 있는 메디컬 파트너가 되겠습니다.
              </p>
            </div>
          </div>

          {/* 메뉴 그리드 - 데스크탑: 2x2, 모바일: 2x2 카드형 */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {aboutSections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Link
                  key={index}
                  href={section.href}
                  className="group block"
                >
                  {/* 모바일: 세로형 컴팩트 카드, 데스크탑: 가로형 */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 lg:hover:-translate-y-2 border border-teal-smoke-200/50 min-h-[160px] sm:min-h-[180px] lg:min-h-auto">
                    {/* 모바일: 세로 레이아웃 */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6 space-y-3 lg:space-y-0">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${section.color} rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg mx-auto lg:mx-0`}>
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                      </div>
                      <div className="flex-1 text-center lg:text-left">
                        <h3 className="text-base sm:text-lg lg:text-2xl font-display font-light text-slate-800 mb-2 lg:mb-3 group-hover:text-slate-900 transition-colors leading-tight">
                          {section.title}
                        </h3>
                        <p className="text-xs sm:text-sm lg:text-base text-slate-600 font-elegant-sans font-light leading-relaxed hidden sm:block lg:block">
                          {section.description}
                        </p>
                        {/* 모바일에서만 짧은 설명 */}
                        <p className="text-xs text-slate-500 font-elegant-sans font-light block sm:hidden">
                          자세히 보기
                        </p>
                      </div>
                      {/* 화살표 - 데스크탑에서만 표시 */}
                      <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-slate-400 mt-1 group-hover:translate-x-1 transition-transform hidden lg:block" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* 추가 정보 섹션 */}
          <div className="mt-24 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-3xl p-12 shadow-xl border border-teal-smoke-200/30">
            <div className="text-center">
              <h3 className="text-3xl font-display font-light text-slate-800 mb-6">
                왜 실로스인가?
              </h3>
              <div className="w-20 h-0.5 bg-slate-300 rounded-full mx-auto mb-8"></div>
              <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-300 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                    <span className="text-lg sm:text-2xl font-bold text-white">10+</span>
                  </div>
                  <h4 className="text-sm sm:text-xl font-elegant font-medium text-slate-800 mb-1 sm:mb-2">년의 경험</h4>
                  <p className="text-xs sm:text-base text-slate-600 font-elegant-sans font-light">
                    오랜 경험과 노하우
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                    <span className="text-lg sm:text-2xl font-bold text-white">1:1</span>
                  </div>
                  <h4 className="text-sm sm:text-xl font-elegant font-medium text-slate-800 mb-1 sm:mb-2">맞춤 상담</h4>
                  <p className="text-xs sm:text-base text-slate-600 font-elegant-sans font-light">
                    개인별 맞춤 진료
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                    <span className="text-lg sm:text-2xl font-bold text-white">24/7</span>
                  </div>
                  <h4 className="text-sm sm:text-xl font-elegant font-medium text-slate-800 mb-1 sm:mb-2">사후 관리</h4>
                  <p className="text-xs sm:text-base text-slate-600 font-elegant-sans font-light">
                    체계적인 관리 시스템
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 온라인 상담 섹션 */}
      <StandardConsultationSection
        title="실로스 온라인 상담 예약"
        description="전문의와의 1:1 맞춤 상담으로 당신만의 아름다움을 계획하세요"
        initialProcedureId="about-consultation"
      />
    </PageLayout>
  );
}