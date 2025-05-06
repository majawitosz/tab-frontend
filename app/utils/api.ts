/** @format */

import {
	User,
	LoginUser,
	RegisterResponse,
	LoginResponse,
	ErrorResponse,
} from '@/app/types/loginRegister';
import { Dish } from '@/app/types/dish';

const API_URL: string = 'https://Tab.garbatamalpa.com/api';

export async function registerUser(user: User): Promise<RegisterResponse> {
	const response: Response = await fetch(`${API_URL}/register`, {
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
	const response: Response = await fetch(`${API_URL}/token/pair`, {
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

	return response.json();
}

export async function fetchDishes(): Promise<Dish[]> {
	const response: Response = await fetch(`${API_URL}/dania`, {
		cache: 'no-store',
	});

	if (!response.ok) {
		const errorData: ErrorResponse = await response.json();
		throw new Error(errorData.detail || 'Failed to fetch dishes');
	}

	return response.json();
}
