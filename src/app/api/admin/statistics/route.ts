import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080/api/v1';

export async function GET(request: NextRequest) {
  const authError = await requireAuth('admin')(request);
  if (authError) return authError;

  try {
    const authHeader = request.headers.get('authorization');
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'overview';
    
    let backendUrl = `${BACKEND_URL}/admin/statistics/${type}`;
    
    const response = await fetch(backendUrl, {
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
        data: data.data,
        message: '통계 데이터를 조회했습니다.'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: data.message || '통계 데이터 조회에 실패했습니다.'
      }, { status: response.status });
    }
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { success: false, message: '통계 데이터 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}