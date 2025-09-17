import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080/api/v1';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, password } = body;

    if (!userId || !password) {
      return NextResponse.json(
        { success: false, message: '아이디와 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 백엔드 로그인 API 호출
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, password })
    });

    const data = await response.json();

    if (response.ok && data.statusCode === 200) {
      // 관리자 계정인지 확인 (임시로 admin 아이디 체크)
      if (userId !== 'admin') {
        return NextResponse.json(
          { success: false, message: '관리자 권한이 필요합니다.' },
          { status: 403 }
        );
      }

      return NextResponse.json({
        success: true,
        message: '관리자 로그인에 성공했습니다.',
        data: {
          accessToken: data.data.accessToken,
          tokenType: data.data.tokenType,
          user: {
            id: data.data.id,
            userId: data.data.userId,
            username: data.data.username,
            email: data.data.email,
            phone: data.data.phone,
            role: data.data.role
          }
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        message: data.message || '로그인에 실패했습니다.'
      }, { status: response.status });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { success: false, message: '관리자 로그인 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}