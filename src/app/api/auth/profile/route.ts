import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080/api/v1';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: '인증 토큰이 필요합니다.' },
        { status: 401 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return NextResponse.json({
        success: true,
        message: data.message,
        data: data.data
      }, { status: response.status });
    } else {
      return NextResponse.json({
        success: false,
        message: data.message || '프로필 조회에 실패했습니다.'
      }, { status: response.status });
    }
  } catch (error) {
    console.error('Profile GET proxy error:', error);
    return NextResponse.json(
      { success: false, message: '프로필 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: '인증 토큰이 필요합니다.' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return NextResponse.json({
        success: true,
        message: data.message,
        data: data.data
      }, { status: response.status });
    } else {
      return NextResponse.json({
        success: false,
        message: data.message || '프로필 업데이트에 실패했습니다.'
      }, { status: response.status });
    }
  } catch (error) {
    console.error('Profile PUT proxy error:', error);
    return NextResponse.json(
      { success: false, message: '프로필 업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: '인증 토큰이 필요합니다.' },
        { status: 401 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/auth/profile`, {
      method: 'DELETE',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return NextResponse.json({
        success: true,
        message: data.message
      }, { status: response.status });
    } else {
      return NextResponse.json({
        success: false,
        message: data.message || '회원 탈퇴에 실패했습니다.'
      }, { status: response.status });
    }
  } catch (error) {
    console.error('Profile DELETE proxy error:', error);
    return NextResponse.json(
      { success: false, message: '회원 탈퇴 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}