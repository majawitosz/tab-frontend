import { NextResponse } from 'next/server';
import { getAccessToken } from '@/app/utils/auth';
import { OrdersDataResponse } from '@/app/types/order';
const API_URL: string = 'https://Tab.garbatamalpa.com/api';

export async function PATCH(request: Request): Promise<NextResponse> {
	try {
		const { orderId } = await request.json();

		// Get the access token from cookies (HttpOnly cookie)
		const accessToken: string | undefined = await getAccessToken();

		if (!accessToken) {
			return NextResponse.json(
				{ detail: 'Unauthorized: No access token found' },
				{ status: 401 }
			);
		}

		// Call the correct Django endpoint (using the "dania" namespace)
		const backendResponse: Response = await fetch(
			`${API_URL}/dania/orders/${orderId}/status`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({ status: 'Completed' }),
			}
		);

		if (!backendResponse.ok) {
			const errorData: { detail?: string } = await backendResponse.json();
			return NextResponse.json(
				{ detail: errorData.detail || 'Failed to update order status' },
				{ status: backendResponse.status }
			);
		}

		// Return the updated order received from the backend
		const updatedOrder: OrdersDataResponse = await backendResponse.json();
		return NextResponse.json(updatedOrder, { status: 200 });
	} catch (err: unknown) {
		return NextResponse.json(
			{
				detail:
					err instanceof Error
						? err.message
						: 'Failed to archive order',
			},
			{ status: 400 }
		);
	}
}
