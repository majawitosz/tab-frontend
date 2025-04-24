/** @format */

import { Tile } from '@/app/ui/tile';
import { JSX } from 'react';

type Allergen = {
	id: number;
	name: string;
	description: string;
};

type Dish = {
	id: number;
	name: string;
	description: string;
	price: number;
	category: string;
	is_available: boolean;
	is_visible: boolean;
	image_url: string;
	allergens: Allergen[];
};

export default async function Page(): Promise<JSX.Element> {
	const res: Response = await fetch('http://localhost:8000/api/dania', {
		cache: 'no-store',
	});
	const dishes: Dish[] = await res.json();

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
