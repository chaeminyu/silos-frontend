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
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  const [isSloganVisible, setIsSloganVisible] = useState(false);
  const [isDoctorCardVisible, setIsDoctorCardVisible] = useState(false);

  // Doctor colors
  const doctorColors = ['#A8A8A7', '#4C4845', '#656661', '#7D7E77', '#878884'];
  const doctorAccentColors = ['#B8B8B7', '#5C5855', '#757671', '#8D8E87', '#979894'];

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

  // 슬로건 섹션 스크롤 애니메이션
  useEffect(() => {
    const sloganSection = document.getElementById('slogan-section');
    if (!sloganSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSloganVisible(true);
          } else {
            setIsSloganVisible(false);
          }
        });
      },
      {
        threshold: 0.2, // 20% 보이면 트리거
        rootMargin: '0px 0px -100px 0px' // 하단에서 100px 전에 트리거
      }
    );

    observer.observe(sloganSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 의료진 카드 스크롤 애니메이션
  useEffect(() => {
    const doctorsSection = document.getElementById('doctors');
    if (!doctorsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsDoctorCardVisible(true);
            // 의료진 섹션이 보일 때 정영진 원장(index 0)부터 시작
            setCurrentDoctorIndex(0);
          } else {
            setIsDoctorCardVisible(false);
          }
        });
      },
      {
        threshold: 0.3, // 30% 보이면 트리거
        rootMargin: '0px 0px -50px 0px' // 하단에서 50px 전에 트리거
      }
    );

    observer.observe(doctorsSection);
    return () => {
      observer.disconnect();
    };
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

  // Doctors data
  const doctorsData = [
    {
      id: 1,
      name: '정영진',
      title: '원장',
      image: '/images/doctors/정영진_원장.png',
      bio: {
        title: 'MEDICAL DOCTOR',
        name: '정영진 원장',
        positions: [
          '실로스 창원 원장',
          '포에버 성형외과 창립 원장',
          '(전)시온성형외과 대표 원장',
          '중한국제미용성형의학회장',
          '국제성형외과학회 정회원',
          '시온 열린성형세미나 주관원장',
          '(2009년부터 65회 개회 강의 수술.시연)'
        ],
        specialties: [
          '실리프팅/이마 & 안면거상/눈성형',
          '실로팻/고난이도 필러'
        ]
      }
    },
    {
      id: 2,
      name: '임동혁',
      title: '원장',
      image: '/images/doctors/임동혁_원장.png',
      bio: {
        title: 'MEDICAL DOCTOR',
        name: '임동혁 원장',
        positions: [
          '실로스 창원 원장',
          '대한 미용성형레이져 학회 정회원',
          '대한 리프팅연구회 정회원',
          '대한 미용외과 학회 정회원',
          '고난도 필러, 보톡스 전문',
          '울쎄라, 온다 레이져 키닥터',
          '덴서티, 엔코어 키닥터',
          '슈링크, 인모드 시술 1만건',
          '쁘띠 시술 경력 10만건'
        ],
        specialties: [
          '실리프팅/코 실리프팅/고난이도 필러',
          '심부볼 축소 실&레이져 리프팅'
        ]
      }
    },
    {
      id: 3,
      name: '이원준',
      title: '원장',
      image: '/images/doctors/이원준_원장.png',
      bio: {
        title: 'MEDICAL DOCTOR',
        name: '이원준 원장',
        positions: [
          '실로스 창원 원장',
          '대한성형외과 학회',
          '대한 미용성형레이져 학회',
          '대한 리프팅 학회',
          '올타이트 레이저 EXPERT',
          '온다 레이저 키닥터',
          '울쎄라 슈링크 마에스트로'
        ],
        specialties: [
          '실리프팅/눈성형/실로팻/레이저리프팅/필러/보톡스',
          '스킨부스터/스킨보톡스'
        ]
      }
    },
    {
      id: 4,
      name: '안소현',
      title: '원장',
      image: '/images/doctors/안소현_원장.png',
      bio: {
        title: 'MEDICAL DOCTOR',
        name: '안소현 원장',
        positions: [
          '실로스 창원 원장',
          '대한 미용성형레이져 학회 회원',
          '대한 리프팅 연구회 회원',
          '울쎄라, 온다 레이져 키닥터',
          '덴거티, 엔코어 시술 마에스트로',
          '슈링크, 인모드 시술 2만건',
          '쁘띠 시술 경력 5만건'
        ],
        specialties: [
          '실리프팅/레이저리프팅/색소레이저',
          '보톡스/필러/스킨부스터/스킨보톡스'
        ]
      }
    },
    {
      id: 5,
      name: '방다솔',
      title: '원장',
      image: '/images/doctors/방다솔_원장.png',
      bio: {
        title: 'MEDICAL DOCTOR',
        name: '방다솔 원장',
        positions: [
          '실로스 창원 원장',
          '대한 미용성령레이져 학회 회원',
          '대한 리프팅 연구회 회원',
          '대한 미용외과학회 회원',
          '올타이트 레이저 EXPERT',
          '온다 레이저 키닥터',
          '울쎄라 슈링크 마에스트로'
        ],
        specialties: [
          '실리프팅/레이저리프팅/색소레이저',
          '보톡스/필러/스킨부스터/스킨보톡스'
        ]
      }
    }
  ];

  // Representative procedures data
  const representativeProcedures = [
    {
      id: 'lifting-procedures',
      title: '리프팅 시술',
      subtitle: 'LIFTING PROCEDURES',
      shortDesc: '실로스만의 다양한 리프팅 기법으로 개인별 맞춤 리프팅 솔루션을 제공',
      route: '/procedures/silos-lifting',
      features: ['무절개', '즉시효과', '자연스러움', '맞춤형'],
      duration: '15-60분',
      gradient: 'from-teal-smoke-400 to-elegant-500',
      icon: '🧵',
      image: '/images/home-procedures/silos-lifting.jpg',
      subOptions: [
        { name: '실로스 리프팅', route: '/procedures/silos-lifting', duration: '30분', desc: '실로스만의 특허받은 실리프팅 기법' },
        { name: '미니 리프팅', route: '/procedures/mini-lifting', duration: '60분', desc: '최소 절개로 최대 효과' },
        { name: '스킨 리프팅', route: '/procedures/skin-lifting', duration: '15분', desc: '콜라겐 리모델링으로 피부 탄력 개선' }
      ]
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

  // Auto-rotation for Doctors with circular motion
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDoctorIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % doctorsData.length;
        return nextIndex;
      });
    }, 12000); // Rotate every 12 seconds

    return () => clearInterval(interval);
  }, [doctorsData.length]);

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
      <main className="w-full overflow-x-hidden">
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
              <div className="text-center text-white px-6 -mt-20">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-nanum-myeongjo font-light mb-12 tracking-wide leading-relaxed">
                  실로스, 20년 리프팅 기술
                  <span className="block mt-8 text-4xl md:text-5xl lg:text-6xl font-bold">손끝에서 완성되는 당신의 라이프 타임</span>
                </h1>
                <div className="w-0.5 h-40 bg-white/60 rounded-full mx-auto mb-16"></div>
                <p className="text-xl md:text-2xl lg:text-3xl font-elegant-sans font-medium text-white/90 mt-8">
                  SILOS 성형외과
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
        
        {/* 왜 실로스인가? 섹션 - 현재 웹사이트 스타일에 맞는 밝은 디자인 */}
        <section id="about" className="w-full py-24 bg-gradient-to-br from-teal-smoke-50 via-white to-elegant-100 relative overflow-hidden">
          {/* 배경 장식 요소들 */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-teal-smoke-200/30 to-elegant-300/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-32 left-20 w-80 h-80 bg-gradient-to-tr from-elegant-200/25 to-teal-smoke-300/25 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 헤더 */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-teal-smoke-800 border border-teal-smoke-200/30 mb-8">
                <Sparkles className="w-4 h-4 mr-2 text-teal-smoke-500" />
                WHY SILOS?
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-nanum-myeongjo font-bold text-gray-800 mb-6 tracking-tight leading-tight">
                리프팅의 새로운 기준
              </h2>
              <div className="w-0.5 h-20 bg-gradient-to-b from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-8"></div>
              <p className="text-lg md:text-xl font-elegant-sans font-light text-slate-700 max-w-3xl mx-auto leading-relaxed">
                실로스가 제시하는 차별화된 시술 철학<br />
                <span className="text-teal-smoke-600 font-medium">미용의사들이 추천하는 병원</span>
              </p>
            </div>

          </div>

          {/* 세미나 사진 파노라마 - 전체 폭, 좌우 여백 없음 */}
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-16">
            <div className="relative overflow-hidden bg-gradient-to-r from-teal-smoke-50 via-white to-elegant-50">
              <div className="flex animate-scroll-slow">
                {/* 첫 번째 세트 */}
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={`seminar-1-${num}`} className="flex-shrink-0">
                    <img
                      src={`/images/panorama/sec05_img0${num}.png`}
                      alt={`세미나 현장 ${num}`}
                      className="h-32 w-auto object-cover"
                    />
                  </div>
                ))}
                {/* 두 번째 세트 */}
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={`seminar-2-${num}`} className="flex-shrink-0">
                    <img
                      src={`/images/panorama/sec05_img0${num}.png`}
                      alt={`세미나 현장 ${num}`}
                      className="h-32 w-auto object-cover"
                    />
                  </div>
                ))}
                {/* 세 번째 세트 */}
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={`seminar-3-${num}`} className="flex-shrink-0">
                    <img
                      src={`/images/panorama/sec05_img0${num}.png`}
                      alt={`세미나 현장 ${num}`}
                      className="h-32 w-auto object-cover"
                    />
                  </div>
                ))}
                {/* 네 번째 세트 */}
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={`seminar-4-${num}`} className="flex-shrink-0">
                    <img
                      src={`/images/panorama/sec05_img0${num}.png`}
                      alt={`세미나 현장 ${num}`}
                      className="h-32 w-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 임팩트 있는 통계 섹션 */}
            <div className="text-center mb-20">
              {/* 메인 헤드라인 */}
              <div className="mb-16">
                <h3 className="text-3xl md:text-4xl font-nanum-myeongjo text-gray-800 mb-6">
                  대한민국 성형의학계가 인정하는
                </h3>
                <p className="text-xl md:text-2xl font-elegant-sans text-teal-smoke-600 font-medium">
                  SILOS의 교육 실적과 시술 경험
                </p>
              </div>

              {/* 주요 통계 - 지그재그 레이아웃 */}
              <div className="space-y-16 md:space-y-20 mb-16">
                {/* 첫 번째 행: 68회 세미나 (모바일: 이미지 위, 텍스트 아래 / 데스크톱: 텍스트 왼쪽, 이미지 오른쪽) */}
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                  <div className="w-full md:w-2/3 order-2 md:order-1">
                    <div className="text-center md:text-left">
                      <div className="inline-flex items-center px-4 py-2 bg-teal-smoke-100 rounded-full text-sm font-medium text-teal-smoke-700 mb-4">
                        <div className="w-2 h-2 bg-teal-smoke-500 rounded-full mr-2"></div>
                        EDUCATION LEADERSHIP
                      </div>
                      <div className="text-4xl md:text-6xl lg:text-7xl font-display font-bold bg-gradient-to-br from-teal-smoke-600 via-teal-smoke-500 to-teal-smoke-700 bg-clip-text text-transparent mb-4">
                        68<span className="text-2xl md:text-4xl lg:text-5xl">회</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-nanum-myeongjo font-bold text-gray-800 mb-3 leading-tight">
                        전국 단체 세미나 개최
                      </h3>
                      <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        성형의사 교육 프로그램을 통해<br className="hidden md:block" />
                        <span className="text-teal-smoke-600 font-semibold">전국 의료진에게 기술을 전수</span>
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/3 order-1 md:order-2">
                    <div className="relative overflow-hidden shadow-lg group w-screen md:w-full relative md:static left-1/2 md:left-auto right-1/2 md:right-auto -ml-[50vw] md:ml-0 -mr-[50vw] md:mr-0">
                      <img 
                        src="/images/why-silos/seminar.png" 
                        alt="전국 단체 세미나 개최"
                        className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-smoke-500/30 to-transparent"></div>
                      <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                  </div>
                </div>

                {/* Divider 1 */}
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-teal-smoke-300"></div>
                    <div className="w-3 h-3 bg-gradient-to-br from-teal-smoke-400 to-elegant-400 rounded-full"></div>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-teal-smoke-300 to-elegant-300"></div>
                    <div className="w-3 h-3 bg-gradient-to-br from-elegant-400 to-gray-400 rounded-full"></div>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-elegant-300 to-transparent"></div>
                  </div>
                </div>

                {/* 두 번째 행: 100+ 의사 (모바일: 이미지 위, 텍스트 아래 / 데스크톱: 이미지 왼쪽, 텍스트 오른쪽 - 지그재그!) */}
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                  <div className="md:w-1/3 order-1 md:order-1">
                    <div className="relative overflow-hidden shadow-lg group w-screen md:w-full relative md:static left-1/2 md:left-auto right-1/2 md:right-auto -ml-[50vw] md:ml-0 -mr-[50vw] md:mr-0">
                      <img 
                        src="/images/why-silos/education.png" 
                        alt="성형의사 교육 참여"
                        className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-elegant-500/30 to-transparent"></div>
                      <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 order-2 md:order-2">
                    <div className="text-center md:text-left">
                      <div className="inline-flex items-center px-4 py-2 bg-elegant-100 rounded-full text-sm font-medium text-elegant-700 mb-4">
                        <div className="w-2 h-2 bg-elegant-500 rounded-full mr-2"></div>
                        MEDICAL NETWORK
                      </div>
                      <div className="text-4xl md:text-6xl lg:text-7xl font-display font-bold bg-gradient-to-br from-elegant-600 via-elegant-500 to-elegant-700 bg-clip-text text-transparent mb-4">
                        100<span className="text-2xl md:text-4xl lg:text-5xl">+</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-nanum-myeongjo font-bold text-gray-800 mb-3 leading-tight">
                        성형의사 교육 참여
                      </h3>
                      <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        전국 의료진이 실로스의<br className="hidden md:block" />
                        <span className="text-elegant-600 font-semibold">검증된 기술력을 인정</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider 2 */}
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-elegant-300"></div>
                    <div className="w-3 h-3 bg-gradient-to-br from-elegant-400 to-gray-400 rounded-full"></div>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-elegant-300 to-gray-300"></div>
                    <div className="w-3 h-3 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full"></div>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                  </div>
                </div>

                {/* 세 번째 행: 43만건 (모바일: 이미지 위, 텍스트 아래 / 데스크톱: 텍스트 왼쪽, 이미지 오른쪽 - 지그재그!) */}
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                  <div className="w-full md:w-2/3 order-2 md:order-1">
                    <div className="text-center md:text-left">
                      <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 mb-4">
                        <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                        PROVEN EXPERIENCE
                      </div>
                      <div className="text-5xl md:text-7xl lg:text-8xl font-display font-bold bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 bg-clip-text text-transparent mb-4">
                        43<span className="text-3xl md:text-5xl lg:text-6xl">만건</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-nanum-myeongjo font-bold text-gray-800 mb-3 leading-tight">
                        누적 시술 경험
                      </h3>
                      <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-4">
                        <span className="text-gray-800 font-semibold">실리프팅·눈성형·보톡스·필러</span><br className="hidden md:block" />
                        축적된 노하우와 안전한 시술
                      </p>
                      <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300">
                        <span>20년간 쌓아온 전문성</span>
                        <div className="w-2 h-2 bg-white rounded-full ml-3 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/3 order-1 md:order-2">
                    <div className="relative overflow-hidden shadow-lg group w-screen md:w-full relative md:static left-1/2 md:left-auto right-1/2 md:right-auto -ml-[50vw] md:ml-0 -mr-[50vw] md:mr-0">
                      <img 
                        src="/images/why-silos/43m-procedures.png" 
                        alt="누적 시술 경험"
                        className="w-full h-48 md:h-56 object-cover object-center scale-110 group-hover:scale-115 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-600/30 to-transparent"></div>
                      <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 세부 시술 통계 - 모던 미니멀 디자인 */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100/60 hover:bg-white/40 hover:backdrop-blur-md hover:border-white/50 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(31,38,135,0.15)]">
                <h4 className="text-xl font-elegant-sans font-bold text-gray-800 mb-8 text-center">
                  SILOS 대표 시술 경험
                </h4>
                <div className="grid grid-cols-3 gap-3 md:gap-8">
                  <div className="text-center group relative">
                    {/* 상단 컬러 액센트 */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-teal-smoke-400 to-teal-smoke-600 rounded-full group-hover:w-16 transition-all duration-300"></div>
                    <div className="pt-4">
                      <div className="text-sm md:text-3xl font-display font-bold bg-gradient-to-br from-teal-smoke-600 via-teal-smoke-500 to-teal-smoke-700 bg-clip-text text-transparent mb-1 md:mb-2 group-hover:from-teal-smoke-700 group-hover:via-teal-smoke-600 group-hover:to-teal-smoke-800 transition-all duration-300">
                        10만건
                      </div>
                      <div className="text-xs md:text-base font-elegant-sans text-gray-800 font-medium group-hover:text-gray-900 transition-colors duration-300">실리프팅</div>
                    </div>
                  </div>
                  <div className="text-center group relative">
                    {/* 상단 컬러 액센트 */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-elegant-400 to-elegant-600 rounded-full group-hover:w-16 transition-all duration-300"></div>
                    <div className="pt-4">
                      <div className="text-sm md:text-3xl font-display font-bold bg-gradient-to-br from-elegant-600 via-elegant-500 to-elegant-700 bg-clip-text text-transparent mb-1 md:mb-2 group-hover:from-elegant-700 group-hover:via-elegant-600 group-hover:to-elegant-800 transition-all duration-300">
                        3만건
                      </div>
                      <div className="text-xs md:text-base font-elegant-sans text-gray-800 font-medium group-hover:text-gray-900 transition-colors duration-300">눈성형</div>
                    </div>
                  </div>
                  <div className="text-center group relative">
                    {/* 상단 컬러 액센트 */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full group-hover:w-16 transition-all duration-300"></div>
                    <div className="pt-4">
                      <div className="text-sm md:text-3xl font-display font-bold bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 bg-clip-text text-transparent mb-1 md:mb-2 group-hover:from-gray-800 group-hover:via-gray-700 group-hover:to-gray-900 transition-all duration-300">
                        30만건
                      </div>
                      <div className="text-xs md:text-base font-elegant-sans text-gray-800 font-medium group-hover:text-gray-900 transition-colors duration-300">보톡스·필러</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 하단 강조 메시지 */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-8 py-4 bg-white/70 backdrop-blur-sm rounded-full border border-teal-smoke-200/50 shadow-lg">
                <div className="w-3 h-3 bg-teal-smoke-400 rounded-full mr-4 animate-pulse"></div>
                <span className="text-lg font-elegant-sans text-slate-700">
                  전국 의료진이 인정하는 <span className="text-teal-smoke-600 font-semibold">SILOS 기술력</span>
                </span>
              </div>
              
              {/* 세로 디바이더 */}
              <div className="w-0.5 h-20 bg-gradient-to-b from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mt-16"></div>
            </div>
          </div>
        </section>


        {/* 의사 소개 섹션 */}
        <section id="doctors" className="w-full py-32 bg-gradient-to-br from-white via-elegant-50 to-teal-smoke-50">
          <div className="w-full">
            {/* 섹션 제목 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-cyan-800 mb-6 tracking-wide">SILOS CLINIC<br /><span className="font-nanum-myeongjo text-4xl md:text-5xl font-bold mt-4 block">의료진 소개</span></h2>
                <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-8"></div>
                <p className="text-lg md:text-xl font-elegant-sans font-light text-slate-700 max-w-3xl mx-auto leading-relaxed">
                  풍부한 경험과 전문성을 갖춘 실로스 의료진이 당신의 아름다움을 완성합니다
                </p>
              </div>
            </div>

            {/* 의료진 회전 컨테이너 */}
            <div className="w-full relative">
              {/* 의료진 개별 섹션 */}
              <div 
                className="w-full transition-all duration-700 ease-in-out transform translate-x-0 opacity-100"
                style={{
                  backgroundColor: doctorColors[currentDoctorIndex]
                }}
              >
                <div className="max-w-7xl mx-auto">
                  {/* 데스크톱 레이아웃 */}
                  <div className={`hidden lg:grid lg:grid-cols-2 gap-0 ${
                    currentDoctorIndex % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}>
                    {/* 의사 사진 - 데스크톱 */}
                    <div className={`${currentDoctorIndex % 2 === 1 ? 'lg:col-start-2' : ''} flex items-end ${
                      currentDoctorIndex % 2 === 1 ? 'justify-end pr-0' : 'justify-start pl-0'
                    } transition-all duration-700 ease-in-out transform ${
                      !isDoctorCardVisible 
                        ? (currentDoctorIndex % 2 === 1 ? 'translate-x-16 opacity-0' : '-translate-x-16 opacity-0')
                        : ''
                    } ${
                      currentDoctorIndex % 2 === 1 ? 'animate-slide-from-right' : 'animate-slide-from-left'
                    }`}>
                      <div className={`relative aspect-[3/5] w-96 overflow-hidden ${
                        currentDoctorIndex % 2 === 1 ? 'ml-0' : 'mr-0'
                      }`}>
                        <div 
                          className="absolute inset-0"
                          style={{
                            background: `
                              radial-gradient(ellipse 140% 130% at center, transparent 0%, transparent 10%, ${doctorColors[currentDoctorIndex]}30 40%, ${doctorColors[currentDoctorIndex]}70 70%, ${doctorAccentColors[currentDoctorIndex]} 100%),
                              linear-gradient(to right, ${doctorAccentColors[currentDoctorIndex]}40 0%, transparent 30%, transparent 70%, ${doctorAccentColors[currentDoctorIndex]}40 100%),
                              linear-gradient(to bottom, transparent 0%, transparent 50%, ${doctorAccentColors[currentDoctorIndex]}60 100%)
                            `,
                            zIndex: 10
                          }}
                        ></div>
                        
                        {/* 사진 가장자리 그라데이션 */}
                        <div 
                          className={`absolute ${currentDoctorIndex % 2 === 1 ? 'left-0' : 'right-0'} top-0 bottom-0 w-16 z-20`}
                          style={{
                            background: currentDoctorIndex % 2 === 1 
                              ? `linear-gradient(to right, ${[
                                  '#A8A8A7',
                                  '#4C4845',
                                  '#656661',
                                  '#7D7E77',
                                  '#878884'
                                ][currentDoctorIndex]}80 0%, ${[
                                  '#A8A8A7',
                                  '#4C4845',
                                  '#656661',
                                  '#7D7E77',
                                  '#878884'
                                ][currentDoctorIndex]}40 40%, transparent 100%)`
                              : `linear-gradient(to left, ${[
                                  '#A8A8A7',
                                  '#4C4845',
                                  '#656661',
                                  '#7D7E77',
                                  '#878884'
                                ][currentDoctorIndex]}80 0%, ${[
                                  '#A8A8A7',
                                  '#4C4845',
                                  '#656661',
                                  '#7D7E77',
                                  '#878884'
                                ][currentDoctorIndex]}40 40%, transparent 100%)`
                          }}
                        ></div>
                        
                        <img
                          src={doctorsData[currentDoctorIndex].image}
                          alt={`${doctorsData[currentDoctorIndex].name} ${doctorsData[currentDoctorIndex].title}`}
                          className="w-full h-full object-cover object-center relative z-0"
                          onError={(e) => {
                            e.currentTarget.src = '/images/placeholder-doctor.jpg';
                          }}
                        />
                      </div>
                    </div>

                      {/* 약력 정보 */}
                      <div className={`flex-1 space-y-2 px-8 py-6 flex flex-col justify-center transition-all duration-700 ease-in-out transform ${
                        !isDoctorCardVisible 
                          ? (currentDoctorIndex % 2 === 1 ? '-translate-x-16 opacity-0' : 'translate-x-16 opacity-0')
                          : ''
                      } ${
                        currentDoctorIndex % 2 === 1 ? 'animate-slide-from-left' : 'animate-slide-from-right'
                      }`}>
                      <div>
                        <h3 className={`text-xl md:text-3xl font-display font-bold mb-1 tracking-wide ${
                          currentDoctorIndex === 1 ? 'text-white' : 
                          currentDoctorIndex === 2 || currentDoctorIndex === 3 || currentDoctorIndex === 4 ? 'text-white' : 'text-slate-800'
                        }`}>
                          {doctorsData[currentDoctorIndex].name} {doctorsData[currentDoctorIndex].title}
                        </h3>
                        <p className={`text-sm md:text-base font-elegant-sans font-medium mb-3 md:mb-4 ${
                          currentDoctorIndex === 1 ? 'text-white/80' : 
                          currentDoctorIndex === 2 || currentDoctorIndex === 3 || currentDoctorIndex === 4 ? 'text-white/90' : 'text-slate-600'
                        }`}>
                          {doctorsData[currentDoctorIndex].bio.title}
                        </p>
                      </div>

                      <div className="space-y-1 md:space-y-2">
                        <h4 className={`text-base md:text-lg font-elegant font-semibold mb-1 md:mb-2 ${
                          currentDoctorIndex === 1 ? 'text-white' : 
                          currentDoctorIndex === 2 || currentDoctorIndex === 3 || currentDoctorIndex === 4 ? 'text-white' : 'text-slate-800'
                        }`}>주요 경력</h4>
                        <ul className="space-y-0.5 md:space-y-1">
                          {doctorsData[currentDoctorIndex].bio.positions.map((position, idx) => (
                            <li key={idx} className="flex items-start">
                              <div 
                                className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                style={{
                                  backgroundColor: doctorAccentColors[currentDoctorIndex]
                                }}
                              ></div>
                              <p className={`text-sm md:text-base font-elegant-sans leading-relaxed ${
                                currentDoctorIndex === 1 ? 'text-white/90' : 
                                currentDoctorIndex === 2 || currentDoctorIndex === 3 || currentDoctorIndex === 4 ? 'text-white/85' : 'text-slate-700'
                              }`}>{position}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2 md:space-y-3 pt-3 md:pt-4 border-t border-slate-200">
                        <h4 className={`text-lg md:text-xl font-elegant font-semibold mb-2 md:mb-3 ${
                          currentDoctorIndex === 1 ? 'text-white' : 
                          currentDoctorIndex === 2 || currentDoctorIndex === 3 || currentDoctorIndex === 4 ? 'text-white' : 'text-slate-800'
                        }`}>전문시술분야</h4>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {doctorsData[currentDoctorIndex].bio.specialties.flatMap(specialty => 
                            specialty.split('/').map(item => item.trim())
                          ).map((specialty, idx) => (
                            <span 
                              key={idx} 
                              className="inline-flex items-center px-3 md:px-5 py-2 md:py-3 rounded-full text-xs md:text-sm font-elegant-sans font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-default backdrop-blur-sm"
                              style={{
                                background: `linear-gradient(135deg, ${doctorColors[currentDoctorIndex]}40, ${doctorColors[currentDoctorIndex]}80)`,
                                borderColor: doctorColors[currentDoctorIndex],
                                borderWidth: '2px',
                                borderStyle: 'solid',
                                color: '#ffffff',
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                              }}
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 모바일 레이아웃 */}
                  <div className="lg:hidden px-6 py-6 transition-all duration-700 ease-in-out transform ${
                    !isDoctorCardVisible 
                      ? 'opacity-0 translate-y-4'
                      : 'opacity-100 translate-y-0'
                  }">
                    {/* 의사 이름 및 직책 */}
                    <div className="mb-6">
                      <h3 className={`text-xl font-display font-bold mb-1 tracking-wide ${
                        currentDoctorIndex === 1 ? 'text-white' : 
                        currentDoctorIndex === 2 || currentDoctorIndex === 3 || currentDoctorIndex === 4 ? 'text-white' : 'text-slate-800'
                      }`}>
                        {doctorsData[currentDoctorIndex].name} {doctorsData[currentDoctorIndex].title}
                      </h3>
                      <p className={`text-sm font-elegant-sans font-medium ${
                        currentDoctorIndex === 1 ? 'text-white/80' : 
                        currentDoctorIndex === 2 || currentDoctorIndex === 3 || currentDoctorIndex === 4 ? 'text-white/90' : 'text-slate-600'
                      }`}>
                        {doctorsData[currentDoctorIndex].bio.title}
                      </p>
                    </div>
                    
                    {/* 주요 경력과 사진 나란히 */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      {/* 주요 경력 */}
                      <div className={`transition-all duration-700 ease-in-out transform ${
                        !isDoctorCardVisible 
                          ? (currentDoctorIndex % 2 === 1 ? 'translate-x-16 opacity-0' : '-translate-x-16 opacity-0')
                          : 'translate-x-0 opacity-100'
                      } ${
                        currentDoctorIndex % 2 === 1 ? 'animate-slide-from-right' : 'animate-slide-from-left'
                      }`}>
                        <h4 className={`text-base font-elegant font-semibold mb-3 ${
                          currentDoctorIndex === 1 ? 'text-white' : 
                          currentDoctorIndex === 2 || currentDoctorIndex === 3 || currentDoctorIndex === 4 ? 'text-white' : 'text-slate-800'
                        }`}>주요 경력</h4>
                        <ul className="space-y-2">
                          {doctorsData[currentDoctorIndex].bio.positions.map((position, idx) => (
                            <li key={idx} className="flex items-start">
                              <div 
                                className="w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0"
                                style={{
                                  backgroundColor: doctorAccentColors[currentDoctorIndex]
                                }}
                              ></div>
                              <p className={`text-xs font-elegant-sans leading-relaxed ${
                                currentDoctorIndex === 1 ? 'text-white/90' : 
                                currentDoctorIndex === 2 || currentDoctorIndex === 3 || currentDoctorIndex === 4 ? 'text-white/85' : 'text-slate-700'
                              }`}>{position}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* 의사 사진 - 모바일 (Oval, 더 큰 크기) */}
                      <div className={`flex justify-center transition-all duration-700 ease-in-out transform ${
                        !isDoctorCardVisible 
                          ? (currentDoctorIndex % 2 === 1 ? 'translate-x-16 opacity-0 scale-95' : '-translate-x-16 opacity-0 scale-95')
                          : 'translate-x-0 opacity-100 scale-100'
                      } ${
                        currentDoctorIndex % 2 === 1 ? 'animate-slide-from-right' : 'animate-slide-from-left'
                      }`}>
                        <div className="relative w-44 h-52 overflow-hidden rounded-[50%]">
                          <div 
                            className="absolute inset-0"
                            style={{
                              background: `
                                radial-gradient(ellipse 140% 130% at center, transparent 0%, transparent 10%, ${doctorColors[currentDoctorIndex]}30 40%, ${doctorColors[currentDoctorIndex]}70 70%, ${doctorAccentColors[currentDoctorIndex]} 100%),
                                linear-gradient(to right, ${doctorAccentColors[currentDoctorIndex]}40 0%, transparent 30%, transparent 70%, ${doctorAccentColors[currentDoctorIndex]}40 100%),
                                linear-gradient(to bottom, transparent 0%, transparent 50%, ${doctorAccentColors[currentDoctorIndex]}60 100%)
                              `,
                              zIndex: 10
                            }}
                          ></div>
                          
                          <img
                            src={doctorsData[currentDoctorIndex].image}
                            alt={`${doctorsData[currentDoctorIndex].name} ${doctorsData[currentDoctorIndex].title}`}
                            className="w-full h-full object-cover object-center relative z-0"
                            onError={(e) => {
                              e.currentTarget.src = '/images/placeholder-doctor.jpg';
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* 전문시술분야 */}
                    <div>
                      <h4 className={`text-base font-elegant font-semibold mb-3 ${
                        currentDoctorIndex === 1 ? 'text-white' : 
                        currentDoctorIndex === 2 || currentDoctorIndex === 3 || currentDoctorIndex === 4 ? 'text-white' : 'text-slate-800'
                      }`}>전문시술분야</h4>
                      <div className="flex flex-wrap gap-2">
                        {doctorsData[currentDoctorIndex].bio.specialties.flatMap(specialty => 
                          specialty.split('/').map(item => item.trim())
                        ).map((specialty, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center px-3 py-2 rounded-full text-xs font-elegant-sans font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-default backdrop-blur-sm"
                            style={{
                              background: `linear-gradient(135deg, ${doctorColors[currentDoctorIndex]}40, ${doctorColors[currentDoctorIndex]}80)`,
                              borderColor: doctorColors[currentDoctorIndex],
                              borderWidth: '2px',
                              borderStyle: 'solid',
                              color: '#ffffff',
                              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                            }}
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 네비게이션 버튼 및 인디케이터 */}
              <div className="relative mt-12 flex items-center justify-center space-x-8">
                {/* Left Arrow */}
                <button
                  onClick={() => {
                    const newIndex = (currentDoctorIndex - 1 + doctorsData.length) % doctorsData.length;
                    setCurrentDoctorIndex(newIndex);
                  }}
                  className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/90 flex items-center justify-center group"
                >
                  <svg className="w-5 h-5 text-cyan-800 group-hover:text-cyan-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Indicators */}
                <div className="flex space-x-3">
                  {doctorsData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentDoctorIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentDoctorIndex
                          ? 'bg-teal-smoke-500 w-10' 
                          : 'bg-teal-smoke-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={() => {
                    const newIndex = (currentDoctorIndex + 1) % doctorsData.length;
                    setCurrentDoctorIndex(newIndex);
                  }}
                  className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/90 flex items-center justify-center group"
                >
                  <svg className="w-5 h-5 text-cyan-800 group-hover:text-cyan-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 중간 분리 섹션 - 슬로건 */}
        <section id="slogan-section" className="w-full bg-white py-40 md:py-48">
          {/* 슬로건 텍스트 */}
          <div className={`text-center mb-24 md:mb-28 px-6 transform transition-all duration-1000 ease-out ${
            isSloganVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-16 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-nanum-myeongjo font-light mb-6 tracking-wide leading-tight text-slate-800">
              Lifting Beyond Expectations
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl font-nanum-myeongjo font-light text-slate-600">
              기대 이상의 리프팅, SILOS
            </p>
          </div>
          
          {/* 이미지 */}
          <div className={`w-full h-80 md:h-96 lg:h-[28rem] transform transition-all duration-1000 ease-out delay-300 ${
            isSloganVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-16 opacity-0'
          }`}>
            <img 
              src="/images/banners/middle-image.png"
              alt="SILOS Clinic"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* 시술 안내 섹션 - 세련된 히어로 */}
        <section id="procedures" className="w-full relative overflow-hidden">
          {/* 세련된 히어로 배경 */}
          <div className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-teal-smoke-50">
            {/* 글래스 효과 백그라운드 */}
            <div className="absolute inset-0">
              <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-teal-smoke-300/15 to-elegant-400/15 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-elegant-300/10 to-teal-smoke-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="mb-6">
                <span className="inline-block px-6 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-elegant-sans font-medium tracking-wide text-teal-smoke-800 border border-teal-smoke-200/30">
                  <Sparkles className="w-4 h-4 mr-2 inline" />
                  SILOS REPRESENTATIVE PROCEDURES
                </span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-nanum-myeongjo font-bold mb-6 tracking-tight leading-tight text-gray-800">
                대표 시술
              </h2>
              
              <div className="w-20 h-0.5 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-6"></div>
              
              <p className="text-lg md:text-xl font-elegant-sans font-light leading-relaxed text-gray-600 max-w-2xl mx-auto">
                실로스만의 특화된 시술로 더 젊고 아름다운 모습을 만나보세요
              </p>
            </div>
          </div>

          {/* 시술 섹션들 */}
          <div className="w-full bg-gradient-to-br from-white via-teal-smoke-50 to-elegant-50">
            {representativeProcedures.map((procedure, index) => (
              <div key={procedure.id} className={`w-full py-12 ${index > 0 ? 'border-t border-teal-smoke-200/30' : ''} relative overflow-hidden`}>
                {/* 섹션 배경 효과 */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-teal-smoke-25 to-elegant-25 opacity-50"></div>
                <div className={`absolute ${index % 2 === 0 ? 'right-0' : 'left-0'} top-0 bottom-0 w-1/3 bg-gradient-to-${index % 2 === 0 ? 'l' : 'r'} from-teal-smoke-50/30 to-transparent`}></div>
                
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}>
                    {/* 이미지 섹션 */}
                    <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} relative group`}>
                      <div className="relative w-full max-w-md mx-auto">
                        {/* 배경 블롭 효과 */}
                        <div className="absolute -inset-8 bg-gradient-to-br from-teal-smoke-100/50 to-elegant-200/50 rounded-full blur-3xl transform group-hover:scale-105 transition-all duration-500 opacity-60"></div>
                        
                        <div 
                          className="relative w-full h-80 overflow-hidden transition-all duration-500 group-hover:shadow-xl"
                          style={{
                            clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
                            backgroundImage: `url(${procedure.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                          {/* 미묘한 호버 오버레이 */}
                          <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-500/0 to-elegant-500/0 group-hover:from-teal-smoke-500/5 group-hover:to-elegant-500/5 transition-all duration-500"></div>
                        </div>
                      </div>
                    </div>

                    {/* 텍스트 섹션 */}
                    <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} space-y-4`}>
                      <div>
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-smoke-100/80 to-elegant-100/80 backdrop-blur-md rounded-2xl text-sm font-elegant-sans font-medium tracking-wide text-teal-smoke-800 border border-white/30 mb-3 shadow-lg">
                          <div className="w-2 h-2 bg-teal-smoke-500 rounded-full mr-3 animate-pulse"></div>
                          {procedure.subtitle}
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-display font-light text-gray-800 mb-3 tracking-wide">
                          {procedure.title}
                        </h3>
                        
                        <p className="text-base font-elegant-sans font-light leading-relaxed text-gray-600 mb-4">
                          {procedure.shortDesc}
                        </p>
                      </div>

                      {/* 서브 옵션들 (리프팅 시술에만 표시) */}
                      {procedure.subOptions && (
                        <div className="mb-4">
                          <h4 className="text-lg font-elegant-sans font-semibold text-gray-800 mb-3">포함 시술</h4>
                          <div className="space-y-3">
                            {procedure.subOptions.map((option, i) => (
                              <Link
                                key={i}
                                href={option.route}
                                className="block bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-4 hover:from-teal-smoke-50/90 hover:to-elegant-50/70 hover:border-teal-smoke-200/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-elegant-sans font-semibold text-gray-800 group-hover:text-teal-smoke-700 transition-colors">
                                    {option.name}
                                  </span>
                                  <div className="flex items-center space-x-2">
                                    <span className="font-elegant-sans text-teal-smoke-600 font-bold text-sm bg-teal-smoke-100/60 px-2 py-1 rounded-lg">{option.duration}</span>
                                    <div className="w-6 h-6 bg-teal-smoke-100/60 rounded-full flex items-center justify-center group-hover:bg-teal-smoke-200/80 transition-colors">
                                      <ArrowRight className="w-3 h-3 text-teal-smoke-600 group-hover:translate-x-0.5 transition-transform duration-300" />
                                    </div>
                                  </div>
                                </div>
                                <p className="text-sm font-elegant-sans text-gray-600 leading-relaxed">{option.desc}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 특징 배지들 */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {procedure.features.map((feature, i) => (
                          <div key={i} className="inline-flex items-center px-4 py-2 rounded-2xl text-sm font-elegant-sans font-medium bg-gradient-to-r from-teal-smoke-50/90 to-elegant-50/90 text-teal-smoke-700 border border-white/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                            <div className="w-1.5 h-1.5 bg-teal-smoke-500 rounded-full mr-2"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA 버튼 */}
                      <div className="flex items-center space-x-4">
                        <Link
                          href={procedure.route}
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-smoke-500 via-teal-smoke-600 to-elegant-600 text-white rounded-2xl font-elegant-sans font-medium hover:from-teal-smoke-600 hover:via-teal-smoke-700 hover:to-elegant-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-[1.02]"
                        >
                          자세히 보기
                          <div className="w-5 h-5 ml-2 bg-white/20 rounded-full flex items-center justify-center">
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </Link>
                        
                        <div className="inline-flex items-center text-teal-smoke-600 font-elegant-sans font-medium text-sm bg-teal-smoke-50/60 px-3 py-2 rounded-xl backdrop-blur-sm">
                          <div className="w-4 h-4 mr-2 bg-teal-smoke-200 rounded-full flex items-center justify-center">
                            <Clock className="w-2.5 h-2.5 text-teal-smoke-600" />
                          </div>
                          {procedure.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 상담 신청 CTA */}
          <div className="w-full py-16 bg-gradient-to-br from-white via-teal-smoke-50 to-elegant-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
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
                    <div className="relative group">
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
                    </div>
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