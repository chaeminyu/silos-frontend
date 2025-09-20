// 공통 타입 정의

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 시술 관련 타입
export interface Procedure {
  id: string;
  name: string;
  category: ProcedureCategory;
  description: string;
  shortDescription: string;
  duration: number; // 시술 시간 (분)
  price: {
    min: number;
    max: number;
    currency: string;
  };
  images: {
    main: string;
    gallery: string[];
    beforeAfter: BeforeAfterImage[];
  };
  features: string[];
  process: ProcedureStep[];
  aftercare: string[];
  faqs: FAQ[];
  isPopular: boolean;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum ProcedureCategory {
  THREAD_LIFTING = 'thread_lifting',
  FACE_LIFTING = 'face_lifting',
  FOREHEAD_LIFTING = 'forehead_lifting',
  NECK_LIFTING = 'neck_lifting',
  EYELID_LIFTING = 'eyelid_lifting',
  UNDER_EYE_LASER = 'under_eye_laser',
  LASER_LIFTING = 'laser_lifting',
  SILOFAT = 'silofat',
  SKIN_LIFTING = 'skin_lifting',
  SPECIAL_FILLERS = 'special_fillers',
  SKIN_CARE = 'skin_care'
}

export interface ProcedureStep {
  step: number;
  title: string;
  description: string;
  duration?: number;
  image?: string;
}

export interface BeforeAfterImage {
  id: string;
  before: string;
  after: string;
  patientAge?: number;
  patientGender?: 'male' | 'female';
  procedureDate: string;
  description?: string;
  isConsented: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

// 상담 관련 타입
export interface ConsultationRequest {
  name: string;
  phone: string;
  email?: string;
  procedureCategory: ProcedureCategory | 'general';
  message?: string;
  preferredContactTime?: 'morning' | 'afternoon' | 'evening' | 'anytime';
  privacyConsent: boolean;
  marketingConsent?: boolean;
}

export interface ConsultationResponse {
  id: string;
  status: 'REQUESTED' | 'CONFIRMED' | 'CANCELLED';
  submittedAt: string;
  contactedAt?: string;
  scheduledAt?: string;
  notes?: string;
}

// 의료진 타입
export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  education: Education[];
  experience: Experience[];
  awards: Award[];
  profileImage: string;
  introduction: string;
  philosophy: string;
  isMainDoctor: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  year: number;
  description?: string;
}

export interface Experience {
  institution: string;
  position: string;
  startYear: number;
  endYear?: number;
  description?: string;
}

export interface Award {
  title: string;
  organization: string;
  year: number;
  description?: string;
}

// 병원 정보 타입
export interface ClinicInfo {
  name: string;
  description: string;
  address: {
    full: string;
    city: string;
    district: string;
    street: string;
    postalCode: string;
  };
  contact: {
    phone: string;
    email: string;
    kakaoTalk: string;
  };
  hours: {
    weekday: string;
    saturday: string;
    sunday: string;
    holiday: string;
  };
  facilities: Facility[];
  certifications: Certification[];
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  images: string[];
  features: string[];
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  date: string;
  image?: string;
  description?: string;
}

// 갤러리 타입
export interface GalleryItem {
  id: string;
  type: 'before_after' | 'facility' | 'procedure';
  title: string;
  description?: string;
  images: GalleryImage[];
  procedureId?: string;
  tags: string[];
  isPublic: boolean;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  order: number;
}

// 메뉴 및 네비게이션 타입
export interface MenuItem {
  id: string;
  label: string;
  href: string;
  children?: MenuItem[];
  icon?: string;
  isExternal?: boolean;
  badge?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

// 폼 관련 타입
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  required: boolean;
  placeholder?: string;
  options?: FormOption[];
  validation?: ValidationRule[];
}

export interface FormOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ValidationRule {
  type: 'required' | 'email' | 'tel' | 'minLength' | 'maxLength' | 'pattern';
  value?: string | number;
  message: string;
}

// SEO 관련 타입
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

// 이벤트 및 알림 타입
export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'promotion' | 'news' | 'announcement';
  startDate: string;
  endDate?: string;
  isActive: boolean;
  bannerImage?: string;
  detailImage?: string;
  link?: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    // onClick: () => void;
  };
}

// 미디어 관련 타입
export interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  caption?: string;
  uploadedAt: string;
}

// 통계 및 분석 타입
export interface Analytics {
  pageViews: number;
  uniqueVisitors: number;
  consultationRequests: number;
  popularProcedures: {
    procedureId: string;
    name: string;
    count: number;
  }[];
  trafficSources: {
    source: string;
    visitors: number;
    percentage: number;
  }[];
}

// 설정 타입
export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logo: string;
  favicon: string;
  socialMedia: {
    youtube?: string;
    instagram?: string;
    facebook?: string;
    blog?: string;
  };
  contact: {
    phone: string;
    email: string;
    kakaoTalk: string;
    address: string;
  };
  businessHours: {
    weekday: string;
    saturday: string;
    sunday: string;
    holiday: string;
  };
  seo: {
    googleAnalytics?: string;
    googleTagManager?: string;
    naverAnalytics?: string;
  };
}

// 에러 타입
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: string;
}

// 로딩 상태 타입
export interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
  progress?: number;
}

// 검색 관련 타입
export interface SearchQuery {
  q: string;
  category?: ProcedureCategory;
  sort?: 'relevance' | 'popularity' | 'recent';
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  type: 'procedure' | 'doctor' | 'article';
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  relevanceScore: number;
}