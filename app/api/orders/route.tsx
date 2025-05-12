import { NextRequest, NextResponse } from 'next/server';
import { submitOrder } from '@/app/utils/api';
import { OrdersData } from '@/app/types/order';
import { getAccessToken } from '@/app/utils/auth';

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const order: OrdersData = await request.json();

		// Get the access token from cookies
		const accessToken: string | undefined = await getAccessToken();

		if (!accessToken) {
			return NextResponse.json(
				{ detail: 'Unauthorized: No access token found' },
				{ status: 401 }
			);
		}

		// Submit the order with the token
		await submitOrder(order, accessToken);

		return NextResponse.json(
			{ message: 'Order submitted successfully' },
			{ status: 200 }
		);
	} catch (err: unknown) {
		return NextResponse.json(
			{
				detail:
					err instanceof Error
						? err.message
						: 'Failed to submit order',
			},
			{ status: 400 }
		);
	}
}
