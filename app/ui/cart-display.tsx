'use client';

import { JSX, useState } from 'react';
import { useCart } from '@/app/ui/cart';
import { Button } from '@/app/ui/button';
import { OrdersDataTypes, DishesType } from '@/app/types/order';
import { submitOrder } from '../utils/api';

export function CartDisplay(): JSX.Element {
	const { cart, clearCart } = useCart();
	const [notes, setNotes] = useState<string>('');
	const [tableNumber, setTableNumber] = useState<number>(1);

	const totalPrice: number = cart.reduce(
		(sum, item) => sum + item.quantity * item.price,
		0
	);

	const handleCompleteOrder: () => void = async () => {
		if (cart.length === 0) {
			alert('Your cart is empty!');
			return;
		}

		// Mapowanie danych z koszyka na format OrdersDataTypes
		const dishes: DishesType[] = cart.map((item) => ({
			dishId: item.dishId,
			dishName: item.dishName,
			quantity: item.quantity,
		}));

		const order: OrdersDataTypes = {
			tableId: tableNumber,
			totalPrice: totalPrice,
			createdAt: new Date(),
			notes,
			dishes,
		};

		try {
			console.log('Order submitted:', order); // Debugging line
			await submitOrder(order);
			alert('Order completed successfully!');
			clearCart();
			setNotes('');
			setTableNumber(1);
		} catch (error) {
			console.error('Failed to submit order:', error);
			alert('Failed to complete the order. Please try again.');
		}
	};

	return (
		<div className='p-4'>
			<h2 className='text-lg font-bold'>Cart</h2>
			<ul className='space-y-2'>
				{cart.map((item) => (
					<li key={item.dishId} className='flex justify-between'>
						<span>
							{item.dishName} - ${item.price.toFixed(2)}
						</span>
						<span>${item.price.toFixed(2)}</span>
					</li>
				))}
			</ul>

			{/* Total Price */}
			<div className='mt-4 text-right text-lg font-semibold'>
				Total: ${totalPrice.toFixed(2)}
			</div>

			{/* Table Number Selection */}
			<div className='mt-4'>
				<label
					htmlFor='table-number'
					className='block text-sm font-medium text-gray-700'
				>
					Select Table Number:
				</label>
				<select
					id='table-number'
					value={tableNumber}
					onChange={(e) => setTableNumber(Number(e.target.value))}
					className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
				>
					{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
						<option key={num} value={num}>
							Table {num}
						</option>
					))}
				</select>
			</div>

			{/* Notes input */}
			<div className='mt-4'>
				<label
					htmlFor='order-notes'
					className='block text-sm font-medium text-gray-700'
				>
					Notes for the order:
				</label>
				<textarea
					id='order-notes'
					value={notes}
					onChange={(e) => setNotes(e.target.value)}
					className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
					rows={3}
					placeholder='Add any special instructions...'
				/>
			</div>

			{/* Buttons */}
			<div className='mt-4 flex justify-between'>
				<Button
					onClick={clearCart}
					className='bg-red-500 hover:bg-red-600 focus-visible:outline-red-500 active:bg-red-700'
				>
					Clear Cart
				</Button>
				<Button
					onClick={handleCompleteOrder}
					className='bg-green-500 hover:bg-green-600 focus-visible:outline-green-500 active:bg-green-700'
				>
					Complete Order
				</Button>
			</div>
		</div>
	);
}
