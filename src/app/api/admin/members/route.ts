import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080/api/v1';

export async function GET(request: NextRequest) {
  // 관리자 권한 필요
  const authError = await requireAuth('admin')(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    const authHeader = request.headers.get('authorization');

    // 현재 백엔드에는 전체 사용자 목록 API가 없으므로 임시 mock 데이터 사용
    // TODO: 백엔드에 전체 사용자 목록 API 추가 필요
    
    if (type === 'deleted') {
      // 탈퇴한 사용자 목록은 백엔드 API 사용
      const response = await fetch(`${BACKEND_URL}/admin/users/deleted`, {
        method: 'GET',
        headers: {
          'Authorization': authHeader || '',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        return NextResponse.json({
          success: true,
          message: '탈퇴한 회원 목록을 조회했습니다.',
          data: data.data.map((user: any) => ({
            id: user.id,
            userId: user.userId || '',
            username: user.name,
            email: user.email,
            phone: user.phone,
            role: 'USER', // 기본값
            createdAt: new Date().toISOString(), // 임시값
            consultationCount: 0, // 임시값
            isActive: false // 탈퇴한 사용자이므로 비활성
          }))
        });
      } else {
        return NextResponse.json({
          success: false,
          message: data.message || '탈퇴한 회원 목록 조회에 실패했습니다.'
        }, { status: response.status });
      }
    } else {
      // 전체 활성 사용자 목록 - 백엔드 API 사용
      const response = await fetch(`${BACKEND_URL}/admin/users`, {
        method: 'GET',
        headers: {
          'Authorization': authHeader || '',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        return NextResponse.json({
          success: true,
          message: '회원 목록을 조회했습니다.',
          data: data.data.map((user: any) => ({
            id: user.id,
            userId: user.id?.toString() || '',  // userId는 실제로는 id를 사용
            username: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role || 'USER',
            createdAt: user.createdAt || new Date().toISOString(),
            consultationCount: user.consultationCount || 0,
            lastConsultationDate: user.lastConsultationDate,
            isActive: true
          }))
        });
      } else {
        return NextResponse.json({
          success: false,
          message: data.message || '회원 목록 조회에 실패했습니다.'
        }, { status: response.status });
      }
    }
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { success: false, message: '회원 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}