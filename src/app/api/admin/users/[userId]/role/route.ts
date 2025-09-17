import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080/api/v1';

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  // 관리자 권한 필요
  const authError = await requireAuth('admin')(request);
  if (authError) return authError;

  try {
    const { userId } = params;
    const { role } = await request.json();
    const authHeader = request.headers.get('authorization');

    if (!role || !['USER', 'ADMIN'].includes(role)) {
      return NextResponse.json({
        success: false,
        message: '유효하지 않은 권한입니다.'
      }, { status: 400 });
    }

    // 백엔드 API 호출
    const response = await fetch(`${BACKEND_URL}/admin/users/${userId}/role?role=${role}`, {
      method: 'PUT',
      headers: {
        'Authorization': authHeader || '',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return NextResponse.json({
        success: true,
        message: data.message || '권한이 성공적으로 변경되었습니다.',
        data: data.data
      });
    } else {
      return NextResponse.json({
        success: false,
        message: data.message || '권한 변경에 실패했습니다.'
      }, { status: response.status });
    }
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { success: false, message: '권한 변경 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}