'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star, Clock, Zap, Heart, Award, Shield, Sparkles, Play, Camera, Stethoscope } from 'lucide-react';

const procedures = [
  {
    id: 1,
    mainTitle: '끌어올려!\n더 young해지는\n실로스 실리프팅',
    subTitle: '어려졌다! 나를 위한 커스텀 리프팅',
    mainTitle2: '어려졌어!\n실리프팅은, 실로스!',
    subTitle2: '절개는 싫고,\n주름은 피하고 싶은 당신을 위한\n어려지는 가장 빠른 방법, 실로스 실리프팅',
    badge: 'SIGNATURE',
    badgeIcon: Award,
    badgeColor: 'bg-gradient-to-r from-teal-smoke-300 to-teal-smoke-400',
    features: ['무절개', '즉시효과', '맞춤설계'],
    duration: '30분',
    image: '/images/banners/silos-lifting.jpg',
    route: '/procedures/silos-customizing-lifting/silos-lifting',
  },
  {
    id: 2,
    subTitle: '상안부 리프팅, 동안의 시작점',
    mainTitle: '이마 리프팅',
    subTitle2: '언제부턴가 노안?\n처진 이마와 눈썹은 올리고, 인상은 밝히고!',
    subTitle3: '호감형 동안의 완성',
    mainTitle2: '리프팅은 눈썹부터!\n실로스 이마 눈썹 리프팅',
    subTitle4: '한뼘 더 또렷하게, 한살 더 어리게!',
    badge: 'HOT',
    badgeIcon: Zap,
    badgeColor: 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400',
    features: ['내시경', '최소절개', '자연리프팅'],
    duration: '1시간',
    image: '/images/banners/forehead-lifting.jpg',
    route: '/procedures/forehead-eyebrow-lifting',
  },
  {
    id: 3,
    subTitle: '절개 NO! 회복 YES!',
    mainTitle: '눈밑 지방 레이저',
    subTitle2: '수술말고 레이저로 밝히는 눈밑\n티 안나게! 싹! 10분! 실로스 반달레이저',
    subTitle3: '다크서클, 실로스가 지웁니다.',
    mainTitle2: '10분 다크서클 레이저',
    subTitle4: '절개 없이, 피부 손상은 최소로\n일상 복귀는 바로!',
    badge: '10분 완성',
    badgeIcon: Clock,
    badgeColor: 'bg-gradient-to-r from-teal-smoke-300 to-elegant-300',
    features: ['비절개', '10분완성', '바로복귀'],
    duration: '10분',
    image: '/images/banners/under-eye-laser.jpg',
    route: '/procedures/under-eye-fat-laser/under-eye-fat-laser',
  },
  {
    id: 4,
    subTitle: '흡입은 부담스러우니까, 실로팻으로 쏙!',
    mainTitle: '실로팻 지방 추출주사',
    subTitle2: '지방분해주사보다 강력하게,\n원하는 부위의 지방만 쏙!',
    subTitle3: '미운 옆구리살, 뱃살, 팔뚝살, 지방만 쏙쏙!',
    mainTitle2: '실로팻 지방추출 주사',
    subTitle4: '통증은 NO! 지방은 바로 DOWN!',
    badge: 'No Pain',
    badgeIcon: Heart,
    badgeColor: 'bg-gradient-to-r from-elegant-300 to-teal-smoke-300',
    features: ['무통증', '주사만으로', '즉시확인'],
    duration: '20분',
    image: '/images/banners/silopat.jpg',
    route: '/procedures/silopat',
  },
  {
    id: 5,
    subTitle: '위도 아래도 눈은 전체가 중요합니다',
    mainTitle: '처진 눈 리프팅',
    subTitle2: '처진 눈꺼풀고 볼록하고 늘어난 눈밑까지\n한번에 개선하는 실로스 눈 리프팅',
    subTitle3: '위는 올리고, 아래는 팽팽하게!',
    mainTitle2: '실로스 처진 눈 리프팅',
    subTitle4: '첫인상은 눈에서 시작되니까!\n상한검 수술은 실력이 검증된 실로스에서',
    badge: 'PREMIUM',
    badgeIcon: Sparkles,
    badgeColor: 'bg-gradient-to-r from-teal-smoke-400 to-elegant-500',
    features: ['상하안검', '전체개선', '자연스러운'],
    duration: '1.5시간',
    image: '/images/banners/eye-lifting.jpg',
    route: '/procedures/eyelid-sagging-lifting',
  },
  {
    id: 6,
    subTitle: '매일 걱정인 볼륨&모공',
    mainTitle: '콜라채움으로 채워',
    subTitle2: '자가 콜라겐 생성 촉진으로\n자연스럽게 볼륨을 채우고, 탄력은 UP!',
    subTitle3: '흘러내리는 탄력, 콜라겐으로 채우다',
    mainTitle2: '콜라채움',
    subTitle4: '콜라겐은 바르는 게 아니라 채우는 것!\n피부 깊숙이, 속부터 바꿔주는 콜라겐 부스터',
    badge: 'NATURAL',
    badgeIcon: Shield,
    badgeColor: 'bg-gradient-to-r from-elegant-400 to-teal-smoke-500',
    features: ['콜라겐생성', '탄력개선', '모공축소'],
    duration: '30분',
    image: '/images/banners/collagen-fill.jpg',
    route: '/procedures/skin-lifting/collagen-fill',
  },
  {
    id: 7,
    subTitle: '울쎄라도, 리쥬란도',
    mainTitle: '이제 수면으로 편하게!',
    subTitle2: '실로스 수면마취 뷰티 클리닉',
    badge: 'NEW',
    badgeIcon: Sparkles,
    badgeColor: 'bg-gradient-to-r from-teal-smoke-500 to-elegant-400',
    features: ['수면마취', '무통증', '편안한시술'],
    duration: '1시간',
    image: '/images/banners/sleep-ulthera.jpg',
    route: null, // Special case - has dropdown
    routes: [
      { name: '울쎄라', path: '/procedures/laser-lifting/ulthera' },
      { name: '리쥬란', path: '/procedures/skin-lifting/rejuran' }
    ],
  },
  {
    id: 8,
    subTitle: '실로 당기고, 레이저로 채우다.',
    mainTitle: '10분, 넥코어 리프팅',
    subTitle2: '목 리프팅 전용 실로 당기고,\n독일 폭스 레이저로 탄력과 콜라겐을 동시에 채웁니다.',
    subTitle3: '눈은 속여도, 목은 못 속인다?',
    mainTitle2: '10min 넥코어 리프팅',
    subTitle4: '처짐 개선 + 탄력 회복 + 콜라겐 유도까지\n한번의 시술로 목 피부 고민을 해결하세요.',
    badge: '10분',
    badgeIcon: Clock,
    badgeColor: 'bg-gradient-to-r from-elegant-500 to-teal-smoke-400',
    features: ['리프팅실', '레이저듀얼', '10분완성'],
    duration: '10분',
    image: '/images/banners/neck-lifting.jpg',
    route: '/procedures/neck-lifting',
  },
];

