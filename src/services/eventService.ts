// 이벤트 관련 API 서비스
// 실제 백엔드 연동 시 사용할 서비스 파일

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// 임시 데이터 - 실제로는 백엔드에서 가져와야 함
const mockEvents = [
  {
    id: 1, // Promotion API 호환 (number 타입)
    title: '실로스 실리프팅 솔루션',
    periodStart: '2025-08-01',
    periodEnd: '2025-09-30',
    posterUrl: '/images/events/silos-lifting-event.jpg',
    status: 'ongoing' as const,
    content: '개인별 피부 상태를 분석한 맞춤형 리프팅',
    viewCount: 371,
    createdAt: '2025-08-01 10:21'
  },
  {
    id: 2,
    title: '실로스 레이저 리프팅',
    periodStart: '2025-08-01',
    periodEnd: '2025-09-30',
    posterUrl: '/images/events/laser-lifting-event.jpg',
    status: 'ongoing' as const,
    content: '최신 레이저 기술을 활용한 프리미엄 리프팅',
    viewCount: 256,
    createdAt: '2025-08-01 10:21'
  },
  {
    id: 3,
    title: '가을 특별 이벤트',
    periodStart: '2025-09-15',
    periodEnd: '2025-10-31',
    posterUrl: '/images/events/autumn-event.jpg',
    status: 'upcoming' as const,
    content: '가을맞이 특별 프로모션',
    viewCount: 125,
    createdAt: '2025-08-20 10:21'
  },
  {
    id: 4,
    title: '여름 스페셜 프로모션',
    periodStart: '2025-06-01',
    periodEnd: '2025-07-31',
    posterUrl: '/images/events/summer-event.jpg',
    status: 'ended' as const,
    content: '여름 특별 할인 이벤트',
    viewCount: 892,
    createdAt: '2025-06-01 10:21'
  }
];

// Promotion과 호환되는 Event 인터페이스 (연동 개발자 요청사항 반영)
export interface Event {
  id: number; // Promotion API와 호환
  title: string;
  periodStart: string; // promotionStartDate와 매핑
  periodEnd: string;   // promotionEndDate와 매핑
  posterUrl: string;
  status: 'ongoing' | 'upcoming' | 'ended'; // 프론트엔드 표시용
  content?: string;
  viewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

// 백엔드 Promotion 상태를 프론트엔드 Event 상태로 변환
export function mapPromotionStatus(promotionStatus: 'UPCOMING' | 'ACTIVE' | 'END'): 'ongoing' | 'upcoming' | 'ended' {
  switch (promotionStatus) {
    case 'ACTIVE':
      return 'ongoing';
    case 'UPCOMING':
      return 'upcoming';
    case 'END':
      return 'ended';
    default:
      return 'ended';
  }
}

export const eventService = {
  // 이벤트 목록 조회
  async getEvents(status?: string): Promise<Event[]> {
    try {
      let url = `${API_BASE_URL}/promotions`;
      if (status) {
        // 프론트엔드 status를 백엔드 status로 변환
        const backendStatus = status === 'ongoing' ? 'ACTIVE' : 
                             status === 'upcoming' ? 'UPCOMING' : 
                             status === 'ended' ? 'END' : status;
        url += `?status=${backendStatus}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch promotions');
      }
      
      const result = await response.json();
      const promotions = result.data || [];
      
      // 백엔드 응답을 프론트엔드 Event 형식으로 변환
      return promotions.map((promotion: any) => ({
        id: promotion.id,
        title: promotion.title,
        periodStart: promotion.periodStart,
        periodEnd: promotion.periodEnd,
        posterUrl: promotion.posterUrl || '/images/events/default-event.jpg',
        status: promotion.status,
        content: promotion.content,
        viewCount: promotion.viewCount,
        createdAt: promotion.createdAt,
        updatedAt: promotion.updatedAt
      }));
    } catch (error) {
      console.error('Error fetching events:', error);
      // 에러 시 빈 배열 반환
      return [];
    }
  },

  // 진행 중인 이벤트 조회 (팝업용)
  async getOngoingEvents(): Promise<Event[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/promotions/active`);
      if (!response.ok) {
        throw new Error('Failed to fetch active promotions');
      }
      
      const result = await response.json();
      const promotions = result.data || [];
      
      return promotions.map((promotion: any) => ({
        id: promotion.id,
        title: promotion.title,
        periodStart: promotion.periodStart,
        periodEnd: promotion.periodEnd,
        posterUrl: promotion.posterUrl || '/images/events/default-event.jpg',
        status: promotion.status,
        content: promotion.content,
        viewCount: promotion.viewCount,
        createdAt: promotion.createdAt,
        updatedAt: promotion.updatedAt
      }));
    } catch (error) {
      console.error('Error fetching ongoing events:', error);
      return [];
    }
  },

  // 이벤트 상세 조회
  async getEventById(id: number): Promise<Event | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/promotions/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch promotion');
      }
      
