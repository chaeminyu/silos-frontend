import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByPhone, hashPassword, createSession } from '@/lib/auth/userStore';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password } = await request.json();

    // Validate required fields
    if (!name || !phone || !password) {
      return NextResponse.json(
        { success: false, message: '필수 정보를 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // Check if user already exists (by phone number)
    const existingUser = getUserByPhone(phone);
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: '이미 등록된 연락처입니다.' },
        { status: 409 }
      );
    }

    // Create new user
    const hashedPassword = hashPassword(password);
    
    const newUser = createUser({
      name,
      email: email || '',
      phone,
      password: hashedPassword,
      accessLevel: 'basic'
    });

    // Create session token
    const sessionToken = createSession(newUser.id);
    
    // Return success with user info (excluding password)
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json(
      { 
        success: true, 
        message: '회원가입이 완료되었습니다.',
        user: userWithoutPassword,
        token: sessionToken
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: '회원가입 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}