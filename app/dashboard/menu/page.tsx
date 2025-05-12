/** @format */

import { Tile } from '@/app/ui/tile';
import { JSX } from 'react';
import { Dish } from '@/app/types/order';
import { fetchDishesFromMenu } from '@/app/utils/api';

export default async function Page(): Promise<JSX.Element> {
	let dishes: Dish[] = [];
	let error: string | null = null;

	try {
		dishes = await fetchDishesFromMenu();
	} catch (err) {
		error =
			err instanceof Error ? err.message : 'An unexpected error occurred';
	}

	return (
		<div className='space-y-4'>
			{error ? (
				<div className='p-4 text-center text-red-500'>
					<p>Error: {error}</p>
					<p>Please try again later.</p>
				</div>
			) : dishes.length === 0 ? (
				<div className='p-4 text-center text-gray-500'>
					<p>No dishes available at the moment.</p>
				</div>
			) : (
				dishes.map((dish: Dish) => (
					<Tile
						key={dish.id}
						dish={dish} // Pass the entire Dish object
					/>
				))
			)}
		</div>
	);
}