      const result = await response.json();
      const promotion = result.data;
      
      if (!promotion) return null;
      
      return {
        id: promotion.id,
        title: promotion.title,
        periodStart: promotion.periodStart,
        periodEnd: promotion.periodEnd,
        posterUrl: promotion.posterUrl || '/images/events/default-event.jpg',
        status: promotion.status,
        content: promotion.content,
        viewCount: promotion.viewCount,
        createdAt: promotion.createdAt,
        updatedAt: promotion.updatedAt
      };
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  },

  // 이벤트 생성 (관리자용)
  async createEvent(eventData: Omit<Event, 'id' | 'viewCount' | 'createdAt' | 'updatedAt'>): Promise<Event | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // 관리자 인증 토큰
        },
        body: JSON.stringify(eventData)
      });
      if (!response.ok) throw new Error('Failed to create event');
      return response.json();
    } catch (error) {
      console.error('Error creating event:', error);
      return null;
    }
  },

  // 이벤트 수정 (관리자용)
  async updateEvent(id: string, eventData: Partial<Event>): Promise<Event | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // 관리자 인증 토큰
        },
        body: JSON.stringify(eventData)
      });
      if (!response.ok) throw new Error('Failed to update event');
      return response.json();
    } catch (error) {
      console.error('Error updating event:', error);
      return null;
    }
  },

  // 이벤트 삭제 (관리자용)
  async deleteEvent(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          // 'Authorization': `Bearer ${token}` // 관리자 인증 토큰
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting event:', error);
      return false;
    }
  },

  // 포스터 이미지 업로드 (관리자용)
  async uploadPoster(file: File): Promise<string | null> {
    try {
      const formData = new FormData();
      formData.append('poster', file);

      const response = await fetch(`${API_BASE_URL}/events/upload-poster`, {
        method: 'POST',
        headers: {
          // 'Authorization': `Bearer ${token}` // 관리자 인증 토큰
        },
        body: formData
      });
      
      if (!response.ok) throw new Error('Failed to upload poster');
      const data = await response.json();
      return data.url; // 업로드된 이미지 URL 반환
    } catch (error) {
      console.error('Error uploading poster:', error);
      return null;
    }
  },

  // 조회수 증가
  async incrementViewCount(id: number): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/promotions/${id}/view`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  },

  // 이벤트 신청
  async applyForEvent(id: number, applicationData: {
    name: string;
    phone: string;
    message?: string;
    preferredDate?: string;
    preferredTime?: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/promotions/${id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to apply for event');
      }
      
      const result = await response.json();
      return {
        success: true,
        message: result.data || '이벤트 신청이 완료되었습니다.'
      };
    } catch (error) {
      console.error('Error applying for event:', error);
      return {
        success: false,
        message: '신청 중 오류가 발생했습니다. 다시 시도해주세요.'
      };
    }
  }
};

// 날짜 기반 상태 자동 계산 헬퍼 함수
export function calculateEventStatus(startDate: string, endDate: string): 'ongoing' | 'upcoming' | 'ended' {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) return 'upcoming';
  if (now > end) return 'ended';
  return 'ongoing';
}

// 기간 포맷팅 헬퍼 함수
export function formatEventPeriod(startDate: string, endDate: string): string {
  const start = new Date(startDate).toLocaleDateString('ko-KR');
  const end = new Date(endDate).toLocaleDateString('ko-KR');
  return `${start} ~ ${end}`;
}