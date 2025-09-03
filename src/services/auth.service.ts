import api from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  async login(credentials: LoginRequest) {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    if (response.success && response.data) {
      api.setAuthToken(response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  async signup(userData: SignupRequest) {
    const response = await api.post<AuthResponse>('/auth/signup', userData);
    
    if (response.success && response.data) {
      api.setAuthToken(response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  async logout() {
    api.clearAuthToken();
    localStorage.removeItem('user');
    
    // Optional: Call backend logout endpoint
    await api.post('/auth/logout', {});
    
    return { success: true };
  }

  async getCurrentUser() {
    return api.get<User>('/auth/me');
  }

  getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getStoredUser();
  }

  isAdmin(): boolean {
    const user = this.getStoredUser();
    return user?.role === 'ADMIN';
  }
}

const authService = new AuthService();
export default authService;