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
	is_available?: boolean;
	is_visible?: boolean;
	image_url?: string | null;
	allergens: Allergen[];
	quantity?: number;
};

export interface OrdersData {
	tableId: number;
	createdAt: Date;
	totalPrice: number;
	notes?: string;
	dishes: Dish[];
}
export interface OrdersDataResponse {
	id: number;
	tableId: number;
	createdAt: Date;
	totalPrice: number;
	notes: string;
	dishes: Dish[];
}
