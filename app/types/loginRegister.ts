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
export interface ErrorResponse {
	detail: string;
}
