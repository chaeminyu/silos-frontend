'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Clock, Zap, Heart, Award, Shield, Sparkles, Play, Camera, Stethoscope } from 'lucide-react';

const procedures = [
  {
    id: 1,
    title: '실로스 실리프팅',
    subtitle: '어려졌다! 나를 위한 커스텀 리프팅',
    description: '실리프팅은 실로스',
    badge: 'SIGNATURE',
    badgeIcon: Award,
    badgeColor: 'bg-gradient-to-r from-teal-smoke-300 to-teal-smoke-400',
    bgGradient: 'from-teal-smoke-200 via-teal-smoke-300 to-elegant-300',
    features: ['무절개', '즉시효과', '맞춤설계'],
    duration: '30분',
    visualColor: 'bg-gradient-to-br from-teal-smoke-300 to-teal-smoke-400',
  },
  {
    id: 2,
    title: '이마 눈썹 리프팅',
    subtitle: '상안부 리프팅, 동안의 시작점',
    description: '리프팅은 눈썹부터!',
    badge: 'HOT',
    badgeIcon: Zap,
    badgeColor: 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400',
    bgGradient: 'from-elegant-200 via-teal-smoke-300 to-elegant-400',
    features: ['내시경', '최소절개', '자연리프팅'],
    duration: '1시간',
    visualColor: 'bg-gradient-to-br from-elegant-300 to-teal-smoke-400',
  },
  {
    id: 3,
    title: '눈밑 지방레이저',
    subtitle: '절개없이 눈밑을 환하게!',
    description: '10분 다크서클 레이저',
    badge: '10분 완성',
    badgeIcon: Clock,
    badgeColor: 'bg-gradient-to-r from-teal-smoke-300 to-elegant-300',
    bgGradient: 'from-teal-smoke-100 via-elegant-200 to-teal-smoke-200',
    features: ['비절개', '10분완성', '바로복귀'],
    duration: '10분',
    visualColor: 'bg-gradient-to-br from-teal-smoke-200 to-elegant-300',
  },
  {
    id: 4,
    title: '실로팻',
    subtitle: '바로 뽑아 바로 확인하는 실로팻',
    description: 'No Pain, Just Fat Down',
    badge: 'No Pain',
    badgeIcon: Heart,
    badgeColor: 'bg-gradient-to-r from-elegant-300 to-teal-smoke-300',
    bgGradient: 'from-teal-smoke-300 via-elegant-300 to-teal-smoke-400',
    features: ['무통증', '주사만으로', '즉시확인'],
    duration: '20분',
    visualColor: 'bg-gradient-to-br from-elegant-400 to-teal-smoke-300',
  },
  {
    id: 5,
    title: '눈처짐 리프팅',
    subtitle: '눈이 바뀌면, 얼굴이 바뀝니다',
    description: '상하안검 수술의 완성',
    badge: 'PREMIUM',
    badgeIcon: Sparkles,
    badgeColor: 'bg-gradient-to-r from-teal-smoke-400 to-elegant-500',
    bgGradient: 'from-elegant-300 via-teal-smoke-400 to-elegant-400',
    features: ['상하안검', '전체개선', '자연스러운'],
    duration: '1.5시간',
    visualColor: 'bg-gradient-to-br from-teal-smoke-400 to-elegant-400',
  },
  {
    id: 6,
    title: '콜라채움',
    subtitle: '노화, 피부 속부터 채워야 할 때',
    description: '콜라겐 생성 부스터',
    badge: 'NATURAL',
    badgeIcon: Shield,
    badgeColor: 'bg-gradient-to-r from-elegant-400 to-teal-smoke-500',
    bgGradient: 'from-teal-smoke-200 via-elegant-300 to-teal-smoke-300',
    features: ['콜라겐생성', '탄력개선', '모공축소'],
    duration: '30분',
    visualColor: 'bg-gradient-to-br from-elegant-300 to-teal-smoke-400',
  },
  {
    id: 7,
    title: '수면 울쎄라·리쥬란',
    subtitle: '아픈 시술은 NO, 자는 동안 예뻐지는 건 YES!',
    description: '실로스 수면 예쁨존',
    badge: 'NEW',
    badgeIcon: Sparkles,
    badgeColor: 'bg-gradient-to-r from-teal-smoke-500 to-elegant-400',
    bgGradient: 'from-elegant-400 via-teal-smoke-400 to-elegant-500',
    features: ['수면마취', '무통증', '편안한시술'],
    duration: '1시간',
    visualColor: 'bg-gradient-to-br from-teal-smoke-500 to-elegant-400',
  },
  {
    id: 8,
    title: '10min 넥코어 리프팅',
    subtitle: '목 라인을 다시 핏하게!',
    description: '넥코어 듀얼 이펙트',
    badge: '10분',
    badgeIcon: Clock,
    badgeColor: 'bg-gradient-to-r from-elegant-500 to-teal-smoke-400',
    bgGradient: 'from-teal-smoke-400 via-elegant-400 to-teal-smoke-500',
    features: ['리프팅실', '레이저듀얼', '10분완성'],
    duration: '10분',
    visualColor: 'bg-gradient-to-br from-elegant-500 to-teal-smoke-400',
  },
];

