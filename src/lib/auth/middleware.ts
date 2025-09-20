import { NextRequest, NextResponse } from 'next/server';

export type AccessLevel = 'basic' | 'premium' | 'admin';

const roleToAccessLevel = {
  'USER': 'basic' as AccessLevel,
  'ADMIN': 'admin' as AccessLevel
};

const accessLevelHierarchy = {
  basic: 1,
  premium: 2,
  admin: 3
};

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    accessLevel: AccessLevel;
    role: string;
  };
}

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080/api/v1';

export function requireAuth(requiredLevel: AccessLevel = 'basic') {
  return async (request: NextRequest) => {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    try {
      // Verify token with backend
      const response = await fetch(`${BACKEND_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        return NextResponse.json(
          { success: false, message: '유효하지 않은 토큰입니다.' },
          { status: 401 }
        );
      }

      const data = await response.json();
      
      if (!data.data) {
        return NextResponse.json(
          { success: false, message: '사용자 정보를 가져올 수 없습니다.' },
          { status: 401 }
        );
      }

      const userProfile = data.data;
      
      // 백엔드에서 role 정보를 가져옴 (임시로 admin 이메일은 ADMIN 권한 부여)
      const role = (userProfile.email === 'admin@silos.com' ? 'ADMIN' : userProfile.role) || 'USER';
      
      // Map backend role to access level
      const accessLevel = roleToAccessLevel[role as keyof typeof roleToAccessLevel] || 'basic';
      
      // Check access level
      const userLevel = accessLevelHierarchy[accessLevel];
      const required = accessLevelHierarchy[requiredLevel];
      
      if (userLevel < required) {
        return NextResponse.json(
          { success: false, message: '접근 권한이 없습니다.' },
          { status: 403 }
        );
      }

      // Attach user to request for use in the handler
      (request as any).user = {
        id: userProfile.id?.toString() || '',
        name: userProfile.name || userProfile.username,
        email: userProfile.email,
        phone: userProfile.phone,
        accessLevel,
        role: role
      };

      return null; // Authentication successful
      
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.json(
        { success: false, message: '토큰 검증 중 오류가 발생했습니다.' },
        { status: 401 }
      );
    }
  };
}