import { NextResponse } from 'next/server';

import { deleteAccessToken } from '@/app/utils/auth';

export async function POST(): Promise<NextResponse> {
	const res: NextResponse = NextResponse.json(
		{ message: 'Logged out successfully' },
		{ status: 200 }
	);
	await deleteAccessToken();
	return res;
}
