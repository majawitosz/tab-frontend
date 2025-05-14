import { JSX } from 'react';

import MenuTiles from '@/app/ui/menu-tiles';
import MenuForm from '@/app/ui/menu-form';

export default function Page(): JSX.Element {
	return (
		<div className='mx-auto max-w-2xl space-y-6 p-6'>
			<MenuForm />
			<MenuTiles />
		</div>
	);
}
