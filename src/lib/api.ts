import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse, ConsultationRequest, Procedure, Doctor, GalleryItem } from '@/types';

// API 클라이언트 인스턴스 생성
const createApiClient = (): AxiosInstance => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
  
  const client = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 요청 인터셉터
  client.interceptors.request.use(
    (config) => {
      // 요청 로깅 (개발 환경에서만)
      if (process.env.NODE_ENV === 'development') {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      }
      
      // 인증 토큰이 있다면 헤더에 추가
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      console.error('❌ API Request Error:', error);
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      // 응답 로깅 (개발 환경에서만)
      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`);
      }
      
      return response;
    },
    (error) => {
      // 에러 처리
      console.error('❌ API Response Error:', error);
      
      if (error.response?.status === 401) {
        // 인증 에러 처리
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
      }
      
      // 사용자 친화적인 에러 메시지 변환
      const errorMessage = getErrorMessage(error);
      error.userMessage = errorMessage;
      
      return Promise.reject(error);
    }
  );

  return client;
};

// 에러 메시지 변환 함수
const getErrorMessage = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  switch (error.response?.status) {
    case 400:
      return '잘못된 요청입니다. 입력 정보를 확인해주세요.';
    case 401:
      return '인증이 필요합니다. 다시 로그인해주세요.';
    case 403:
      return '접근 권한이 없습니다.';
    case 404:
      return '요청한 정보를 찾을 수 없습니다.';
    case 429:
      return '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.';
    case 500:
      return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    default:
      if (error.code === 'ECONNABORTED') {
        return '요청 시간이 초과되었습니다. 네트워크 연결을 확인해주세요.';
      }
      if (error.code === 'ERR_NETWORK') {
        return '네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인해주세요.';
      }
      return '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }
};

// API 클라이언트 인스턴스
export const apiClient = createApiClient();

// API 함수들
export const api = {
  // 시술 관련 API
  procedures: {
    getAll: async (): Promise<Procedure[]> => {
      const response = await apiClient.get<ApiResponse<Procedure[]>>('/procedures');
      return response.data.data || [];
    },
    
    getById: async (id: string): Promise<Procedure> => {
      const response = await apiClient.get<ApiResponse<Procedure>>(`/procedures/${id}`);
      if (!response.data.data) {
        throw new Error('시술 정보를 찾을 수 없습니다.');
      }
      return response.data.data;
    },
    
    getByCategory: async (category: string): Promise<Procedure[]> => {
      const response = await apiClient.get<ApiResponse<Procedure[]>>(`/procedures/category/${category}`);
      return response.data.data || [];
    },
    
    getPopular: async (limit = 8): Promise<Procedure[]> => {
      const response = await apiClient.get<ApiResponse<Procedure[]>>(`/procedures/popular?limit=${limit}`);
      return response.data.data || [];
    },
  },

  // 상담 관련 API
  consultation: {
    submit: async (data: ConsultationRequest): Promise<{ success: boolean; message: string }> => {
      const response = await apiClient.post<ApiResponse<{ id: string }>>('/consultation', data);
      return {
        success: response.data.success,
        message: response.data.message || '상담 신청이 완료되었습니다.',
      };
    },
    
    submitQuick: async (data: Omit<ConsultationRequest, 'email' | 'message'>): Promise<{ success: boolean; message: string }> => {
      const response = await apiClient.post<ApiResponse<{ id: string }>>('/consultation/quick', data);
      return {
        success: response.data.success,
        message: response.data.message || '빠른 상담 신청이 완료되었습니다.',
      };
    },
  },

  // 의료진 관련 API
  doctors: {
    getAll: async (): Promise<Doctor[]> => {
      const response = await apiClient.get<ApiResponse<Doctor[]>>('/doctors');
      return response.data.data || [];
    },
    
    getById: async (id: string): Promise<Doctor> => {
      const response = await apiClient.get<ApiResponse<Doctor>>(`/doctors/${id}`);
      if (!response.data.data) {
        throw new Error('의료진 정보를 찾을 수 없습니다.');
      }
      return response.data.data;
    },
  },

  // 갤러리 관련 API
  gallery: {
    getAll: async (type?: string, limit?: number): Promise<GalleryItem[]> => {
      const params = new URLSearchParams();
      if (type) params.append('type', type);
      if (limit) params.append('limit', limit.toString());
      
      const response = await apiClient.get<ApiResponse<GalleryItem[]>>(`/gallery?${params}`);
      return response.data.data || [];
    },
    
    getBeforeAfter: async (procedureId?: string, limit = 12): Promise<GalleryItem[]> => {
      const params = new URLSearchParams();
      params.append('type', 'before_after');
      params.append('limit', limit.toString());
      if (procedureId) params.append('procedureId', procedureId);
      
      const response = await apiClient.get<ApiResponse<GalleryItem[]>>(`/gallery?${params}`);
      return response.data.data || [];
    },
  },

  // 파일 업로드 API
  upload: {
    image: async (file: File, folder = 'general'): Promise<{ url: string; filename: string }> => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      
      const response = await apiClient.post<ApiResponse<{ url: string; filename: string }>>(
        '/upload/image', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      if (!response.data.data) {
        throw new Error('파일 업로드에 실패했습니다.');
      }
      
      return response.data.data;
    },
  },

  // 사이트 설정 API
  settings: {
    get: async (): Promise<any> => {
      const response = await apiClient.get<ApiResponse<any>>('/settings');
      return response.data.data || {};
    },
  },

  // 검색 API
  search: {
    procedures: async (query: string, category?: string): Promise<Procedure[]> => {
      const params = new URLSearchParams();
      params.append('q', query);
      if (category) params.append('category', category);
      
      const response = await apiClient.get<ApiResponse<Procedure[]>>(`/search/procedures?${params}`);
      return response.data.data || [];
    },
  },

  // 통계 API (관리자용)
  analytics: {
    getOverview: async (): Promise<any> => {
      const response = await apiClient.get<ApiResponse<any>>('/analytics/overview');
      return response.data.data || {};
    },
  },
};

// React Query용 쿼리 키 생성 함수
export const queryKeys = {
  procedures: {
    all: ['procedures'] as const,
    lists: () => [...queryKeys.procedures.all, 'list'] as const,
    list: (category?: string) => [...queryKeys.procedures.lists(), { category }] as const,
    details: () => [...queryKeys.procedures.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.procedures.details(), id] as const,
    popular: () => [...queryKeys.procedures.all, 'popular'] as const,
  },
  doctors: {
    all: ['doctors'] as const,
    lists: () => [...queryKeys.doctors.all, 'list'] as const,
    details: () => [...queryKeys.doctors.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.doctors.details(), id] as const,
  },
  gallery: {
    all: ['gallery'] as const,
    lists: () => [...queryKeys.gallery.all, 'list'] as const,
    list: (type?: string, procedureId?: string) => 
      [...queryKeys.gallery.lists(), { type, procedureId }] as const,
    beforeAfter: (procedureId?: string) => 
      [...queryKeys.gallery.all, 'beforeAfter', { procedureId }] as const,
  },
  settings: {
    all: ['settings'] as const,
  },
};

// API 요청 래퍼 함수 (에러 처리 포함)
export const withErrorHandling = async <T>(
  apiCall: () => Promise<T>,
  fallback?: T
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error: any) {
    console.error('API Error:', error);
    
    // 사용자에게 알림 표시 (토스트 등)
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('api-error', {
        detail: {
          message: error.userMessage || error.message,
          type: 'error',
        },
      }));
    }
    
    if (fallback !== undefined) {
      return fallback;
    }
    
    throw error;
  }
};

// 캐시 무효화 유틸리티
export const invalidateQueries = (queryClient: any, keys: readonly unknown[]) => {
  queryClient.invalidateQueries({ queryKey: keys });
};

// API 상태 관리용 헬퍼
export const createApiState = <T>() => ({
  data: null as T | null,
  isLoading: false,
  error: null as string | null,
  lastFetched: null as Date | null,
});

export default api;