'use client';
import { JSX, useState } from 'react';
import { OrdersData } from './ordersData';

interface Dish {
	dishId: number;
	dishName: string;
	quantity: number;
}

interface Order {
	id: number;
	dishes: Dish[];
	createdAt: Date;
	updatedAt: Date;
	tableId: number;
	notes: string;
}

export function OrdersPage(): JSX.Element {
	const [orders, setOrders] = useState<Order[]>(OrdersData);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [newOrder, setNewOrder] = useState<Omit<Order, 'id' | 'createdAt' | 'updatedAt'>>({
		dishes: [],
		tableId: 1,
		notes: '',
	});
	const [newDish, setNewDish] = useState<Dish>({
		dishId: 1,
		dishName: '',
		quantity: 1,
	});

	// Funkcja do obsługi otwierania/zamykania modala
	const toggleModal = (): void => {
		setIsModalOpen((prev: boolean) => !prev);

		// Resetuj stan newOrder i newDish, gdy modal jest otwierany
		if (!isModalOpen) {
			setNewOrder({
				dishes: [],
				tableId: 1,
				notes: '',
			});
			setNewDish({
				dishId: 1,
				dishName: '',
				quantity: 1,
			});
		}
	};

	// Funkcja do obsługi dodawania nowego zamówienia
	const handleAddOrder = (): void => {
		const orderToAdd: Order = {
			id: orders.length + 1,
			...newOrder,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		setOrders((prevOrders: Order[]) => [...prevOrders, orderToAdd]);
		toggleModal(); // Zamknij modal po dodaniu zamówienia
	};

	// Funkcja do obsługi dodawania dania do zamówienia
	const handleAddDish = (): void => {
		setNewOrder((prevOrder: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => ({
			...prevOrder,
			dishes: [...prevOrder.dishes, newDish],
		}));
		// Resetuj dane nowego dania
		setNewDish({
			dishId: 1,
			dishName: '',
			quantity: 1,
		});
	};

	// Funkcja do obsługi zmian w formularzu dania
	const handleDishInputChange = (
		e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setNewDish((prev: Dish) => ({
			...prev,
			[name]:
				name === 'quantity' || name === 'dishId'
					? parseInt(value) : value,
		}));
	};

	// Funkcja do obsługi zmian w formularzu zamówienia
	const handleOrderInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void => {
		const { name, value } = e.target;
		setNewOrder((prev: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => ({
			...prev,
			[name]: name === 'tableId' ? parseInt(value) : value,
		}));
	};

	return (
		<div className='p-4'>
			{/* Przyciski na górze strony */}
			<div className='mb-4 flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Orders</h1>
				<button
					onClick={toggleModal}
					className='flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='currentColor'
						className='h-5 w-5'
					>
						<path d='M12 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6V5a1 1 0 011-1z' />
					</svg>
					Add Order
				</button>
			</div>

			{/* Lista zamówień */}
			<div className='space-y-4'>
				{orders.map((order: Order) => (
					<div
						key={order.id}
						className='rounded-lg bg-white p-4 shadow-md'
					>
						<h3 className='text-lg font-semibold'>{`TABLE: ${order.tableId}, ORDER ID: ${order.id}`}</h3>
						<ul className='text-sm text-gray-600'>
							{order.dishes.map((dish: Dish, index: number) => (
								<li
									key={index}
								>{`Dish: ${dish.dishName}, Quantity: ${dish.quantity}`}</li>
							))}
						</ul>
						<p className='text-sm text-gray-600'>{`Notes: ${order.notes}`}</p>
						<p className='text-sm text-gray-600'>{`Date: ${order.createdAt.toLocaleString()}`}</p>
					</div>
				))}
			</div>

			{/* Modal do dodawania zamówienia */}
			{isModalOpen && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
					<div className='w-96 rounded bg-white p-6 shadow-lg'>
						<h2 className='mb-4 text-xl font-bold'>
							Add New Order
						</h2>
						<div className='space-y-4'>
							<div>
								<label className='block text-sm font-medium'>
									Table
								</label>
								<input
									type='number'
									name='tableId'
									value={newOrder.tableId}
									onChange={handleOrderInputChange}
									className='w-full rounded border px-2 py-1'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium'>
									Notes
								</label>
								<textarea
									name='notes'
									value={newOrder.notes}
									onChange={handleOrderInputChange}
									className='w-full rounded border px-2 py-1'
								/>
							</div>
							<hr className='my-4' />
							<h3 className='text-lg font-semibold'>Add Dish</h3>
							<div>
								<label className='block text-sm font-medium'>
									Dish ID
								</label>
								<input
									type='number'
									name='dishId'
									value={newDish.dishId}
									onChange={handleDishInputChange}
									className='w-full rounded border px-2 py-1'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium'>
									Dish Name
								</label>
								<input
									type='text'
									name='dishName'
									value={newDish.dishName}
									onChange={handleDishInputChange}
									className='w-full rounded border px-2 py-1'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium'>
									Quantity
								</label>
								<input
									type='number'
									name='quantity'
									value={newDish.quantity}
									onChange={handleDishInputChange}
									className='w-full rounded border px-2 py-1'
								/>
							</div>
							<button
								onClick={handleAddDish}
								className='mt-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
							>
								Add Dish
							</button>
						</div>
						{/* Wyświetlanie listy dań */}
						<ul className='mt-4'>
							{newOrder.dishes.map((dish: Dish, index: number) => (
								<li
									key={index}
									className='text-sm text-gray-600'
								>
									{`Dish: ${dish.dishName}, Quantity: ${dish.quantity}`}
								</li>
							)
							)}
						</ul>
						<div className='mt-4 flex justify-end'>
							<button
								onClick={toggleModal}
								className='mr-2 rounded bg-gray-300 px-4 py-2 hover:bg-gray-400'
							>
								Cancel
							</button>
							<button
								onClick={handleAddOrder}
								className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
							>
								Add Order
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

// Eksport komponentu
export default OrdersPage;
