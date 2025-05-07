/** @format */

import {
	User,
	LoginUser,
	RegisterResponse,
	LoginResponse,
	ErrorResponse,
} from '@/app/types/loginRegister';
import { Dish } from '@/app/types/dish';
import { NextResponse } from 'next/server';
import { OrdersDataTypes } from '@/app/types/order';

const API_URL: string = 'https://Tab.garbatamalpa.com/api';

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

export async function fetchDishes(): Promise<Dish[]> {
	const response: Response = await fetch(`${API_URL}/dania/dania`, {
		cache: 'no-store',
	});

	if (!response.ok) {
		const errorData: ErrorResponse = await response.json();
		throw new Error(errorData.detail || 'Failed to fetch dishes');
	}

	return response.json();
}

export async function submitOrder(order: OrdersDataTypes): Promise<void> {
	const response: Response = await fetch(`${API_URL}/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(order),
	});

	if (!response.ok) {
		const errorData: ErrorResponse = await response.json();
		throw new Error(errorData.detail || 'Failed to submit order');
	}
}
