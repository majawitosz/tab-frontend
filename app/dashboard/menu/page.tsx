/** @format */

import { Tile } from '@/app/ui/tile';
import { DishesData } from '@/app/ui/dishesData';
import { Dish } from '@/app/ui/dishes';

export default function Page(): React.ReactNode {
	return (
		<div className='space-y-4'>
			{DishesData.map((dish: Dish) => (
				<Tile
					key={dish.id}
					name={dish.name}
					desc={dish.desc}
					pic={dish.pic}
				/>
			))}
		</div>
	);
}
