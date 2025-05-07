/** @format */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
	username: string | null;
	setUsername: (username: string) => void;
}

const UserContext: React.Context<UserContextType | undefined> = createContext<
	UserContextType | undefined
>(undefined);

export function UserProvider({
	children,
}: {
	children: React.ReactNode;
}): React.ReactElement {
	const [username, setUsernameState] = useState<string | null>(() => {
		// Initialize from localStorage if available
		if (typeof window !== 'undefined') {
			return localStorage.getItem('username') || null;
		}
		return null;
	});

	const setUsername: (username: string) => void = (
		username: string
	): void => {
		setUsernameState(username);
		if (typeof window !== 'undefined') {
			localStorage.setItem('username', username);
		}
	};

	// Clear username from localStorage on logout (optional, if needed)
	useEffect(() => {
		const handleLogout: () => void = (): void => {
			setUsernameState(null);
			localStorage.removeItem('username');
		};

		// You can listen for logout events or use a global state if needed
		window.addEventListener('logout', handleLogout);
		return (): void => window.removeEventListener('logout', handleLogout);
	}, []);

	return (
		<UserContext.Provider value={{ username, setUsername }}>
			{children}
		</UserContext.Provider>
	);
}

export function useUser(): UserContextType {
	const context: UserContextType | undefined = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}
