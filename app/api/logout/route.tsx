import { NextResponse } from 'next/server';

export async function POST(): Promise<NextResponse> {
	const res: NextResponse = NextResponse.json(
		{ message: 'Logged out successfully' },
		{ status: 200 }
	);
	res.cookies.set('accessToken', '', {
		httpOnly: true,
		path: '/',
		maxAge: 0,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
	});
	return res;
}
