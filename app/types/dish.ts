export type Allergen = {
	id: number;
	name: string;
	description: string;
};

export type Dish = {
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

export interface DishesType {
	dishId: number;
	dishName: string;
	quantity: number;
}
