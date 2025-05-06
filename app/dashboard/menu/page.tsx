/** @format */

import { Tile } from '@/app/ui/tile';
import { JSX } from 'react';
import { Allergen, Dish } from '@/app/types/dish';
import { fetchDishes } from '@/app/utils/api';

export default async function Page(): Promise<JSX.Element> {
	const dishes: Dish[] = await fetchDishes();

	return (
		<div className='space-y-4'>
			{dishes.map((dish: Dish) => (
				<Tile
					key={dish.id}
					name={dish.name}
					price={dish.price}
					category={dish.category}
					desc={dish.description}
					pic={dish.image_url}
					allergens={dish.allergens.map((a: Allergen) => a.name)}
				/>
			))}
		</div>
	);
}
