import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// 시간 문자열을 LocalTime으로 변환하는 함수
function convertTimeToLocalTime(timeString: string): string {
  switch (timeString) {
    case 'morning':
      return '10:00:00';
    case 'afternoon':
      return '14:00:00';
    case 'evening':
      return '17:00:00';
    default:
      return '10:00:00';
  }
}

// 시술명을 ProcedureCategory enum으로 매핑하는 함수
function mapProcedureToCategory(procedureName: string): string {
  const procedureMap: { [key: string]: string } = {
    '실로스 실리프팅': 'SILOS_THREAD_LIFTING',
    '실로스 파워 실리프팅': 'SILOS_POWER_THREAD_LIFTING',
    '코리프팅': 'NOSE_LIFTING',
    '턱라인 리프팅': 'JAW_LINE_LIFTING',
    '이마 리프팅': 'FOREHEAD_LIFTING',
    '불독살 리프팅': 'BULLDOG_LIFTING',
    '팔자주름 리프팅': 'NASOLABIAL_LIFTING',
    '페이스 리프팅': 'FACE_LIFTING',
    '이마눈썹 리프팅': 'FOREHEAD_EYEBROW_LIFTING',
    '목 리프팅': 'NECK_LIFTING',
    '실로스 상안검': 'SILOS_UPPER_EYELID',
    '실로스 듀얼 상안검': 'SILOS_DUAL_UPPER_EYELID',
    '실로스 눈썹하 절개': 'SILOS_UNDER_EYEBROW_INCISION',
    '실로스 하안검': 'SILOS_LOWER_EYELID',
    '눈밑지방 레이저': 'UNDER_EYE_FAT_LASER',
    '다크서클 레이저': 'DARK_CIRCLE_LASER',
    '울쎄라': 'ULTHERA',
    '온다': 'ONDA',
    '울타이트': 'ULTIGHT',
    '브이로': 'VERO',
    '슈링크': 'SHRINK',
    '덴서티': 'DENSITY',
    '엔코어': 'ENCORE',
    'LDM': 'LDM',
    '실로팻': 'SILOS_FAT',
    '콜라채움': 'COLA_FILL',
    '리쥬란': 'REJURAN',
    '올리디아': 'OLIDIA',
    '쥬베룩': 'JUVELOOK',
    '래디어스': 'RADIESSE',
    '볼라썸': 'VOLLASOME',
    '물광주사': 'SKIN_BOOSTER'
  };
  
  return procedureMap[procedureName] || 'SILOS_THREAD_LIFTING';
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔵 API Route: POST /api/consultations started');
    const data = await request.json();
    console.log('🔵 API Route: Received consultation request:', data);

    // JWT 토큰 가져오기 (선택적 - 비회원도 상담 신청 가능)
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value;
    
    console.log('🔵 API Route: Token from cookies:', token ? `${token.substring(0, 20)}...` : 'No token');
    console.log('🔵 API Route: All cookies:', cookieStore.getAll().map(c => c.name));
    
    const isAuthenticated = !!token;
    console.log('🔵 API Route: User authenticated:', isAuthenticated);
    console.log('🔵 API Route: Backend URL:', BACKEND_BASE_URL);

    // 프론트엔드 데이터를 백엔드 형식으로 변환
    const backendData = {
      consultationType: 'ONLINE', // 기본값으로 온라인 상담 설정
      requestedDate: data.preferredDate,
      requestedTime: convertTimeToLocalTime(data.preferredTime),
      notes: data.message || '',
      phone: data.personalInfo?.phone || '',
      interestedProcedures: data.selectedProcedures?.map((name: string) => mapProcedureToCategory(name)) || [],
      // 비회원 정보 추가
      ...(!isAuthenticated && {
        name: data.personalInfo?.name || '',
        email: data.personalInfo?.email || '',
        password: data.password || '',
        isGuestConsultation: true
      })
    };

    console.log('🔵 API Route: Sending to backend:', backendData);
    console.log('🔵 API Route: Authorization header:', token ? `Bearer ${token.substring(0, 20)}...` : 'No Authorization header');

    // 백엔드 API 호출
    console.log('🔵 API Route: Making fetch request to backend...');
    const headers: any = {
      'Content-Type': 'application/json'
    };
    
    // 인증된 사용자인 경우에만 Authorization 헤더 추가
    if (isAuthenticated) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${BACKEND_BASE_URL}/consultations`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(backendData),
    });

    console.log('🔵 API Route: Backend response status:', response.status);
    console.log('🔵 API Route: Backend response ok:', response.ok);

    if (response.status === 401) {
      console.log('🔴 API Route: Backend returned 401 - Token validation failed at backend');
    }

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
      console.log('🟢 API Route: Success, returning positive response');
      return NextResponse.json({
        success: true,
        message: result.message || '상담 신청이 성공적으로 등록되었습니다.',
        data: result.data
      });
    } else {
      console.log('🔴 API Route: Error, returning error response with status:', response.status);
      return NextResponse.json({
        success: false,
        message: result.message || '상담 신청 처리 중 오류가 발생했습니다.'
      }, { status: response.status });
    }
  } catch (error) {
    console.error('🔴 API Route: Exception in POST handler:', error);
    return NextResponse.json(
      { success: false, message: '상담 신청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // JWT 토큰 가져오기 (선택적)
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value;
    
    console.log('Token from cookies:', token ? `${token.substring(0, 20)}...` : 'No token');
    
    // 토큰이 없어도 일단 백엔드 요청을 시도 (공개 리스트 조회)
    const headers: any = {
      'Content-Type': 'application/json'
    };
    
    // 토큰이 있으면 헤더에 추가
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('Adding Authorization header with token');
    } else {
      console.log('No token found, making public request');
    }

    // 백엔드 API 호출
    const response = await fetch(`${BACKEND_BASE_URL}/consultations`, {
      method: 'GET',
      headers: headers,
    });

    console.log('Backend response status:', response.status);
    console.log('Backend response headers:', response.headers);
    
    // 응답이 비어있거나 JSON이 아닌 경우 처리
    let result;
    try {
      const responseText = await response.text();
      console.log('Backend raw response text:', responseText);
      
      if (!responseText.trim()) {
        console.log('Empty response from backend');
        result = { success: false, message: '백엔드에서 빈 응답을 받았습니다.', data: [] };
      } else {
        result = JSON.parse(responseText);
        console.log('Backend consultation list response:', result);
      }
    } catch (parseError) {
      console.error('Failed to parse backend response:', parseError);
      result = { success: false, message: '백엔드 응답을 해석할 수 없습니다.', data: [] };
    }

    // 백엔드 응답을 프론트엔드 형식으로 변환하여 반환
    if (response.ok && (result.success || result.statusCode < 300)) {
      return NextResponse.json({
        success: true,
        data: result.data || []
      });
    } else {
      return NextResponse.json({
        success: false,
        message: result.message || '상담 요청 조회 중 오류가 발생했습니다.'
      }, { status: response.status });
    }
  } catch (error) {
    console.error('상담 요청 조회 중 오류:', error);
    return NextResponse.json(
      { success: false, message: '상담 요청 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}