export type Allergen = {
	id: number;
	name: string;
	description: string;
};

export type Dish = {
	id?: number;
	name: string;
	description: string;
	price: number;
	category: string;
	is_available: boolean;
	is_visible: boolean;
	image_url?: string;
	allergens?: Allergen[];
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
	table_number: number;
	status: string;
	created_at: Date;
	total_amount: number;
	notes: string;
	items: Dish[];
}
