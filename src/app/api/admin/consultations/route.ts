import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080/api/v1';

// GET all consultations (admin only)
export async function GET(request: NextRequest) {
  // Require admin access
  const authError = await requireAuth('admin')(request);
  if (authError) return authError;

  try {
    const authHeader = request.headers.get('authorization');
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let backendUrl = `${BACKEND_URL}/admin/consultations`;
    
    // 상태별 필터링
    if (status && status !== 'all') {
      // 백엔드 상태 값으로 변환 (3-status system)
      const statusMap: { [key: string]: string } = {
        'REQUESTED': 'REQUESTED',
        'CONFIRMED': 'CONFIRMED',
        'CANCELLED': 'CANCELLED'
      };
      const backendStatus = statusMap[status];
      if (backendStatus) {
        backendUrl += `/status/${backendStatus}`;
      }
    }
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Authorization': authHeader || '',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      // 백엔드 데이터를 프론트엔드 형식으로 변환
      const consultations = (data.data || []).map((consultation: any) => ({
        id: consultation.id,
        name: consultation.name || '이름 없음', // User entity에서 가져오는 정보
        phone: consultation.consultantPhone || '',
        email: consultation.email || '', // User entity에서 가져오는 정보
        procedures: consultation.interestedProcedures?.map((p: any) => p.name || p.toString()) || [],
        message: consultation.notes || '',
        preferredDate: consultation.requestedDate || '',
        preferredTime: consultation.requestedTime || '',
        status: consultation.status || 'REQUESTED',
        createdAt: consultation.createdAt || new Date().toISOString(),
        updatedAt: consultation.updatedAt || new Date().toISOString(),
        adminComment: consultation.adminMemo || '',
        isRegistered: consultation.userId ? true : false,
        isEventConsultation: false, // 임시값
        eventId: null,
        eventTitle: null
      }));

      return NextResponse.json({
        success: true,
        data: consultations,
        message: '상담 목록을 조회했습니다.'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: data.message || '상담 목록 조회에 실패했습니다.'
      }, { status: response.status });
    }
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return NextResponse.json(
      { success: false, message: '상담 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// UPDATE consultation status (admin only)
export async function PATCH(request: NextRequest) {
  // Require admin access
  const authError = await requireAuth('admin')(request);
  if (authError) return authError;

  try {
    const { consultationId, status } = await request.json();
    
    if (!consultationId || !status) {
      return NextResponse.json(
        { success: false, message: '상담 ID와 상태가 필요합니다.' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['REQUESTED', 'CONFIRMED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 상태입니다.' },
        { status: 400 }
      );
    }

    // In production, update in database
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: `상담 #${consultationId}의 상태가 ${status}로 변경되었습니다.`,
      data: {
        consultationId,
        status,
        updatedAt: new Date().toISOString(),
        updatedBy: (request as any).user.name
      }
    });
  } catch (error) {
    console.error('Error updating consultation:', error);
    return NextResponse.json(
      { success: false, message: '상담 상태 업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE consultation (admin only)
export async function DELETE(request: NextRequest) {
  // Require admin access
  const authError = await requireAuth('admin')(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const consultationId = searchParams.get('id');
    
    if (!consultationId) {
      return NextResponse.json(
        { success: false, message: '상담 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // In production, delete from database
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: `상담 #${consultationId}가 삭제되었습니다.`,
      deletedAt: new Date().toISOString(),
      deletedBy: (request as any).user.name
    });
  } catch (error) {
    console.error('Error deleting consultation:', error);
    return NextResponse.json(
      { success: false, message: '상담 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}