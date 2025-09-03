// 이벤트 관련 API 서비스
// 실제 백엔드 연동 시 사용할 서비스 파일

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// 임시 데이터 - 실제로는 백엔드에서 가져와야 함
const mockEvents = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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

export interface Event {
  id: string;
  title: string;
  periodStart: string;
  periodEnd: string;
  posterUrl: string;
  status: 'ongoing' | 'upcoming' | 'ended';
  content?: string;
  viewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const eventService = {
  // 이벤트 목록 조회
  async getEvents(status?: string): Promise<Event[]> {
    try {
      // 임시로 mockEvents 사용 - 실제로는 백엔드 API 호출
      let filteredEvents = mockEvents;
      if (status) {
        filteredEvents = mockEvents.filter(event => event.status === status);
      }
      
      // 날짜 포맷 변환
      return filteredEvents.map(event => ({
        ...event,
        periodStart: event.periodStart,
        periodEnd: event.periodEnd
      }));
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  // 진행 중인 이벤트 조회 (팝업용)
  async getOngoingEvents(): Promise<Event[]> {
    try {
      // 임시로 mockEvents에서 ongoing 상태만 필터링
      const ongoingEvents = mockEvents.filter(event => event.status === 'ongoing');
      return ongoingEvents.map(event => ({
        ...event,
        periodStart: event.periodStart,
        periodEnd: event.periodEnd
      }));
    } catch (error) {
      console.error('Error fetching ongoing events:', error);
      return [];
    }
  },

  // 이벤트 상세 조회
  async getEventById(id: string): Promise<Event | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`);
      if (!response.ok) throw new Error('Failed to fetch event');
      return response.json();
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
  async incrementViewCount(id: string): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/events/${id}/view`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Error incrementing view count:', error);
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