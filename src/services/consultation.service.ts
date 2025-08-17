import api from './api';

export interface Procedure {
  id: string;
  name: string;
  category: string;
}

export interface ConsultationRequest {
  procedures: Procedure[];
  preferredDate: string;
  preferredTime: string;
  message: string;
  isPublic: boolean;
}

export interface Consultation {
  id: string;
  userId: string;
  userName: string;
  procedures: Procedure[];
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  adminResponse?: string;
  isPublic: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface ConsultationFilters {
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  userId?: string;
  isPublic?: boolean;
  page?: number;
  limit?: number;
}

class ConsultationService {
  async createConsultation(data: ConsultationRequest) {
    return api.post<Consultation>('/consultations', data);
  }

  async getConsultations(filters?: ConsultationFilters) {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }
    
    const endpoint = `/consultations${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return api.get<Consultation[]>(endpoint);
  }

  async getConsultationById(id: string) {
    return api.get<Consultation>(`/consultations/${id}`);
  }

  async updateConsultationStatus(id: string, status: string, adminResponse?: string) {
    return api.put<Consultation>(`/consultations/${id}/status`, {
      status,
      adminResponse,
    });
  }

  async deleteConsultation(id: string) {
    return api.delete(`/consultations/${id}`);
  }

  async incrementViews(id: string) {
    return api.put<Consultation>(`/consultations/${id}/views`, {});
  }
}

export default new ConsultationService();