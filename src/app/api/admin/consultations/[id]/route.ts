import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080/api/v1';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET individual consultation (admin only)
export async function GET(request: NextRequest, { params }: RouteParams) {
  const authError = await requireAuth('admin')(request);
  if (authError) return authError;

  try {
    const authHeader = request.headers.get('authorization');
    
    const response = await fetch(`${BACKEND_URL}/admin/consultations/${params.id}`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader || '',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      // Backend 데이터를 frontend 형식으로 변환
      const consultation = {
        id: data.data.id,
        name: data.data.name || '이름 없음', // User entity에서 가져오는 정보
        phone: data.data.consultantPhone || '',
        email: data.data.email || '', // User entity에서 가져오는 정보
        procedures: data.data.interestedProcedures?.map((p: any) => p.name || p.toString()) || [],
        message: data.data.notes || '',
        preferredDate: data.data.requestedDate || '',
        preferredTime: data.data.requestedTime || '',
        status: data.data.status?.toLowerCase() || 'waiting',
        createdAt: data.data.createdAt || new Date().toISOString(),
        updatedAt: data.data.updatedAt || new Date().toISOString(),
        adminComment: data.data.adminMemo || '',
        isRegistered: data.data.userId ? true : false,
        needsFollowUp: false
      };

      return NextResponse.json({
        success: true,
        data: consultation,
        message: '상담 상세 정보를 조회했습니다.'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: data.message || '상담 정보 조회에 실패했습니다.'
      }, { status: response.status });
    }
  } catch (error) {
    console.error('Error fetching consultation:', error);
    return NextResponse.json(
      { success: false, message: '상담 정보 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// PUT update consultation (admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const authError = await requireAuth('admin')(request);
  if (authError) return authError;

  try {
    const { status, adminComment, needsFollowUp } = await request.json();
    
    if (!status) {
      return NextResponse.json(
        { success: false, message: '상태 정보가 필요합니다.' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['waiting', 'completed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 상태입니다.' },
        { status: 400 }
      );
    }

    const authHeader = request.headers.get('authorization');
    
    // Backend 상태값으로 변환
    const backendStatus = status.toUpperCase();
    
    const response = await fetch(`${BACKEND_URL}/admin/consultations/${params.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': authHeader || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: backendStatus,
        adminMemo: adminComment,
        needsFollowUp: needsFollowUp || false
      })
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      return NextResponse.json({
        success: true,
        message: '상담 정보가 업데이트되었습니다.',
        data: {
          id: params.id,
          status,
          adminComment,
          needsFollowUp,
          updatedAt: new Date().toISOString()
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        message: data.message || '상담 정보 업데이트에 실패했습니다.'
      }, { status: response.status });
    }
  } catch (error) {
    console.error('Error updating consultation:', error);
    return NextResponse.json(
      { success: false, message: '상담 정보 업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}