export default function VisualImpactBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % procedures.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % procedures.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + procedures.length) % procedures.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  const currentProcedure = procedures[currentSlide];
  const BadgeIcon = currentProcedure.badgeIcon;

  return (
    <div 
      className="relative h-screen min-h-[800px] overflow-hidden flex items-center z-10"
    >
      {/* 동적 배경 - 부드러운 그라데이션 애니메이션 */}
      <div className="absolute inset-0 animate-gradient-flow">
        {/* 보조 그라데이션 레이어 */}
        <div className="absolute inset-0 animate-elegant-flow opacity-40"></div>
        
        {/* 3D 배경 효과들 */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/12 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/4 rounded-full blur-3xl animate-spin-slow"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/15"></div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[700px]">
            
            {/* 왼쪽: 텍스트 콘텐츠 */}
            <div className="text-white space-y-10 transition-all duration-1000 ease-out">
              {/* 배지와 메타 */}
              <div className="flex flex-wrap items-center gap-4 mb-6 animate-fade-in-up">
                {currentProcedure.badge && BadgeIcon && (
                  <div className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-elegant-sans font-light text-teal-smoke-800 ${currentProcedure.badgeColor} shadow-lg transform hover:scale-105 transition-all duration-500 border border-white/30`}>
                    <BadgeIcon className="w-4 h-4 mr-2" />
                    {currentProcedure.badge}
                  </div>
                )}
                <div className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-elegant-sans font-light bg-white/20 text-white backdrop-blur-md border border-white/25 transition-all duration-500">
                  <Clock className="w-4 h-4 mr-2" />
                  {currentProcedure.duration}
                </div>
              </div>

              {/* 메인 타이틀 */}
              <div className="space-y-8 animate-fade-in-up" key={currentSlide}>
                <h1 className="text-5xl lg:text-7xl font-display font-light leading-none tracking-wide drop-shadow-xl transition-all duration-1000 ease-out">
                  {currentProcedure.title}
                </h1>
                
                <div className="w-20 h-0.5 bg-white/60 rounded-full shadow-sm transition-all duration-700"></div>
                
                <h2 className="text-2xl lg:text-3xl font-elegant font-light text-white/90 leading-relaxed transition-all duration-1000 ease-out">
                  {currentProcedure.subtitle}
                </h2>
                
                <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl transition-all duration-700 hover:bg-white/20">
                  <p className="text-xl lg:text-2xl font-elegant-sans font-light text-white/95 mb-2 transition-all duration-500">
                    {currentProcedure.description}  
                  </p>
                </div>
              </div>

              {/* 특징 배지 */}
              <div className="flex flex-wrap gap-3">
                {currentProcedure.features.map((feature, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-elegant-sans font-light bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all transform hover:scale-105"
                  >
                    <Zap className="w-3 h-3 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* CTA 버튼 */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="group bg-white/90 text-teal-smoke-800 hover:bg-white px-10 py-4 rounded-xl font-elegant-sans font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center">
                  <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  자세히 보기
                </button>
                <button className="bg-white/20 backdrop-blur-xl text-white hover:bg-white/30 px-10 py-4 rounded-xl font-elegant-sans font-light text-lg transition-all duration-300 border border-white/30 hover:border-white/50 shadow-lg">
                  상담 신청
                </button>
              </div>
            </div>

            {/* 오른쪽: 3D 비주얼 */}
            <div className="relative flex items-center justify-center h-full">
              {/* 메인 3D 카드 */}
              <div className="relative w-96 h-96 perspective-1000">
                <div className="relative w-full h-full transform-style-preserve-3d animate-pulse">
                  {/* 메인 카드 */}
                  <div className="absolute inset-0 bg-white/15 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl transform rotate-y-12 hover:rotate-y-0 transition-all duration-700">
                    <div className="p-8 h-full flex flex-col items-center justify-center text-center text-white transition-all duration-1000" key={`card-${currentSlide}`}>
                      <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-2xl mb-6 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-700 border border-white/30 animate-scale-in">
                        <div className="text-3xl font-display font-light transition-all duration-500">{currentSlide + 1}</div>
                      </div>
                      <h3 className="text-lg font-elegant font-light mb-2 transition-all duration-700">{currentProcedure.title}</h3>
                      <p className="text-white/70 text-sm font-elegant-sans font-light transition-all duration-500">{currentProcedure.duration}</p>
                    </div>
                  </div>

                  {/* 배경 카드들 (3D 효과) */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl transform -rotate-y-6 -translate-z-20 scale-95"></div>
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-lg transform -rotate-y-12 -translate-z-40 scale-90"></div>
                </div>

                {/* 플로팅 요소들 */}
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center animate-bounce shadow-xl">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center animate-bounce delay-500 shadow-xl">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-1/2 -right-12 w-12 h-12 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* 원형 궤도 애니메이션 */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full border-2 border-white/20 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-8 border border-white/10 rounded-full animate-spin-reverse-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 네비게이션 */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 backdrop-blur-xl hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 border border-white/30 shadow-2xl"
      >
        <ChevronLeft className="w-10 h-10 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 backdrop-blur-xl hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 border border-white/30 shadow-2xl"
      >
        <ChevronRight className="w-10 h-10 text-white" />
      </button>

      {/* 프로그레스 인디케이터 */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {procedures.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide 
                ? 'w-20 h-4 bg-white shadow-lg' 
                : 'w-4 h-4 bg-white/40 hover:bg-white/60 hover:scale-125'
            }`}
          />
        ))}
      </div>

      {/* 슬라이드 카운터 */}
      <div className="absolute bottom-8 right-8 bg-white/25 backdrop-blur-xl px-8 py-4 rounded-full text-white font-black text-xl z-20 border border-white/30 shadow-xl">
        시술 {currentSlide + 1} / {procedures.length}
      </div>
    </div>
  );
}