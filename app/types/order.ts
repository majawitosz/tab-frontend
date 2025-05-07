export type Order = {
	id: number;
	dishId: number;
	dishName: string;
	quantity: number;
	createdAt: Date;
	updatedAt: Date;
	tableId: number;
	pic?: string;
};

export interface DishesType {
	dishId: number;
	dishName: string;
	quantity: number;
}

export interface OrdersDataTypes {
	tableId: number;
	createdAt: Date;
	totalPrice: number;
	notes: string;
	dishes: DishesType[];
}

export const OrdersData: OrdersDataTypes[] = [
	{
		tableId: 2,
		createdAt: new Date(),
		totalPrice: 25.5,
		dishes: [
			{ dishId: 1, dishName: 'Pizza', quantity: 2 },
			{ dishId: 2, dishName: 'Pasta', quantity: 1 },
		],
		notes: '',
	},
];
