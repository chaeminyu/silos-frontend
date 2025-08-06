// 사이트 기본 정보
export const SITE_CONFIG = {
  name: '실로스 성형외과',
  title: '실로스 성형외과 - 실리프팅은 실로스',
  description: '실리프팅은 실로스 - 나를 위한 커스텀 리프팅. 20년 이상의 노하우로 안전하고 자연스러운 리프팅을 제공합니다.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://silos-clinic.com',
  ogImage: '/images/og-image.jpg',
  keywords: [
    '실로스',
    '성형외과',
    '실리프팅',
    '리프팅',
    '창원성형외과',
    '눈성형',
    '코성형',
    '안면거상',
    '주름제거',
    '보톡스',
    '필러',
  ],
};

// 브랜드 슬로건
export const BRAND_MESSAGES = {
  main: '실리프팅은 실로스',
  sub: '나를 위한 커스텀 리프팅',
  philosophy: '실로스, 리프팅에 진심을 담다',
} as const;

// 연락처 정보
export const CONTACT_INFO = {
  phone: '055-123-4567',
  email: 'info@silos-clinic.com',
  kakaoTalk: 'https://pf.kakao.com/_xkTQxd',
  address: {
    full: '경상남도 창원시 의창구 중앙대로 123 실로스빌딩 2-4층',
    city: '창원시',
    district: '의창구',
    street: '중앙대로 123',
    building: '실로스빌딩 2-4층',
    postalCode: '51140',
  },
  coordinates: {
    lat: 35.2281,
    lng: 128.6811,
  },
} as const;

// 진료시간
export const BUSINESS_HOURS = {
  weekday: '평일 09:00 - 18:00',
  saturday: '토요일 09:00 - 15:00',
  sunday: '일요일 휴진',
  holiday: '공휴일 휴진',
  lunch: '점심시간 12:30 - 13:30',
} as const;

// 메인 배너 시술 (8개)
export const MAIN_PROCEDURES = [
  {
    id: 'silos-thread-lifting',
    name: '실로스 실리프팅',
    shortDescription: '어려졌다! 나를 위한 커스텀 리프팅',
    category: 'thread_lifting',
    image: '/images/procedures/thread-lifting-main.jpg',
    badge: 'SIGNATURE',
  },
  {
    id: 'forehead-lifting',
    name: '이마 눈썹 리프팅(내시경)',
    shortDescription: '상안부 리프팅, 동안의 시작점',
    category: 'forehead_lifting',
    image: '/images/procedures/forehead-lifting-main.jpg',
    badge: 'HOT',
  },
  {
    id: 'under-eye-laser',
    name: '눈밑 지방레이져(다크서클)',
    shortDescription: '절개 NO! 회복 YES!',
    category: 'under_eye_laser',
    image: '/images/procedures/under-eye-laser-main.jpg',
    badge: '10분 완성',
  },
  {
    id: 'silofat',
    name: '실로팻',
    shortDescription: '흡입은 부담스러우니까, 실로팻으로 쏙!',
    category: 'silofat',
    image: '/images/procedures/silofat-main.jpg',
    badge: 'No Pain',
  },
  {
    id: 'eyelid-lifting',
    name: '눈처짐(상하안검)',
    shortDescription: '위도 아래도 눈은 전체가 중요합니다',
    category: 'eyelid_lifting',
    image: '/images/procedures/eyelid-lifting-main.jpg',
    badge: null,
  },
  {
    id: 'collagen-filling',
    name: '콜라채움(주름,탄력)',
    shortDescription: '매일 걱정인 볼륨&모공, 콜라채움으로 채워',
    category: 'skin_lifting',
    image: '/images/procedures/collagen-filling-main.jpg',
    badge: null,
  },
  {
    id: 'sleep-treatment',
    name: '수면 울쎄라,리쥬란',
    shortDescription: '울쎄라도, 리쥬란도 이제 수면으로 편하게!',
    category: 'laser_lifting',
    image: '/images/procedures/sleep-treatment-main.jpg',
    badge: 'NEW',
  },
  {
    id: 'neck-lifting',
    name: '10min 레이져 실 목 리프팅',
    shortDescription: '실로 당기고, 레이저로 채우다',
    category: 'neck_lifting',
    image: '/images/procedures/neck-lifting-main.jpg',
    badge: '10분',
  },
] as const;

// 시술 카테고리
export const PROCEDURE_CATEGORIES = {
  thread_lifting: {
    name: '실로스 커스터마이징 실리프팅',
    description: '개인 맞춤형 실리프팅',
    icon: 'thread',
    color: 'primary',
  },
  face_lifting: {
    name: '페이스 리프팅',
    description: '전체적인 안면 리프팅',
    icon: 'face',
    color: 'secondary',
  },
  forehead_lifting: {
    name: '이마눈썹 리프팅(내시경미니거상)',
    description: '상안부 전용 리프팅',
    icon: 'forehead',
    color: 'accent',
  },
  neck_lifting: {
    name: '목 리프팅',
    description: '목선 개선 전용',
    icon: 'neck',
    color: 'primary',
  },
  eyelid_lifting: {
    name: '눈꺼풀처짐 리프팅',
    description: '상하안검 개선',
    icon: 'eye',
    color: 'secondary',
  },
  under_eye_laser: {
    name: '눈밑지방 레이저',
    description: '비절개 눈밑 개선',
    icon: 'laser',
    color: 'accent',
  },
  laser_lifting: {
    name: '레이저 리프팅',
    description: '비침습 레이저 치료',
    icon: 'laser',
    color: 'primary',
  },
  silofat: {
    name: '실로팻',
    description: '지방추출주사',
    icon: 'injection',
    color: 'secondary',
  },
  skin_lifting: {
    name: '피부 리프팅',
    description: '피부 탄력 개선',
    icon: 'skin',
    color: 'accent',
  },
  special_fillers: {
    name: '특수부위 필러',
    description: '부위별 맞춤 필러',
    icon: 'filler',
    color: 'primary',
  },
  skin_care: {
    name: '피부 올인원',
    description: '종합 피부 관리',
    icon: 'care',
    color: 'secondary',
  },
} as const;

