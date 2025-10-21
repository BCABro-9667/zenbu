import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByEmail, generateToken } from '@/lib/mongodb-services';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, phone, address } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    const user = await createUser({
      email,
      password,
      name,
      phone,
      address,
      isAdmin: false,
    });

    const token = await generateToken(user);

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
