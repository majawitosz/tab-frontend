'use client';

import React, { createContext, useContext, useState } from 'react';

interface CartItem {
	dishId: number;
	dishName: string;
	quantity: number;
	price: number;
}

interface CartContextType {
	cart: CartItem[];
	addToCart: (dish: CartItem) => void;
	removeFromCart: (dishId: number) => void;
	clearCart: () => void;
}

const CartContext: React.Context<CartContextType | undefined> = createContext<
	CartContextType | undefined
>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cart, setCart] = useState<CartItem[]>([]);

	const addToCart: (dish: CartItem) => void = (dish) => {
		setCart((prevCart) => {
			const existingItem: CartItem | undefined = prevCart.find(
				(item) => item.dishId === dish.dishId
			);
			if (existingItem) {
				return prevCart.map((item) =>
					item.dishId === dish.dishId
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
			return [...prevCart, { ...dish, quantity: 1 }];
		});
	};

	const removeFromCart: (dishId: number) => void = (dishId) => {
		setCart((prevCart) =>
			prevCart.filter((item) => item.dishId !== dishId)
		);
	};

	const clearCart: () => void = () => {
		setCart([]);
	};

	return (
		<CartContext.Provider
			value={{ cart, addToCart, removeFromCart, clearCart }}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart: () => CartContextType = () => {
	const context: CartContextType | undefined = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