export default function VisualImpactBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % procedures.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    console.log('nextSlide called');
    setCurrentSlide((prev) => (prev + 1) % procedures.length);
  };
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + procedures.length) % procedures.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  const handleDetailClick = () => {
    const procedure = procedures[currentSlide];
    if (procedure.route) {
      router.push(procedure.route);
    } else if (procedure.routes) {
      // For procedures with multiple routes (like 수면 울쎄라), show dropdown or navigate to first option
      // You can modify this to show a dropdown menu instead
      router.push(procedure.routes[0].path);
    }
  };

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
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[700px]">
            
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

              {/* 메인 타이틀 - Box 1 */}
              <div className="space-y-4 animate-fade-in-up" key={currentSlide}>
                {/* Box 1 */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-lg transition-all duration-700 hover:bg-white/15 mb-4">
                  {currentProcedure.subTitle && (
                    <p className="text-sm font-elegant-sans font-light text-white/85 mb-2 leading-relaxed">
                      {currentProcedure.subTitle}
                    </p>
                  )}
                  {currentProcedure.mainTitle && (
                    <h1 className="text-2xl lg:text-3xl font-display font-bold leading-tight tracking-wide drop-shadow-lg mb-2 whitespace-pre-line">
                      {currentProcedure.mainTitle.includes('young') ? (
                        currentProcedure.mainTitle.split('young').map((part, index) => (
                          <span key={index}>
                            {part}
                            {index < currentProcedure.mainTitle.split('young').length - 1 && (
                              <span className="italic">young</span>
                            )}
                          </span>
                        ))
                      ) : (
                        currentProcedure.mainTitle
                      )}
                    </h1>
                  )}
                  {currentProcedure.subTitle2 && (
                    <p className="text-sm font-elegant-sans font-light text-white/80 leading-relaxed whitespace-pre-line">
                      {currentProcedure.subTitle2}
                    </p>
                  )}
                </div>

                {/* Box 2 */}
                {(currentProcedure.mainTitle2 || currentProcedure.subTitle3) && (
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-lg transition-all duration-700 hover:bg-white/15">
                    {currentProcedure.subTitle3 && (
                      <p className="text-sm font-elegant-sans font-light text-white/85 mb-2 leading-relaxed">
                        {currentProcedure.subTitle3}
                      </p>
                    )}
                    {currentProcedure.mainTitle2 && (
                      <h2 className="text-xl lg:text-2xl font-display font-bold leading-tight tracking-wide drop-shadow-lg mb-2 whitespace-pre-line">
                        {currentProcedure.mainTitle2.includes('어려졌어!') ? (
                          currentProcedure.mainTitle2.split('어려졌어!').map((part, index) => (
                            <span key={index}>
                              {index > 0 && <span className="italic">어려졌어!</span>}
                              {part}
                            </span>
                          ))
                        ) : currentProcedure.mainTitle2.includes('실로스 이마 눈썹 리프팅') ? (
                          <span className="italic">{currentProcedure.mainTitle2}</span>
                        ) : currentProcedure.mainTitle2.includes('다크서클, 실로스가 지웁니다.') ? (
                          <span className="italic">{currentProcedure.mainTitle2}</span>
                        ) : currentProcedure.mainTitle2.includes('미운 옆구리살') ? (
                          <span className="italic">{currentProcedure.mainTitle2}</span>
                        ) : (
                          currentProcedure.mainTitle2
                        )}
                      </h2>
                    )}
                    {currentProcedure.subTitle4 && (
                      <p className="text-sm font-elegant-sans font-light text-white/80 leading-relaxed whitespace-pre-line">
                        {currentProcedure.subTitle4}
                      </p>
                    )}
                  </div>
                )}
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
                <button 
                  onClick={handleDetailClick}
                  className="group bg-white/90 text-teal-smoke-800 hover:bg-white px-10 py-4 rounded-xl font-elegant-sans font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  자세히 보기
                </button>
                <button className="bg-white/20 backdrop-blur-xl text-white hover:bg-white/30 px-10 py-4 rounded-xl font-elegant-sans font-light text-lg transition-all duration-300 border border-white/30 hover:border-white/50 shadow-lg">
                  상담 신청
                </button>
              </div>
            </div>

            {/* 오른쪽: 3D 비주얼 */}
            <div className="relative flex items-center justify-start h-full">
              {/* 메인 이미지 카드 */}
              <div className="relative">
                {currentProcedure.image ? (
                  <div className="relative inline-block bg-white/5 rounded-3xl border border-white/20 shadow-2xl hover:scale-105 transition-all duration-700 overflow-hidden">
                    <Image 
                      src={currentProcedure.image}
                      alt={currentProcedure.title}
                      width={600}
                      height={450}
                      className="object-cover rounded-3xl"
                      sizes="(max-width: 768px) 100vw, 600px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-3xl" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-center text-white">
                      <h3 className="text-2xl font-elegant font-light mb-2">{currentProcedure.title}</h3>
                      <p className="text-white/90 text-sm font-elegant-sans font-light">{currentProcedure.duration}</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-[600px] h-[450px] bg-white/5 rounded-3xl border border-white/20 shadow-2xl hover:scale-105 transition-all duration-700 overflow-hidden">
                      <div className="p-8 h-full flex flex-col items-center justify-center text-center text-white transition-all duration-1000" key={`card-${currentSlide}`}>
                        <div className="w-32 h-32 bg-white/20 rounded-2xl mb-6 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-700 border border-white/30">
                          <div className="text-3xl font-display font-light transition-all duration-500">{currentSlide + 1}</div>
                        </div>
                        <h3 className="text-lg font-elegant font-light mb-2 transition-all duration-700">{currentProcedure.title}</h3>
                        <p className="text-white/70 text-sm font-elegant-sans font-light transition-all duration-500">{currentProcedure.duration}</p>
                      </div>
                  </div>
                )}

                {/* 플로팅 요소들 */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center animate-bounce shadow-xl">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center animate-bounce delay-500 shadow-xl">
                  <Stethoscope className="w-6 h-6 text-white" />
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
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-[999]">
        <button
          onClick={prevSlide}
          className="w-16 h-16 bg-white/40 hover:bg-white/60 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-white/70 shadow-2xl"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
      </div>
      
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-[999]">
        <button
          onClick={nextSlide}
          type="button"
          className="w-16 h-16 bg-white/40 hover:bg-white/60 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-white/70 shadow-2xl cursor-pointer"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>

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