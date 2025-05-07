/** @format */
import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/app/utils/api';
import { LoginUser, LoginResponse } from '@/app/types/loginRegister';

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const user: LoginUser = await request.json();
		const response: LoginResponse = await loginUser(user);

		const res: NextResponse = NextResponse.json(
			{
				username: response.username,
				message: 'Logged in successfully',
			},
			{ status: 200 }
		);

		res.cookies.set('accessToken', response.access, {
			httpOnly: true,
			path: '/',
			maxAge: 3600, // 1 hour
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
		});

		return res;
	} catch (err: Error | unknown) {
		return NextResponse.json(
			{
				detail:
					err instanceof Error ? err.message : 'Invalid credentials',
			},
			{ status: 400 }
		);
	}
}
