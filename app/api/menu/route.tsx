import { NextRequest, NextResponse } from 'next/server';
import { createDishApi } from '@/app/utils/api';
import { Dish } from '@/app/types/order';
import { getAccessToken } from '@/app/utils/auth';

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const dish: Dish = await request.json();

		const accessToken: string | undefined = await getAccessToken();
		if (!accessToken) {
			return NextResponse.json(
				{ detail: 'Unauthorized' },
				{ status: 401 }
			);
		}

		await createDishApi(dish, accessToken);

		return NextResponse.json(
			{ message: 'Dish created successfully' },
			{ status: 200 }
		);
	} catch (err: unknown) {
		return NextResponse.json(
			{
				detail:
					err instanceof Error
						? err.message
						: 'Failed to create dish',
			},
			{ status: 400 }
		);
	}
}
