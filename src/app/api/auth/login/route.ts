import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080/api/v1';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 백엔드로 요청 프록시
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // 백엔드 응답 구조를 프론트엔드가 기대하는 형태로 변환
    // 백엔드는 success 필드 대신 statusCode를 사용
    if (response.ok && data.statusCode && data.statusCode >= 200 && data.statusCode < 300 && data.data) {
      // JWT 토큰을 쿠키로 설정
      const nextResponse = NextResponse.json({
        success: true,
        message: data.message || '로그인이 완료되었습니다.',
        data: data.data // LoginResponseDto
      }, { status: response.status });

      // JWT 토큰을 HttpOnly 쿠키로 설정
      if (data.data.accessToken) {
        nextResponse.cookies.set('authToken', data.data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7일
          path: '/',
        });
      }

      return nextResponse;
    } else {
      return NextResponse.json({
        success: false,
        message: data.message || '로그인에 실패했습니다.'
      }, { status: response.status });
    }
  } catch (error) {
    console.error('Login proxy error:', error);
    return NextResponse.json(
      { success: false, message: '로그인 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}