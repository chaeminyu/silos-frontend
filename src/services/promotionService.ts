import api from '@/lib/axios';

export interface Promotion {
  id: number;
  title: string;
  content: string;
  promotionStartDate: string;
  promotionEndDate: string;
  status: 'UPCOMING' | 'ACTIVE' | 'END';
  viewCount: number;
  createdAt: string;
  posterUrl?: string;
}

export interface PromotionListResponse {
  content: Promotion[];
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface PromotionApplication {
  promotionId: number;
  name: string;
  phone: string;
  email: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
}

class PromotionService {
  // 프로모션 목록 조회
  async getPromotions(status?: 'UPCOMING' | 'ACTIVE' | 'END'): Promise<PromotionListResponse> {
    const params = status ? { status } : {};
    const response = await api.get('/api/promotions', { params });
    return response.data;
  }

  // 프로모션 상세 조회
  async getPromotionById(id: number): Promise<Promotion> {
    const response = await api.get(`/api/promotions/${id}`);
    return response.data;
  }

  // 프로모션 신청
  async applyForPromotion(application: PromotionApplication): Promise<void> {
    await api.post(`/api/promotions/${application.promotionId}/apply`, application);
  }

  // 활성 프로모션 조회 (홈 팝업용)
  async getActivePromotions(): Promise<Promotion[]> {
    const response = await api.get('/api/promotions/active');
    return response.data;
  }
}

export default new PromotionService();