import { NextRequest, NextResponse } from 'next/server';

// 임시 데이터 저장소 (실제 프로젝트에서는 데이터베이스 사용)
let consultationRequests: any[] = [
  {
    id: 1,
    personalInfo: {
      name: '김○○',
      phone: '010-****-1234',
      email: 'test@example.com'
    },
    selectedProcedures: ['실로스 실리프팅', '울쎄라'],
    message: '안면 리프팅에 대해 상담받고 싶습니다.',
    preferredDate: '2025-08-15',
    preferredTime: 'morning',
    createdAt: '2025-08-10T10:30:00Z',
    status: 'pending'
  },
  {
    id: 2,
    personalInfo: {
      name: '이○○',
      phone: '010-****-5678',
      email: 'test2@example.com'
    },
    selectedProcedures: ['레이저 리프팅', '피부 리프팅'],
    message: '피부 탄력 개선을 위한 시술 상담 원합니다.',
    preferredDate: '2025-08-12',
    preferredTime: 'afternoon',
    createdAt: '2025-08-09T14:20:00Z',
    status: 'completed'
  }
];

let nextId = 3;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 새 상담 요청 생성
    const newConsultation = {
      id: nextId++,
      ...data,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    // 데이터 저장 (실제로는 데이터베이스에 저장)
    consultationRequests.unshift(newConsultation);
    
    return NextResponse.json({ 
      success: true, 
      message: '상담 신청이 성공적으로 등록되었습니다.',
      id: newConsultation.id 
    });
  } catch (error) {
    console.error('상담 신청 처리 중 오류:', error);
    return NextResponse.json(
      { success: false, message: '상담 신청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true, 
      data: consultationRequests 
    });
  } catch (error) {
    console.error('상담 요청 조회 중 오류:', error);
    return NextResponse.json(
      { success: false, message: '상담 요청 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}