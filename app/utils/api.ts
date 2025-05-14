/** @format */

import {
	User,
	LoginUser,
	RegisterResponse,
	LoginResponse,
	ErrorResponse,
	HeadersInit,
} from '@/app/types/loginRegister';
import { Dish, OrdersDataResponse } from '@/app/types/order';
import { NextResponse } from 'next/server';
import { OrdersData } from '@/app/types/order';

const API_URL: string = 'https://Tab.garbatamalpa.com/api';
//const API_URL: string = 'http://localhost:8000/api';

export async function registerUser(user: User): Promise<RegisterResponse> {
	const response: Response = await fetch(`${API_URL}/users/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	});

	if (!response.ok) {
		const errorData: ErrorResponse = await response.json();
		throw new Error(errorData.detail || 'Failed to register user');
	}

	return response.json();
}

export async function loginUser(user: LoginUser): Promise<LoginResponse> {
	const response: Response = await fetch(`${API_URL}/users/token/pair`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	});

	if (!response.ok) {
		const errorData: ErrorResponse = await response.json();
		throw new Error(errorData.detail || 'Invalid credentials');
	}

	const data: LoginResponse = await response.json();
	// Set the token in cookies
	const res: NextResponse<LoginResponse> = NextResponse.json(data);
	res.cookies.set('accessToken', data.access, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 30, // 1 hour expiration 3600
		path: '/',
	});

	return data;
}

export async function fetchDishesFromMenu(): Promise<Dish[]> {
	const response: Response = await fetch(`${API_URL}/dania/dania`, {
		cache: 'no-store',
	});

	if (!response.ok) {
		const errorData: ErrorResponse = await response.json();
		throw new Error(errorData.detail || 'Failed to fetch dishes');
	}

	return response.json();
}

export async function fetchDishesFromOrder(
	accessToken?: string
): Promise<OrdersDataResponse[]> {
	const headers: HeadersInit = {};
	if (accessToken) {
		headers['Authorization'] = `Bearer ${accessToken}`;
	}

	const response: Response = await fetch(`${API_URL}/dania/orders`, {
		cache: 'no-store',
		headers,
	});

	if (!response.ok) {
		const errorData: ErrorResponse = await response.json();
		throw new Error(errorData.detail || 'Failed to fetch dishes');
	}

	return response.json();
}

export async function submitOrder(
	order: OrdersData,
	accessToken?: string
): Promise<void> {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};

	if (accessToken) {
		headers['Authorization'] = `Bearer ${accessToken}`;
	}

	const response: Response = await fetch(`${API_URL}/dania/orders`, {
		method: 'POST',
		headers,
		body: JSON.stringify(order),
	});
	if (!response.ok) {
		const errorData: ErrorResponse = await response.json();
		throw new Error(errorData.detail || 'Failed to submit order');
	}
}


export async function createDishApi(
	dish: Dish,
	accessToken?: string
): Promise<void> {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};
	if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
	const response: Response = await fetch(`${API_URL}/dania/dania`, {
		method: 'POST',
		headers,
		body: JSON.stringify(dish),
	});
	if (!response.ok) {
		const errorData: ErrorResponse = await response.json();
		throw new Error(errorData.detail || 'Failed to submit dish');
	}
}


export async function completeOrder(
	orderId: number,
	accessToken?: string
): Promise<void> {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};

	if (accessToken) {
		headers['Authorization'] = `Bearer ${accessToken}`;
	}

	const response: Response = await fetch(
		`${API_URL}/dania/orders/${orderId}/status`,
		{
			method: 'PATCH',
			headers,
			body: JSON.stringify({ status: 'Completed' }), // Send status in the body
		}
	);

	if (!response.ok) {
		const errorData: ErrorResponse = await response.json();
		throw new Error(errorData.detail || 'Failed to complete order');
	}
}