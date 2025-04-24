export interface DishesType {
	dishId: number;
	dishName: string;
	quantity: number;
}

export interface OrdersDataTypes {
	id: number;
	tableId: number;
	createdAt: Date;
	updatedAt: Date;
	notes: string;
	dishes: DishesType[];
}

export const OrdersData: OrdersDataTypes[] = [
	{
		id: 1,
		tableId: 2,
		createdAt: new Date(),
		updatedAt: new Date(),
		dishes: [
			{ dishId: 1, dishName: 'Pizza', quantity: 2 },
			{ dishId: 2, dishName: 'Pasta', quantity: 1 },
		],
		notes: '',
	},
];
