import PageLayout from '../../components/PageLayout';
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
              <h2 className="text-4xl lg:text-5xl font-display font-light text-teal-smoke-800 mb-8 tracking-wide">
                실로스와 함께하는 아름다움의 여정
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full mx-auto mb-12"></div>
            </div>
            
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg font-elegant-sans font-light text-teal-smoke-700 leading-relaxed">
                실로스 성형외과는 리프팅 전문 의료기관으로서,
                환자 개개인의 아름다움을 실현하기 위해 최선을 다하고 있습니다.
                정확한 진단과 맞춤형 시술, 그리고 따뜻한 마음으로
                여러분의 신뢰할 수 있는 메디컬 파트너가 되겠습니다.
              </p>
            </div>
          </div>

          {/* 메뉴 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aboutSections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Link
                  key={index}
                  href={section.href}
                  className="group block"
                >
                  <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-teal-smoke-200/50">
                    <div className="flex items-start space-x-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-display font-light text-teal-smoke-800 mb-3 group-hover:text-teal-smoke-900 transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-teal-smoke-600 font-elegant-sans font-light leading-relaxed">
                          {section.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-teal-smoke-400 mt-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* 추가 정보 섹션 */}
          <div className="mt-24 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-3xl p-12 shadow-xl border border-teal-smoke-200/30">
            <div className="text-center">
              <h3 className="text-3xl font-display font-light text-teal-smoke-800 mb-6">
                왜 실로스인가?
              </h3>
              <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-20 h-20 bg-teal-smoke-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">10+</span>
                  </div>
                  <h4 className="text-xl font-elegant font-medium text-teal-smoke-800 mb-2">년의 경험</h4>
                  <p className="text-teal-smoke-600 font-elegant-sans font-light">
                    오랜 경험과 노하우
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-elegant-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">1:1</span>
                  </div>
                  <h4 className="text-xl font-elegant font-medium text-teal-smoke-800 mb-2">맞춤 상담</h4>
                  <p className="text-teal-smoke-600 font-elegant-sans font-light">
                    개인별 맞춤 진료
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-teal-smoke-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">24/7</span>
                  </div>
                  <h4 className="text-xl font-elegant font-medium text-teal-smoke-800 mb-2">사후 관리</h4>
                  <p className="text-teal-smoke-600 font-elegant-sans font-light">
                    체계적인 관리 시스템
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}