const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

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
    try {
      let url = `${API_BASE_URL}/promotions`;
      if (status) {
        url += `?status=${status}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch promotions');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching promotions:', error);
      throw error;
    }
  }

  // 프로모션 상세 조회
  async getPromotionById(id: number): Promise<Promotion> {
    try {
      const response = await fetch(`${API_BASE_URL}/promotions/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch promotion');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching promotion:', error);
      throw error;
    }
  }

  // 프로모션 신청
  async applyForPromotion(application: PromotionApplication): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/promotions/${application.promotionId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(application),
      });
      
      if (!response.ok) {
        throw new Error('Failed to apply for promotion');
      }
    } catch (error) {
      console.error('Error applying for promotion:', error);
      throw error;
    }
  }

  // 활성 프로모션 조회 (홈 팝업용)
  async getActivePromotions(): Promise<Promotion[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/promotions/active`);
      if (!response.ok) {
        throw new Error('Failed to fetch active promotions');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching active promotions:', error);
      throw error;
    }
  }
}

export default new PromotionService();