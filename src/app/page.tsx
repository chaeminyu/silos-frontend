'use client';

// src/app/page.tsx
// MobileCategoryGrid moved to navigation dropdown
import StandardConsultationSection from '../components/StandardConsultationSection';
import MonthlyEventPopup from '../components/MonthlyEventPopup';
import PageLayout from '../components/PageLayout';
import { useState, useEffect } from 'react';
import { Sparkles, Clock, ShoppingCart, Check } from 'lucide-react';
import { eventService } from '../services/eventService';
import { youtubeService, YouTubeVideo } from '../services/youtubeService';

export default function HomePage() {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [currentWhySilosIndex, setCurrentWhySilosIndex] = useState(0);
  const [isWhySilosTransitioning, setIsWhySilosTransitioning] = useState(true);
  const [activeProcedureTab, setActiveProcedureTab] = useState<string>('silos-lifting');
  const [addedToCart, setAddedToCart] = useState<string[]>([]);
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

  const handleAddToCart = (procedureId: string, procedureName: string) => {
    if (!addedToCart.includes(procedureId)) {
      setAddedToCart([...addedToCart, procedureId]);
      console.log(`Added to cart: ${procedureName}`);
    }
  };

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
      title: '실로프팅(실리프팅)',
      subtitle: 'SILOS THREAD LIFTING',
      description: [
        '실로스만의 특허받은 실리프팅 기법으로',
        '개인의 얼굴 구조와 노화 패턴을 분석하여',
        '최적의 실 종류와 삽입 방향을 결정합니다.',
        '자연스러우면서도 효과적인 리프팅으로',
        '젊고 세련된 인상을 만들어드립니다.'
      ],
      features: ['무절개', '즉시효과', '자연스러움'],
      duration: '30분',
      feature: '무절개',
      gradient: 'from-teal-smoke-100 to-teal-smoke-200'
    },
    {
      id: 'silopat',
      title: '실로팻(지방추출주사)',
      subtitle: 'SILOPAT FAT DISSOLVING',
      description: [
        '실로스 독자개발 지방분해 주사로',
        '안전하고 효과적인 부분 지방 감소',
        '이중턱, 볼살, 팔뚝 등 다양한 부위에 적용',
        '시술 후 즉시 일상생활 가능하며',
        '자연스러운 라인 개선 효과를 제공합니다.'
      ],
      features: ['무통증', '즉시회복', '부분감소'],
      duration: '20분',
      feature: '무통증',
      gradient: 'from-elegant-100 to-teal-smoke-200'
    },
    {
      id: 'under-eye-laser',
      title: '반달레이저(눈밑지방레이저)',
      subtitle: 'UNDER-EYE FAT LASER',
      description: [
        '눈밑 지방을 레이저로 안전하게 제거하여',
        '다크서클과 눈밑 불룩함을 동시에 개선',
        '비절개 방식으로 흉터 걱정 없이',
        '자연스러운 눈가 라인을 완성하며',
        '젊고 밝은 인상을 만들어드립니다.'
      ],
      features: ['비절개', '흉터없음', '자연개선'],
      duration: '10분',
      feature: '비절개',
      gradient: 'from-teal-smoke-200 to-elegant-200'
    },
    {
      id: 'neck-lifting',
      title: '넥리프팅(목리프팅)',
      subtitle: 'NECK LIFTING',
      description: [
        '처진 목주름과 이중턱을 동시에 개선하는',
        '넥 리프팅으로 목과 턱라인을 선명하게',
        '실과 레이저를 복합적으로 사용하여',
        '안전하고 확실한 결과를 제공하며',
        '우아한 목라인을 완성해드립니다.'
      ],
      features: ['복합시술', '목주름개선', '자연결과'],
      duration: '45분',
      feature: '자연결과',
      gradient: 'from-elegant-200 to-teal-smoke-300'
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

        {/* 시술 안내 섹션 - 탭 기반 */}
        <section id="procedures" className="w-full py-24 bg-gradient-to-br from-white via-teal-smoke-50 to-elegant-50">
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-cyan-800 mb-6 tracking-wide">대표 시술</h2>
                <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-8"></div>
                <p className="text-lg md:text-xl font-elegant-sans font-light text-slate-700 max-w-3xl mx-auto leading-relaxed">
                  실로스만의 특화된 시술로 더 젊고 아름다운 모습을 만나보세요
                </p>
              </div>

              {/* 탭 버튼들 */}
              <div className="grid grid-cols-4 gap-2 mb-12 max-w-5xl mx-auto">
                <button
                  onClick={() => setActiveProcedureTab('silos-lifting')}
                  className={`px-2 py-3 rounded-xl font-elegant-sans transition-all duration-300 text-center ${
                    activeProcedureTab === 'silos-lifting'
                      ? 'bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white shadow-lg'
                      : 'bg-white text-slate-700 border-2 border-teal-smoke-200 hover:border-teal-smoke-300 hover:bg-teal-smoke-50'
                  }`}
                >
                  <div className="text-xs font-light opacity-80 leading-tight">SILOS</div>
                  <div className="text-sm font-medium leading-tight">실리프팅</div>
                </button>
                
                <button
                  onClick={() => setActiveProcedureTab('silopat')}
                  className={`px-2 py-3 rounded-xl font-elegant-sans transition-all duration-300 text-center ${
                    activeProcedureTab === 'silopat'
                      ? 'bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white shadow-lg'
                      : 'bg-white text-slate-700 border-2 border-teal-smoke-200 hover:border-teal-smoke-300 hover:bg-teal-smoke-50'
                  }`}
                >
                  <div className="text-xs font-light opacity-80 leading-tight">SILOS</div>
                  <div className="text-sm font-medium leading-tight">지방추출주사</div>
                </button>
                
                <button
                  onClick={() => setActiveProcedureTab('under-eye-laser')}
                  className={`px-2 py-3 rounded-xl font-elegant-sans transition-all duration-300 text-center ${
                    activeProcedureTab === 'under-eye-laser'
                      ? 'bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white shadow-lg'
                      : 'bg-white text-slate-700 border-2 border-teal-smoke-200 hover:border-teal-smoke-300 hover:bg-teal-smoke-50'
                  }`}
                >
                  <div className="text-xs font-light opacity-80 leading-tight">SILOS</div>
                  <div className="text-sm font-medium leading-tight">눈밑지방레이저</div>
                </button>
                
                <button
                  onClick={() => setActiveProcedureTab('neck-lifting')}
                  className={`px-2 py-3 rounded-xl font-elegant-sans transition-all duration-300 text-center ${
                    activeProcedureTab === 'neck-lifting'
                      ? 'bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white shadow-lg'
                      : 'bg-white text-slate-700 border-2 border-teal-smoke-200 hover:border-teal-smoke-300 hover:bg-teal-smoke-50'
                  }`}
                >
                  <div className="text-xs font-light opacity-80 leading-tight">SILOS</div>
                  <div className="text-sm font-medium leading-tight">목리프팅</div>
                </button>
              </div>

              {/* 선택된 시술 상세 정보 */}
              {(() => {
                const activeProcedure = representativeProcedures.find(proc => proc.id === activeProcedureTab) || representativeProcedures[0];
                return (
                  <div className="bg-white rounded-3xl shadow-2xl border border-teal-smoke-200/30 overflow-hidden">
                    {/* 헤더 */}
                    <div className="bg-gradient-to-r from-teal-smoke-500 to-elegant-500 py-12 px-8 text-center">
                      <h3 className="text-4xl font-display font-light text-white mb-4 tracking-wide">
                        {activeProcedure.title}
                      </h3>
                      <p className="text-xl font-elegant-sans font-light text-white/90">
                        {activeProcedure.subtitle}
                      </p>
                    </div>

                    {/* 콘텐츠 */}
                    <div className="p-12">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* 설명 (2/3) */}
                        <div className="lg:col-span-2">
                          <div className="space-y-6 mb-10">
                            {activeProcedure.description.map((desc, i) => (
                              <div key={i} className="flex items-start space-x-4">
                                <div className="w-2 h-2 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mt-3 flex-shrink-0"></div>
                                <p className="text-lg text-slate-700 font-elegant-sans font-light leading-relaxed">
                                  {desc}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* 특징 배지들 */}
                          <div className="flex flex-wrap gap-4 mb-8">
                            {activeProcedure.features.map((feature, i) => (
                              <div key={i} className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-bold bg-gradient-to-r from-teal-smoke-100 to-elegant-100 text-cyan-800 border-2 border-teal-smoke-200 shadow-lg">
                                <Sparkles className="w-4 h-4 mr-2" />
                                {feature}
                              </div>
                            ))}
                          </div>

                          {/* 시술시간 */}
                          <div className="flex items-center space-x-4">
                            <div className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-bold bg-gradient-to-r from-elegant-200 to-teal-smoke-200 text-cyan-800 border-2 border-elegant-300 shadow-lg">
                              <Clock className="w-4 h-4 mr-2" />
                              {activeProcedure.duration}
                            </div>
                          </div>
                        </div>

                        {/* 이미지 및 상담 신청 (1/3) */}
                        <div className="flex flex-col items-center justify-between">
                          <div className={`w-full h-64 bg-gradient-to-br ${activeProcedure.gradient} rounded-2xl border-2 border-teal-smoke-200/30 flex items-center justify-center mb-8 shadow-lg backdrop-blur-sm`}>
                            <div className="text-center text-slate-700">
                              <Sparkles className="w-20 h-20 mx-auto mb-4" />
                              <p className="font-elegant-sans font-medium">
                                {activeProcedure.title}
                              </p>
                            </div>
                          </div>

                          {/* 상담 신청 버튼 */}
                          <button
                            onClick={() => handleAddToCart(activeProcedure.id, activeProcedure.title)}
                            className={`w-full py-4 px-6 rounded-xl font-elegant-sans font-bold text-base transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                              addedToCart.includes(activeProcedure.id)
                                ? 'bg-gradient-to-r from-green-200 to-green-300 text-green-800 cursor-default border-2 border-green-400'
                                : 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white hover:from-teal-smoke-500 hover:to-elegant-500 border-2 border-transparent'
                            }`}
                            disabled={addedToCart.includes(activeProcedure.id)}
                          >
                            {addedToCart.includes(activeProcedure.id) ? (
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
                );
              })()}
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