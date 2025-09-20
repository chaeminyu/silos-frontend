'use client';

// src/app/page.tsx
// MobileCategoryGrid moved to navigation dropdown
import StandardConsultationSection from '../components/StandardConsultationSection';
import MonthlyEventPopup from '../components/MonthlyEventPopup';
import PageLayout from '../components/PageLayout';
import { useState, useEffect } from 'react';
import { Sparkles, Clock, ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { eventService } from '../services/eventService';
import { youtubeService, YouTubeVideo } from '../services/youtubeService';

export default function HomePage() {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [currentWhySilosIndex, setCurrentWhySilosIndex] = useState(0);
  const [isWhySilosTransitioning, setIsWhySilosTransitioning] = useState(true);
  const [, setIsMobile] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [popularVideos, setPopularVideos] = useState<YouTubeVideo[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check for ongoing events and show popup
  useEffect(() => {
    const checkEventPopup = async () => {
      try {
        // Check if user has dismissed popup today
        const dismissedToday = localStorage.getItem('eventPopupDismissedDate');
        const today = new Date().toDateString();
        
        if (dismissedToday === today) {
          return; // Don't show popup if dismissed today
        }

        // Fetch ongoing events
        const ongoingEvents = await eventService.getOngoingEvents();
        
        if (ongoingEvents.length > 0) {
          // Show popup after a short delay for better UX
          setTimeout(() => {
            setShowEventPopup(true);
          }, 1000);
        }
      } catch (error) {
        console.error('Error checking event popup:', error);
      }
    };

    checkEventPopup();
  }, []);

  // YouTube 동영상 데이터 가져오기
  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      setIsLoadingVideos(true);
      try {
        // 최신 동영상 (날짜순)
        const latestVideos = await youtubeService.getLatestVideos(6);
        setYoutubeVideos(latestVideos);

        // 인기 동영상 (별도로 가져오거나 최신 동영상 중에서 선별)
        // YouTube API에서 viewCount 정렬이 잘 안되므로 최신 영상 중에서 사용
        const popularVids = latestVideos.slice(2, 6); // 최신 3~6번째 영상을 인기 영상으로 사용
        setPopularVideos(popularVids);
      } catch (error) {
        console.error('YouTube 동영상 로딩 중 오류:', error);
      } finally {
        setIsLoadingVideos(false);
      }
    };

    fetchYouTubeVideos();
  }, []);


  const handleCloseEventPopup = () => {
    setShowEventPopup(false);
  };

  const handleDontShowToday = () => {
    const today = new Date().toDateString();
    localStorage.setItem('eventPopupDismissedDate', today);
    setShowEventPopup(false);
  };
  
  // Gallery data
  const galleryItems = [
    { id: 1, gradient: 'from-teal-smoke-100 to-teal-smoke-200' },
    { id: 2, gradient: 'from-elegant-100 to-elegant-200' },
    { id: 3, gradient: 'from-teal-smoke-200 to-elegant-200' },
    { id: 4, gradient: 'from-elegant-200 to-teal-smoke-300' },
    { id: 5, gradient: 'from-teal-smoke-300 to-elegant-300' },
    { id: 6, gradient: 'from-elegant-300 to-teal-smoke-200' }
  ];

  // Why Silos data
  const whySilosItems = [
    {
      id: 1,
      title: '맞춤형 시술',
      description: '개인별 얼굴 구조와 특성을 분석하여 최적의 시술 계획을 제안합니다.',
      iconGradient: 'from-teal-smoke-200 to-teal-smoke-300',
      iconBg: 'bg-teal-smoke-400',
      borderColor: 'border-teal-smoke-200/50'
    },
    {
      id: 2,
      title: '안전한 시술',
      description: 'FDA 승인 제품과 첨단 장비를 사용하여 안전하고 효과적인 시술을 제공합니다.',
      iconGradient: 'from-elegant-200 to-elegant-300',
      iconBg: 'bg-elegant-400',
      borderColor: 'border-elegant-200/50'
    },
    {
      id: 3,
      title: '자연스러운 결과',
      description: '과도하지 않은 자연스러운 변화로 본연의 아름다움을 극대화시킵니다.',
      iconGradient: 'from-teal-smoke-300 to-elegant-300',
      iconBg: 'bg-gradient-to-br from-teal-smoke-400 to-elegant-400',
      borderColor: 'border-teal-smoke-200/50'
    }
  ];

  // Representative procedures data
  const representativeProcedures = [
    {
      id: 'silos-lifting',
      title: '실로스 리프팅',
      subtitle: 'SILOS THREAD LIFTING',
      shortDesc: '실로스만의 특허받은 실리프팅 기법으로 자연스러운 리프팅 효과',
      route: '/procedures/silos-lifting',
      features: ['무절개', '즉시효과', '자연스러움'],
      duration: '30분',
      gradient: 'from-teal-smoke-400 to-elegant-500',
      icon: '🧵',
      image: '/images/home-procedures/silos-lifting.jpg'
    },
    {
      id: 'silopat',
      title: '실로팻',
      subtitle: 'SILOPAT FAT DISSOLVING',
      shortDesc: '실로스 독자개발 지방분해 주사로 안전하고 효과적인 부분 지방 감소',
      route: '/silofat',
      features: ['무통증', '즉시회복', '부분감소'],
      duration: '20분',
      gradient: 'from-elegant-400 to-teal-smoke-500',
      icon: '💉',
      image: '/images/home-procedures/silofat.jpg'
    },
    {
      id: 'mini-lifting',
      title: '미니 리프팅',
      subtitle: 'MINI LIFTING',
      shortDesc: '최소 절개로 최대 효과를 내는 프리미엄 미니 리프팅',
      route: '/procedures/mini-lifting',
      features: ['최소절개', '빠른회복', '자연결과'],
      duration: '60분',
      gradient: 'from-teal-smoke-500 to-elegant-400',
      icon: '✨',
      image: '/images/home-procedures/mini-lifting.png'
    },
    {
      id: 'skin-lifting',
      title: '스킨 리프팅',
      subtitle: 'SKIN LIFTING',
      shortDesc: '콜라겐 리모델링으로 피부 탄력과 리프팅을 동시에',
      route: '/procedures/skin-lifting',
      features: ['비절개', '탄력개선', '자연리프팅'],
      duration: '15분',
      gradient: 'from-elegant-500 to-teal-smoke-400',
      icon: '🌟',
      image: '/images/home-procedures/skin-lifting.jpg'
    }
  ];

  // Auto-rotation for gallery with circular motion
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGalleryIndex((prevIndex) => {
        if (prevIndex >= galleryItems.length) {
          // Reset to first item without animation
          setIsTransitioning(false);
          setTimeout(() => {
            setCurrentGalleryIndex(1);
            setIsTransitioning(true);
          }, 50);
          return 0;
        }
        return prevIndex + 1;
      });
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, [galleryItems.length]);

  // Auto-rotation for Why Silos with circular motion
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWhySilosIndex((prevIndex) => {
        if (prevIndex >= whySilosItems.length) {
          // Reset to first item without animation
          setIsWhySilosTransitioning(false);
          setTimeout(() => {
            setCurrentWhySilosIndex(1);
            setIsWhySilosTransitioning(true);
          }, 50);
          return 0;
        }
        return prevIndex + 1;
      });
    }, 4000); // Rotate every 4 seconds (slightly slower than gallery)

    return () => clearInterval(interval);
  }, [whySilosItems.length]);

  // Handle transition end for seamless loop (Gallery)
  useEffect(() => {
    if (currentGalleryIndex === galleryItems.length && isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentGalleryIndex(0);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500);
    }
  }, [currentGalleryIndex, galleryItems.length, isTransitioning]);

  // Handle transition end for seamless loop (Why Silos)
  useEffect(() => {
    if (currentWhySilosIndex === whySilosItems.length && isWhySilosTransitioning) {
      setTimeout(() => {
        setIsWhySilosTransitioning(false);
        setCurrentWhySilosIndex(0);
        setTimeout(() => setIsWhySilosTransitioning(true), 50);
      }, 500);
    }
  }, [currentWhySilosIndex, whySilosItems.length, isWhySilosTransitioning]);

  return (
    <PageLayout>

      {/* 메인 컨텐츠 - PC: 배너 슬라이더, 모바일: 카테고리 그리드 */}
      <main className="w-full">
        {/* ROTATING PROCEDURE CARDS - 주석처리됨 (향후 사용 가능) */}
        {/* 
        <div className="hidden lg:block">
          <Suspense fallback={<div className="h-screen flex items-center justify-center text-2xl font-elegant-sans font-light text-slate-700">Loading...</div>}>
            <MainBannerSlider />
          </Suspense>
        </div>
        */}
        
        {/* 비디오 섹션 - PC/모바일 모두 표시 */}
        <section className="relative h-screen w-full overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/silos-main-4k.mp4" type="video/mp4" />
            </video>
            {/* Fallback gradient if video doesn't load */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-500 to-elegant-500" style={{zIndex: -1}}></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-6">
                <h1 className="text-3xl font-display font-light mb-4 tracking-wide">
                  실로스
                  <span className="block text-4xl font-medium mt-2">성형외과</span>
                </h1>
                <div className="w-16 h-0.5 bg-white/60 rounded-full mx-auto mb-4"></div>
                <p className="text-base font-elegant-sans font-light leading-relaxed text-white/90">
                  자연스러운 아름다움을 추구합니다
                </p>
              </div>
            </div>
            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </section>
        
        {/* 가이드 배너 - 현재 숨김 처리됨 (프로젝트에는 유지) */}
        {/* <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-700 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-display font-medium text-white mb-1">
                  실로스 홈페이지 이용 방법
                </h3>
                <p className="text-sm font-elegant-sans text-cyan-100">
                  점검용으로 웹페이지 둘러보실 때 보세요!
                </p>
              </div>
              <a
                href="/guide"
                className="inline-flex items-center px-6 py-3 bg-white text-cyan-700 rounded-xl font-elegant-sans font-medium hover:bg-cyan-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 relative z-50"
              >
                가이드 보기
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div> */}
        
        {/* 실로스 소개 섹션 - 모바일/PC 모두 표시 */}
        <section id="about" className="w-full py-24 bg-gradient-to-br from-teal-smoke-50 via-white to-elegant-100">
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-cyan-800 mb-6 tracking-wide">왜 실로스인가?</h2>
                <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-8"></div>
                <p className="text-lg md:text-xl font-elegant-sans font-light text-slate-700 max-w-3xl mx-auto leading-relaxed">
                  실리프팅의 새로운 기준, 실로스가 제시하는 차별화된 시술 철학
                </p>
              </div>
              
              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-8 justify-items-center">
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 w-full max-w-sm border border-teal-smoke-200/50">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-smoke-200 to-teal-smoke-300 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg">
                    <div className="w-10 h-10 bg-teal-smoke-400 rounded-xl opacity-70"></div>
                  </div>
                  <h3 className="text-xl font-elegant font-light text-cyan-800 mb-6 text-center tracking-wide">맞춤형 시술</h3>
                  <p className="text-slate-700 text-center font-elegant-sans font-light leading-relaxed">개인별 얼굴 구조와 특성을 분석하여 최적의 시술 계획을 제안합니다.</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 w-full max-w-sm border border-elegant-200/50">
                  <div className="w-20 h-20 bg-gradient-to-br from-elegant-200 to-elegant-300 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg">
                    <div className="w-10 h-10 bg-elegant-400 rounded-xl opacity-70"></div>
                  </div>
                  <h3 className="text-xl font-elegant font-light text-cyan-800 mb-6 text-center tracking-wide">안전한 시술</h3>
                  <p className="text-slate-700 text-center font-elegant-sans font-light leading-relaxed">FDA 승인 제품과 첨단 장비를 사용하여 안전하고 효과적인 시술을 제공합니다.</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 w-full max-w-sm border border-teal-smoke-200/50">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-smoke-300 to-elegant-300 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-smoke-400 to-elegant-400 rounded-xl opacity-70"></div>
                  </div>
                  <h3 className="text-xl font-elegant font-light text-cyan-800 mb-6 text-center tracking-wide">자연스러운 결과</h3>
                  <p className="text-slate-700 text-center font-elegant-sans font-light leading-relaxed">과도하지 않은 자연스러운 변화로 본연의 아름다움을 극대화시킵니다.</p>
                </div>
              </div>

              {/* Mobile Horizontal Swipe with Auto-rotation */}
              <div className="md:hidden overflow-hidden pb-4">
                <div 
                  className={`flex space-x-4 px-4 ${isWhySilosTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                  style={{ 
                    transform: `translateX(-${currentWhySilosIndex * (288 + 16)}px)` // 288px = w-72 + 16px = gap
                  }}
                >
                  {/* Duplicate items for seamless infinite scroll */}
                  {[...whySilosItems, ...whySilosItems].map((item, index) => (
                    <div key={`${item.id}-${Math.floor(index / whySilosItems.length)}`} className={`bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg flex-shrink-0 w-72 border ${item.borderColor}`}>
                      <div className={`w-16 h-16 bg-gradient-to-br ${item.iconGradient} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                        <div className={`w-8 h-8 ${item.iconBg} rounded-xl opacity-70`}></div>
                      </div>
                      <h3 className="text-lg font-elegant font-light text-cyan-800 mb-4 text-center tracking-wide">{item.title}</h3>
                      <p className="text-slate-700 text-center font-elegant-sans font-light leading-relaxed text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
                
                {/* Auto-rotation indicators */}
                <div className="flex justify-center mt-4 space-x-2">
                  {whySilosItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsWhySilosTransitioning(true);
                        setCurrentWhySilosIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === (currentWhySilosIndex % whySilosItems.length)
                          ? 'bg-teal-smoke-500 w-8' 
                          : 'bg-teal-smoke-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 시술 안내 섹션 - 히어로 스타일 */}
        <section id="procedures" className="w-full relative overflow-hidden">
          {/* 히어로 배경 */}
          <div className="relative pb-16 overflow-hidden aspect-video">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/images/main-face.jpeg)' }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-smoke-400/20 to-elegant-400/50"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/30"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
                <div className="md:order-1 hidden md:block">
                  {/* 데스크톱: 왼쪽은 이미지가 보이도록 비워둡니다 */}
                </div>
                
                <div className="md:order-2 text-white space-y-4 md:space-y-6 py-8 md:py-0">
                  {/* 모바일: 오른쪽 정렬, 데스크톱: 왼쪽 정렬 */}
                  <div className="flex justify-end md:justify-start">
                    <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-elegant-sans font-medium border border-white/30">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      SILOS REPRESENTATIVE PROCEDURES
                    </div>
                  </div>
                  
                  <div className="text-right md:text-left">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-light mb-4 md:mb-6 tracking-wide leading-tight">
                      대표 시술
                    </h2>
                    <div className="w-20 sm:w-24 h-0.5 bg-white/60 rounded-full mb-4 md:mb-6 ml-auto md:ml-0 md:mr-auto"></div>
                    <p className="text-base sm:text-lg lg:text-xl font-elegant-sans font-light leading-relaxed text-white/90 max-w-xl ml-auto md:ml-0 md:mr-auto">
                      실로스만의 특화된 시술로<br className="sm:hidden" /> 더 젊고 아름다운 모습을 만나보세요
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 카드 섹션 */}
          <div className="w-full py-24 bg-gradient-to-br from-white via-teal-smoke-50 to-elegant-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* 카드 그리드 - 모바일 2x2, 데스크톱 4열 */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {representativeProcedures.map((procedure) => (
                  <Link
                    key={procedure.id}
                    href={procedure.route}
                    className="group block"
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-white/50 h-full">
                      {/* 카드 이미지 헤더 */}
                      <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden">
                        {/* 배경 이미지 */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${procedure.image})` }}
                        ></div>
                        {/* 틴트 오버레이 */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${procedure.gradient} opacity-35`}></div>
                        <div className="absolute inset-0 bg-black/10"></div>
                        
                        {/* 텍스트 콘텐츠 */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
                          <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                            {procedure.icon}
                          </div>
                          <h3 className="text-base sm:text-lg lg:text-xl font-display font-semibold text-white mb-1 tracking-wide drop-shadow-md">
                            {procedure.title}
                          </h3>
                          <p className="text-xs sm:text-sm font-elegant-sans font-light text-white/90 hidden sm:block">
                            {procedure.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* 카드 콘텐츠 - 모바일에서 간소화 */}
                      <div className="p-3 sm:p-4 lg:p-5">
                        <p className="text-slate-700 font-elegant-sans font-light text-xs sm:text-sm leading-relaxed mb-3 lg:mb-4 line-clamp-2 sm:line-clamp-3">
                          {procedure.shortDesc}
                        </p>

                        {/* 특징 배지들 - 모바일에서 1개만 표시 */}
                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 lg:mb-4">
                          {procedure.features.slice(0, 2).map((feature, i) => (
                            <div key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-elegant-sans font-medium bg-gradient-to-r from-teal-smoke-100 to-elegant-100 text-cyan-800 border border-teal-smoke-200">
                              <Sparkles className="w-2.5 h-2.5 mr-1" />
                              <span className="text-xs">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* 시술시간과 더보기 */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <div className="inline-flex items-center text-xs font-elegant-sans font-medium text-cyan-800">
                            <Clock className="w-3 h-3 mr-1" />
                            {procedure.duration}
                          </div>
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-teal-smoke-500 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* 상담 신청 CTA */}
              <div className="text-center mt-16">
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 max-w-2xl mx-auto">
                  <h3 className="text-2xl font-display font-medium text-cyan-800 mb-4">
                    맞춤 상담 받아보세요
                  </h3>
                  <p className="text-slate-700 font-elegant-sans font-light mb-6 leading-relaxed">
                    전문의와의 1:1 상담으로 가장 적합한 시술을 추천받으세요
                  </p>
                  <Link
                    href="/consultation/request"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white rounded-xl font-elegant-sans font-medium hover:from-teal-smoke-600 hover:to-elegant-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    <ShoppingCart className="w-5 h-5 mr-3" />
                    온라인 상담 신청
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* YouTube 섹션 */}
        <section id="youtube" className="w-full py-24 bg-gradient-to-br from-slate-50 via-white to-teal-smoke-50">
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-cyan-800 mb-6 tracking-wide">SILOS YOUTUBE</h2>
                <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-8"></div>
                <p className="text-lg md:text-xl font-elegant-sans font-light text-slate-700 max-w-4xl mx-auto leading-relaxed">
                  실로 만나는 아름다움 <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-teal-smoke-100 to-elegant-100 rounded-md text-cyan-800 font-medium mx-1 text-sm md:text-base">실로스의원</span><br className="block sm:hidden" />
                  알짜배기 정보로 가득한 <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-elegant-100 to-teal-smoke-100 rounded-md text-cyan-800 font-medium mx-1 text-sm md:text-base">실로테레비</span>
                </p>
              </div>

              <div className="space-y-12">
                {/* 메인 동영상 - 기존 대표 영상 유지 */}
                <div className="text-center">
                  <h3 className="text-xl font-elegant font-medium text-cyan-800 mb-6">SILOS 전문의가 알려드립니다!</h3>
                  <div className="relative max-w-4xl mx-auto">
                    <a 
                      href="https://www.youtube.com/watch?v=aYLEbz7aHgg" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block relative group"
                    >
                      <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                        {/* YouTube 썸네일 */}
                        <img 
                          src="https://img.youtube.com/vi/aYLEbz7aHgg/maxresdefault.jpg"
                          alt="실로스 대표 영상"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                            if (nextSibling) {
                              nextSibling.style.display = 'flex';
                            }
                          }}
                        />
                        {/* 썸네일 로딩 실패 시 대체 콘텐츠 */}
                        <div className="w-full h-full bg-gradient-to-br from-teal-smoke-200 to-elegant-200 hidden items-center justify-center">
                          <div className="text-center">
                            <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                            <p className="text-white font-elegant-sans">실로스 대표 영상</p>
                          </div>
                        </div>
                        {/* 재생 버튼 오버레이 */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                          <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                            <svg className="w-8 h-8 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* 2x2 그리드 - 인기 동영상 & 최근 동영상 */}
                <div>
                  {/* PC 버전 */}
                  <div className="hidden lg:grid lg:grid-cols-2 gap-12">
                    {/* 인기 동영상 */}
                    <div>
                      <h3 className="text-xl font-elegant font-medium text-cyan-800 mb-6">인기 동영상</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {isLoadingVideos ? (
                          <>
                            <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden shadow-lg animate-pulse">
                              <div className="w-full h-full bg-slate-300"></div>
                            </div>
                            <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden shadow-lg animate-pulse">
                              <div className="w-full h-full bg-slate-300"></div>
                            </div>
                          </>
                        ) : popularVideos.length >= 2 ? (
                          popularVideos.slice(0, 2).map((video) => (
                            <a 
                              key={video.id.videoId}
                              href={youtubeService.getVideoUrl(video.id.videoId)} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block group"
                            >
                              <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                                <img 
                                  src={youtubeService.getThumbnailUrl(video)}
                                  alt={video.snippet.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                                    if (nextSibling) {
                                      nextSibling.style.display = 'flex';
                                    }
                                  }}
                                />
                                <div className="w-full h-full bg-gradient-to-br from-teal-smoke-200 to-elegant-200 hidden items-center justify-center relative">
                                  <div className="text-center text-slate-700">
                                    <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-2">
                                      <svg className="w-6 h-6 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                      </svg>
                                    </div>
                                    <p className="text-sm font-elegant-sans">{video.snippet.title.slice(0, 20)}...</p>
                                  </div>
                                </div>
                                {/* 재생 버튼 오버레이 */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors opacity-0 group-hover:opacity-100">
                                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-6 h-6 text-red-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M8 5v14l11-7z"/>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </a>
                          ))
                        ) : (
                          <>
                            <div className="aspect-video bg-gradient-to-br from-teal-smoke-200 to-elegant-200 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
                              <div className="text-center text-slate-700">
                                <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-2">
                                  <svg className="w-6 h-6 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                                <p className="text-sm font-elegant-sans">인기 영상 1</p>
                              </div>
                            </div>
                            <div className="aspect-video bg-gradient-to-br from-elegant-200 to-teal-smoke-200 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
                              <div className="text-center text-slate-700">
                                <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-2">
                                  <svg className="w-6 h-6 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                                <p className="text-sm font-elegant-sans">인기 영상 2</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* 최근 동영상 */}
                    <div>
                      <h3 className="text-xl font-elegant font-medium text-cyan-800 mb-6">최근 동영상</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {isLoadingVideos ? (
                          <>
                            <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden shadow-lg animate-pulse">
                              <div className="w-full h-full bg-slate-300"></div>
                            </div>
                            <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden shadow-lg animate-pulse">
                              <div className="w-full h-full bg-slate-300"></div>
                            </div>
                          </>
                        ) : youtubeVideos.length >= 3 ? (
                          youtubeVideos.slice(1, 3).map((video, index) => (
                            <a 
                              key={video.id.videoId}
                              href={youtubeService.getVideoUrl(video.id.videoId)} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block group"
                            >
                              <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                                <img 
                                  src={youtubeService.getThumbnailUrl(video)}
                                  alt={video.snippet.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                                    if (nextSibling) {
                                      nextSibling.style.display = 'flex';
                                    }
                                  }}
                                />
                                <div className={`w-full h-full bg-gradient-to-br ${index === 0 ? 'from-teal-smoke-300 to-elegant-300' : 'from-elegant-300 to-teal-smoke-300'} hidden items-center justify-center relative`}>
                                  <div className="text-center text-slate-700">
                                    <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-2">
                                      <svg className="w-6 h-6 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                      </svg>
                                    </div>
                                    <p className="text-sm font-elegant-sans">{video.snippet.title.slice(0, 20)}...</p>
                                  </div>
                                </div>
                                {/* 재생 버튼 오버레이 */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors opacity-0 group-hover:opacity-100">
                                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-6 h-6 text-red-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M8 5v14l11-7z"/>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </a>
                          ))
                        ) : (
                          <>
                            <div className="aspect-video bg-gradient-to-br from-teal-smoke-300 to-elegant-300 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
                              <div className="text-center text-slate-700">
                                <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-2">
                                  <svg className="w-6 h-6 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                                <p className="text-sm font-elegant-sans">최신 영상 1</p>
                              </div>
                            </div>
                            <div className="aspect-video bg-gradient-to-br from-elegant-300 to-teal-smoke-300 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
                              <div className="text-center text-slate-700">
                                <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-2">
                                  <svg className="w-6 h-6 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                                <p className="text-sm font-elegant-sans">최신 영상 2</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 모바일 버전 - 진짜 2x2 그리드 */}
                  <div className="lg:hidden">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-elegant font-medium text-cyan-800 mb-2">놓치면 후회할 베스트 콘텐츠</h3>
                      <p className="text-sm text-slate-600 font-elegant-sans">전문의가 직접 알려주는 뷰티 꿀팁과 최신 시술 정보</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {/* 인기 영상 1 */}
                      <div>
                        <p className="text-xs text-slate-600 mb-2 text-center font-medium">🔥 HOT</p>
                        {popularVideos[0] ? (
                          <a 
                            href={youtubeService.getVideoUrl(popularVideos[0].id.videoId)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                              <img 
                                src={youtubeService.getThumbnailUrl(popularVideos[0])} 
                                alt={popularVideos[0].snippet.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                  if (nextElement) {
                                    nextElement.style.display = 'flex';
                                  }
                                }}
                              />
                              <div className="w-full h-full bg-gradient-to-br from-teal-smoke-200 to-elegant-200 items-center justify-center relative hidden">
                                <div className="text-center text-slate-700">
                                  <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-1">
                                    <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M8 5v14l11-7z"/>
                                    </svg>
                                  </div>
                                  <p className="text-xs font-elegant-sans font-medium">BEST</p>
                                </div>
                              </div>
                            </div>
                          </a>
                        ) : (
                          <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden shadow-lg">
                            <div className="w-full h-full bg-gradient-to-br from-teal-smoke-200 to-elegant-200 flex items-center justify-center relative">
                              <div className="text-center text-slate-700">
                                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-1">
                                  <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                                <p className="text-xs font-elegant-sans font-medium">로딩중...</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 인기 영상 2 */}
                      <div>
                        <p className="text-xs text-slate-600 mb-2 text-center font-medium">🔥 HOT</p>
                        {popularVideos[1] ? (
                          <a 
                            href={youtubeService.getVideoUrl(popularVideos[1].id.videoId)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                              <img 
                                src={youtubeService.getThumbnailUrl(popularVideos[1])} 
                                alt={popularVideos[1].snippet.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                  if (nextElement) {
                                    nextElement.style.display = 'flex';
                                  }
                                }}
                              />
                              <div className="w-full h-full bg-gradient-to-br from-elegant-200 to-teal-smoke-200 items-center justify-center relative hidden">
                                <div className="text-center text-slate-700">
                                  <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-1">
                                    <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M8 5v14l11-7z"/>
                                    </svg>
                                  </div>
                                  <p className="text-xs font-elegant-sans font-medium">BEST</p>
                                </div>
                              </div>
                            </div>
                          </a>
                        ) : (
                          <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden shadow-lg">
                            <div className="w-full h-full bg-gradient-to-br from-elegant-200 to-teal-smoke-200 flex items-center justify-center relative">
                              <div className="text-center text-slate-700">
                                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-1">
                                  <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                                <p className="text-xs font-elegant-sans font-medium">로딩중...</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 최신 영상 1 */}
                      <div>
                        <p className="text-xs text-slate-600 mb-2 text-center font-medium">✨ NEW</p>
                        {youtubeVideos[1] ? (
                          <a 
                            href={youtubeService.getVideoUrl(youtubeVideos[1].id.videoId)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                              <img 
                                src={youtubeService.getThumbnailUrl(youtubeVideos[1])} 
                                alt={youtubeVideos[1].snippet.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                  if (nextElement) {
                                    nextElement.style.display = 'flex';
                                  }
                                }}
                              />
                              <div className="w-full h-full bg-gradient-to-br from-teal-smoke-300 to-elegant-300 items-center justify-center relative hidden">
                                <div className="text-center text-slate-700">
                                  <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-1">
                                    <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M8 5v14l11-7z"/>
                                    </svg>
                                  </div>
                                  <p className="text-xs font-elegant-sans font-medium">NEW</p>
                                </div>
                              </div>
                            </div>
                          </a>
                        ) : (
                          <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden shadow-lg">
                            <div className="w-full h-full bg-gradient-to-br from-teal-smoke-300 to-elegant-300 flex items-center justify-center relative">
                              <div className="text-center text-slate-700">
                                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-1">
                                  <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                                <p className="text-xs font-elegant-sans font-medium">로딩중...</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 최신 영상 2 */}
                      <div>
                        <p className="text-xs text-slate-600 mb-2 text-center font-medium">✨ NEW</p>
                        {youtubeVideos[2] ? (
                          <a 
                            href={youtubeService.getVideoUrl(youtubeVideos[2].id.videoId)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                              <img 
                                src={youtubeService.getThumbnailUrl(youtubeVideos[2])} 
                                alt={youtubeVideos[2].snippet.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                  if (nextElement) {
                                    nextElement.style.display = 'flex';
                                  }
                                }}
                              />
                              <div className="w-full h-full bg-gradient-to-br from-elegant-300 to-teal-smoke-300 items-center justify-center relative hidden">
                                <div className="text-center text-slate-700">
                                  <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-1">
                                    <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M8 5v14l11-7z"/>
                                    </svg>
                                  </div>
                                  <p className="text-xs font-elegant-sans font-medium">NEW</p>
                                </div>
                              </div>
                            </div>
                          </a>
                        ) : (
                          <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden shadow-lg">
                            <div className="w-full h-full bg-gradient-to-br from-elegant-300 to-teal-smoke-300 flex items-center justify-center relative">
                              <div className="text-center text-slate-700">
                                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-1">
                                  <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                                <p className="text-xs font-elegant-sans font-medium">로딩중...</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 채널 방문 버튼 */}
                <div className="text-center">
                  <a
                    href="https://www.youtube.com/@실로테레비"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-elegant-sans font-medium text-base hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                  >
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    더보기
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 갤러리 섹션 - 모바일/PC 모두 표시 */}
        <section id="gallery" className="w-full py-24 bg-gradient-to-br from-elegant-50 via-teal-smoke-100 to-white">
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-cyan-800 mb-6 tracking-wide">Before & After</h2>
                <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-8"></div>
                <p className="text-lg md:text-xl font-elegant-sans font-light text-slate-700 max-w-3xl mx-auto leading-relaxed">
                  실로스에서 새로운 아름다움을 찾은 고객들의 변화를 확인하세요
                </p>
              </div>
              
              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {galleryItems.map((item) => (
                  <div key={item.id} className="bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 w-full max-w-sm border border-teal-smoke-200/30">
                    <div className={`aspect-square bg-gradient-to-br ${item.gradient} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                      <span className="text-4xl font-display font-light text-slate-700 z-10 tracking-wider">B&A</span>
                      <div className="absolute top-4 right-4 w-8 h-8 bg-white/30 rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="p-8 text-center">
                      <h3 className="text-lg font-elegant font-light text-slate-900 mb-3 tracking-wide">시술 사례 {item.id}</h3>
                      <p className="text-slate-700 text-sm font-elegant-sans font-light leading-relaxed">실로스 실리프팅으로 자연스러운 변화</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Horizontal Swipe with Auto-rotation */}
              <div className="md:hidden overflow-hidden pb-4">
                <div 
                  className={`flex space-x-4 px-4 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                  style={{ 
                    transform: `translateX(-${currentGalleryIndex * (288 + 16)}px)` // 288px = w-72 + 16px = gap
                  }}
                >
                  {/* Duplicate items for seamless infinite scroll */}
                  {[...galleryItems, ...galleryItems].map((item, index) => (
                    <div key={`${item.id}-${Math.floor(index / galleryItems.length)}`} className="bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg flex-shrink-0 w-72 border border-teal-smoke-200/30">
                      <div className={`aspect-square bg-gradient-to-br ${item.gradient} flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                        <span className="text-3xl font-display font-light text-slate-700 z-10 tracking-wider">B&A</span>
                        <div className="absolute top-3 right-3 w-6 h-6 bg-white/30 rounded-full"></div>
                        <div className="absolute bottom-3 left-3 w-8 h-8 bg-white/20 rounded-full"></div>
                      </div>
                      <div className="p-6 text-center">
                        <h3 className="text-base font-elegant font-light text-slate-900 mb-2 tracking-wide">시술 사례 {item.id}</h3>
                        <p className="text-slate-700 text-sm font-elegant-sans font-light leading-relaxed">실로스 실리프팅으로 자연스러운 변화</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Auto-rotation indicators */}
                <div className="flex justify-center mt-4 space-x-2">
                  {galleryItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsTransitioning(true);
                        setCurrentGalleryIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === (currentGalleryIndex % galleryItems.length)
                          ? 'bg-teal-smoke-500 w-8' 
                          : 'bg-teal-smoke-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* 온라인 상담 섹션 - StandardConsultationSection 컴포넌트 사용 */}
      <StandardConsultationSection
        title="온라인 상담 예약"
        description="전문의와의 1:1 맞춤 상담으로 당신만의 아름다움을 계획하세요"
        initialProcedureId="silos-lifting"
      />
      </main>

      {/* Monthly Event Popup */}
      <MonthlyEventPopup
        isOpen={showEventPopup}
        onClose={handleCloseEventPopup}
        onDontShowToday={handleDontShowToday}
      />

    </PageLayout>
  );
}