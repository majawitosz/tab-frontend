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
