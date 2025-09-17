import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';

// Mock data for Before/After photos
const beforeAfterData = {
  basic: [
    {
      id: '1',
      procedure: '실로스 실리프팅',
      description: '기본 사례 1',
      beforeImage: '/images/before-after/basic-1-before.jpg',
      afterImage: '/images/before-after/basic-1-after.jpg',
      duration: '시술 후 1개월'
    },
    {
      id: '2',
      procedure: '미니 리프팅',
      description: '기본 사례 2',
      beforeImage: '/images/before-after/basic-2-before.jpg',
      afterImage: '/images/before-after/basic-2-after.jpg',
      duration: '시술 후 3주'
    }
  ],
  premium: [
    {
      id: '3',
      procedure: '실로스 실리프팅',
      description: '프리미엄 사례 1 - 상세 분석 포함',
      beforeImage: '/images/before-after/premium-1-before.jpg',
      afterImage: '/images/before-after/premium-1-after.jpg',
      duration: '시술 후 2개월',
      analysis: '피부 탄력도 35% 개선, 주름 깊이 평균 22% 감소'
    },
    {
      id: '4',
      procedure: '피부 리프팅',
      description: '프리미엄 사례 2 - 장기 추적 관찰',
      beforeImage: '/images/before-after/premium-2-before.jpg',
      afterImage: '/images/before-after/premium-2-after.jpg',
      duration: '시술 후 6개월',
      analysis: '콜라겐 밀도 28% 증가, 피부 톤 균일도 개선'
    },
    {
      id: '5',
      procedure: '페이스 리프팅',
      description: '프리미엄 사례 3 - 복합 시술',
      beforeImage: '/images/before-after/premium-3-before.jpg',
      afterImage: '/images/before-after/premium-3-after.jpg',
      duration: '시술 후 3개월',
      analysis: '안면 윤곽 개선, V라인 형성 효과'
    }
  ],
  admin: [
    {
      id: '6',
      procedure: '실험적 시술',
      description: '관리자 전용 - 임상 연구 데이터',
      beforeImage: '/images/before-after/admin-1-before.jpg',
      afterImage: '/images/before-after/admin-1-after.jpg',
      duration: '시술 후 12개월',
      analysis: '장기 추적 관찰 데이터, 부작용 분석 포함',
      clinicalNotes: '상세 임상 기록'
    }
  ]
};

export async function GET(request: NextRequest) {
  // Check authentication - default requires 'basic' level
  const authError = await requireAuth('basic')(request);
  if (authError) return authError;

  // Get user from request (added by middleware)
  const user = (request as any).user;
  
  // Return data based on user's access level
  let responseData = [...beforeAfterData.basic];
  
  if (user.accessLevel === 'premium' || user.accessLevel === 'admin') {
    responseData = [...responseData, ...beforeAfterData.premium];
  }
  
  if (user.accessLevel === 'admin') {
    responseData = [...responseData, ...beforeAfterData.admin];
  }

  return NextResponse.json({
    success: true,
    data: responseData,
    accessLevel: user.accessLevel,
    totalAvailable: {
      basic: beforeAfterData.basic.length,
      premium: beforeAfterData.premium.length,
      admin: beforeAfterData.admin.length
    }
  });
}