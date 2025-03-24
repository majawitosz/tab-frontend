/** @format */

import { log } from 'console';

const API_URL = 'http://127.0.0.1:8000/api'; // This is the URL to your Django Ninja backend

export interface User {
    username: string;
    password: string;
    email?: string;
}

export interface LoginUser {
    username: string;
    password: string;
}

export interface RegisterResponse {
    username: string;
    email: string;
    is_authenticated: boolean;
}

export interface LoginResponse {
    username: string;
    refresh: string;
    access: string;
}

export async function registerUser(user: User): Promise<RegisterResponse> {
    const response = await fetch(API_URL + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user), // Convert the user object to JSON
    });

    if (!response.ok) {
        // Handle errors (e.g., username already exists, email already exists)
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to register user');
    }

    return response.json(); // Parse the response as JSON
}

export async function loginUser(user: LoginUser): Promise<LoginResponse> {
    const response = await fetch(API_URL + '/token/pair', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    //const data = await response.json();
    //console.log(data);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Invalid credentials');
    }

    return response.json(); // Expecting { access, refresh } tokens from Ninja JWT
}

export async function fetchItems(): Promise<User[]> {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch items');
    }
    return response.json();
}
