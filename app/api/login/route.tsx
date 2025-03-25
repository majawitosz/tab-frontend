/** @format */

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	return NextResponse.json({ message: 'Hello, World!' }, { status: 200 });
}
