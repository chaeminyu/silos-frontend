import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// 시간 문자열을 LocalTime으로 변환하는 함수
function convertTimeToDisplay(timeString: string): string {
  if (timeString.includes('10:00')) return '오전';
  if (timeString.includes('14:00')) return '오후';  
  if (timeString.includes('17:00')) return '저녁';
  return timeString;
}

// 상태 변환 함수
function convertStatusToDisplay(status: string): string {
  switch (status) {
    case 'CONFIRMED':
    case 'COMPLETED':
      return 'confirmed';
    case 'PENDING':
      return 'pending';
    case 'CANCELLED':
      return 'cancelled';
    default:
      return 'pending';
  }
}

// ProcedureCategory enum을 한글로 변환
function mapProcedureCategoryToKorean(category: string): string {
  const procedureMap: { [key: string]: string } = {
    'SILOS_THREAD_LIFTING': '실로스 실리프팅',
    'SILOS_POWER_THREAD_LIFTING': '실로스 파워 실리프팅',
    'NOSE_LIFTING': '코리프팅',
    'JAW_LINE_LIFTING': '턱라인 리프팅',
    'FOREHEAD_LIFTING': '이마 리프팅',
    'BULLDOG_LIFTING': '불독살 리프팅',
    'NASOLABIAL_LIFTING': '팔자주름 리프팅',
    'FACE_LIFTING': '페이스 리프팅',
    'FOREHEAD_EYEBROW_LIFTING': '이마눈썹 리프팅',
    'NECK_LIFTING': '목 리프팅',
    'SILOS_UPPER_EYELID': '실로스 상안검',
    'SILOS_DUAL_UPPER_EYELID': '실로스 듀얼 상안검',
    'SILOS_UNDER_EYEBROW_INCISION': '실로스 눈썹하 절개',
    'SILOS_LOWER_EYELID': '실로스 하안검',
    'UNDER_EYE_FAT_LASER': '눈밑지방 레이저',
    'DARK_CIRCLE_LASER': '다크서클 레이저',
    'ULTHERA': '울쎄라',
    'ONDA': '온다',
    'ULTIGHT': '울타이트',
    'VERO': '브이로',
    'SHRINK': '슈링크',
    'DENSITY': '덴서티',
    'ENCORE': '엔코어',
    'LDM': 'LDM',
    'SILOS_FAT': '실로팻',
    'COLA_FILL': '콜라채움',
    'REJURAN': '리쥬란',
    'OLIDIA': '올리디아',
    'JUVELOOK': '쥬베룩',
    'RADIESSE': '래디어스',
    'VOLLASOME': '볼라썸',
    'SKIN_BOOSTER': '물광주사'
  };
  
  return procedureMap[category] || category;
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔵 API Route: POST /api/consultations/verify started');
    const data = await request.json();
    console.log('🔵 API Route: Received verification request:', { phone: data.phone, hasPassword: !!data.password });

    if (!data.phone || !data.password) {
      return NextResponse.json(
        { success: false, message: '전화번호와 비밀번호를 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    console.log('🔵 API Route: Backend URL:', BACKEND_BASE_URL);

    // 백엔드 API 호출
    console.log('🔵 API Route: Making fetch request to backend for verification...');
    const response = await fetch(`${BACKEND_BASE_URL}/consultations/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: data.phone,
        password: data.password
      }),
    });

    console.log('🔵 API Route: Backend response status:', response.status);
    console.log('🔵 API Route: Backend response ok:', response.ok);

    let result;
    try {
      const responseText = await response.text();
      console.log('🔵 API Route: Backend raw response text:', responseText);
      
      if (!responseText.trim()) {
        console.log('🔴 API Route: Empty response from backend');
        return NextResponse.json(
          { success: false, message: '백엔드에서 빈 응답을 받았습니다.' },
          { status: 500 }
        );
      }
      
      result = JSON.parse(responseText);
      console.log('🔵 API Route: Backend response JSON:', result);
    } catch (parseError) {
      console.error('🔴 API Route: Failed to parse backend response:', parseError);
      return NextResponse.json(
        { success: false, message: '백엔드 응답을 파싱할 수 없습니다.' },
        { status: 500 }
      );
    }

    // 백엔드 응답을 프론트엔드 형식으로 변환하여 반환
    if (response.ok && (result.success || result.statusCode < 300)) {
      console.log('🟢 API Route: Verification success, transforming data');
      
      // 백엔드 데이터를 프론트엔드 형식으로 변환
      const transformedData = result.data?.map((item: any) => ({
        id: item.id,
        userId: item.userId || '',
        userName: item.userName || '비회원',
        date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
        requestedDate: item.requestedDate || '',
        requestedTime: convertTimeToDisplay(item.requestedTime || ''),
        procedures: item.interestedProcedures?.map((proc: string) => mapProcedureCategoryToKorean(proc)) || [],
        message: item.notes || '',
        status: convertStatusToDisplay(item.status || 'PENDING'),
        adminResponse: item.adminResponse || null,
        isPublic: item.isPublic !== false,
        views: item.views || 0,
        interestedProcedures: item.interestedProcedures || [],
        consultationType: item.consultationType || 'ONLINE',
        createdAt: item.createdAt || '',
        notes: item.notes || ''
      })) || [];

      return NextResponse.json({
        success: true,
        message: result.message || '인증이 완료되었습니다.',
        data: transformedData
      });
    } else {
      console.log('🔴 API Route: Verification failed with status:', response.status);
      return NextResponse.json({
        success: false,
        message: result.message || '전화번호와 비밀번호를 확인해주세요.'
      }, { status: response.status });
    }
  } catch (error) {
    console.error('🔴 API Route: Exception in verification handler:', error);
    return NextResponse.json(
      { success: false, message: '인증 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}