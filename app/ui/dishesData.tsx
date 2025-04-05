import { Dish } from './dishes';

export const DishesData: Dish[] = [
	{
		id: 1,
		name: 'zupa',
		desc: 'bardzo smaczna zupa',
		pic: '',
		allergens: [],
	},
	{
		id: 2,
		name: 'gyoza',
		desc: 'bardzo smaczne pierozki',
		pic: '',
		allergens: ['cebula', 'alergen1', 'alergen2'],
	},
	{
		id: 3,
		name: 'miesko',
		desc: 'jeszcze smaczniejsze miesko',
		allergens: [],
	},
];