// 메뉴 구조
export const MAIN_MENU = [
  {
    id: 'about',
    label: '병원소개',
    href: '/about',
    children: [
      { id: 'philosophy', label: '실로스 진료철학', href: '/about/philosophy' },
      { id: 'doctors', label: '의료진 소개', href: '/about/doctors' },
      { id: 'facilities', label: '둘러보기', href: '/about/facilities' },
      { id: 'directions', label: '진료안내 / 오시는 길', href: '/about/directions' },
      { id: 'community', label: '커뮤니티', href: '/about/community' },
    ],
  },
  {
    id: 'why-silos',
    label: 'WHY 실로스',
    href: '/why-silos',
  },
  {
    id: 'procedures',
    label: '시술정보',
    href: '/procedures',
    children: Object.entries(PROCEDURE_CATEGORIES).map(([key, category]) => ({
      id: key,
      label: category.name,
      href: `/procedures/${key}`,
    })),
  },
  {
    id: 'gallery',
    label: '전후사진',
    href: '/gallery',
  },
  {
    id: 'consultation',
    label: '상담/예약',
    href: '/consultation',
    children: [
      { id: 'quick', label: '빠른상담예약', href: '/consultation/quick' },
      { id: 'online', label: '온라인예약', href: '/consultation/online' },
      { id: 'kakao', label: '카톡상담', href: CONTACT_INFO.kakaoTalk, external: true },
    ],
  },
] as const;

// Quick Menu 설정
export const QUICK_MENU = [
  {
    id: 'consultation',
    label: '빠른상담',
    href: '/consultation/quick',
    icon: 'message-circle',
    color: 'primary',
  },
  {
    id: 'reservation',
    label: '온라인예약',
    href: '/consultation/online',
    icon: 'calendar',
    color: 'secondary',
  },
  {
    id: 'kakao',
    label: '카톡상담',
    href: CONTACT_INFO.kakaoTalk,
    icon: 'message-square',
    color: 'accent',
    external: true,
  },
  {
    id: 'call',
    label: '전화상담',
    href: `tel:${CONTACT_INFO.phone}`,
    icon: 'phone',
    color: 'primary',
    external: true,
  },
] as const;

// 소셜 미디어
export const SOCIAL_MEDIA = {
  youtube: 'https://youtube.com/@silos-clinic',
  instagram: 'https://instagram.com/silos_clinic',
  facebook: 'https://facebook.com/silosclinic',
  blog: 'https://blog.naver.com/silosclinic',
} as const;

// 애니메이션 설정
export const ANIMATION_CONFIG = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
  stagger: {
    children: 0.1,
    cards: 0.15,
  },
} as const;

// 이미지 최적화 설정
export const IMAGE_CONFIG = {
  quality: 85,
  formats: ['webp', 'avif'],
  sizes: {
    mobile: '(max-width: 768px) 100vw',
    tablet: '(max-width: 1024px) 50vw',
    desktop: '33vw',
  },
  blur: {
    dataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyeY3jlmhBHNzX2jp/kVFEAA',
  },
} as const;

// 폼 검증 규칙
export const VALIDATION_RULES = {
  name: {
    required: '이름을 입력해주세요.',
    minLength: { value: 2, message: '이름은 2글자 이상 입력해주세요.' },
    maxLength: { value: 20, message: '이름은 20글자 이하로 입력해주세요.' },
    pattern: {
      value: /^[가-힣a-zA-Z\s]+$/,
      message: '이름은 한글, 영문만 입력 가능합니다.',
    },
  },
  phone: {
    required: '연락처를 입력해주세요.',
    pattern: {
      value: /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/,
      message: '올바른 휴대폰 번호를 입력해주세요.',
    },
  },
  email: {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: '올바른 이메일 주소를 입력해주세요.',
    },
  },
  message: {
    maxLength: { value: 500, message: '메시지는 500자 이하로 입력해주세요.' },
  },
} as const;

// 브레이크포인트
export const BREAKPOINTS = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// 성능 최적화 설정
export const PERFORMANCE_CONFIG = {
  imageLoading: 'lazy' as const,
  imagePriority: false,
  cacheTime: 5 * 60 * 1000, // 5분
  staleTime: 1 * 60 * 1000, // 1분
  retryCount: 3,
  retryDelay: 1000,
} as const;

// 접근성 설정
export const ACCESSIBILITY_CONFIG = {
  focusRing: true,
  reducedMotion: false,
  highContrast: false,
  fontSize: 'normal' as 'small' | 'normal' | 'large',
} as const;