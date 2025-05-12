/** @format */
import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/app/utils/api';
import { LoginUser, LoginResponse } from '@/app/types/loginRegister';
import { setAccessToken } from '@/app/utils/auth';

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

		await setAccessToken(response.access);

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
