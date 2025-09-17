import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080/api/v1';

// GET all events/promotions (admin only)
export async function GET(request: NextRequest) {
  const authError = await requireAuth('admin')(request);
  if (authError) return authError;

  try {
    const authHeader = request.headers.get('authorization');

    let backendUrl = `${BACKEND_URL}/admin/promotions`;
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Authorization': authHeader || '',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      // Backend 데이터를 frontend 형식으로 변환
      const events = (data.data || []).map((promotion: any) => ({
        id: promotion.id,
        title: promotion.title,
        periodStart: promotion.promotionStartDate || '',
        periodEnd: promotion.promotionEndDate || '',
        posterUrl: promotion.posterUrl || null,
        status: getPromotionStatus(promotion.promotionStartDate, promotion.promotionEndDate),
        viewCount: promotion.viewCount || 0,
        content: promotion.content || '',
        createdAt: promotion.createdAt || new Date().toISOString(),
        updatedAt: promotion.updatedAt || new Date().toISOString()
      }));

      return NextResponse.json({
        success: true,
        data: events,
        message: '이벤트 목록을 조회했습니다.'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: data.message || '이벤트 목록 조회에 실패했습니다.'
      }, { status: response.status });
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, message: '이벤트 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// Helper function to determine promotion status
function getPromotionStatus(startDate: string, endDate: string): 'ongoing' | 'upcoming' | 'ended' {
  if (!startDate || !endDate) return 'ongoing';
  
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (now < start) return 'upcoming';
  if (now > end) return 'ended';
  return 'ongoing';
}

// POST create new event/promotion (admin only)
export async function POST(request: NextRequest) {
  const authError = await requireAuth('admin')(request);
  if (authError) return authError;

  try {
    const { title, content, periodStart, periodEnd } = await request.json();
    
    if (!title || !content || !periodStart || !periodEnd) {
      return NextResponse.json(
        { success: false, message: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const authHeader = request.headers.get('authorization');
    
    const response = await fetch(`${BACKEND_URL}/admin/promotions`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        content,
        promotionStartDate: periodStart,
        promotionEndDate: periodEnd
      })
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      return NextResponse.json({
        success: true,
        message: '이벤트가 생성되었습니다.',
        data: {
          id: data.data.id,
          title: data.data.title,
          periodStart: data.data.promotionStartDate,
          periodEnd: data.data.promotionEndDate,
          content: data.data.content,
          createdAt: data.data.createdAt
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        message: data.message || '이벤트 생성에 실패했습니다.'
      }, { status: response.status });
    }
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, message: '이벤트 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}