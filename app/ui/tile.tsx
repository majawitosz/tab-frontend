'use client';
import { JSX, useState } from 'react';
import { DocumentIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface TileProps {
	name: string;
	desc?: string;
	pic?: string;
}

export function Tile({ name, desc, pic }: TileProps): JSX.Element {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown: () => void = (): void => {
		setIsOpen((prev: boolean) => !prev);
	};

	return (
		<div className='space-y-2'>
			<div
				onClick={toggleDropdown}
				className='flex cursor-pointer items-center gap-4 rounded-2xl bg-white p-4 shadow-md'
			>
				{pic ? (
					<Image
						src={pic}
						alt={name}
						className='h-12 w-12 rounded-full'
					/>
				) : (
					<DocumentIcon className='h-12 w-12 text-gray-500' />
				)}
				<h3 className='text-lg font-semibold'>{name}</h3>
			</div>

			{isOpen && (
				<div className='rounded-b-lg-2xl bg-gray-100 p-4 shadow-md'>
					{desc && <p className='text-sm text-gray-600'>{desc}</p>}
				</div>
			)}
		</div>
	);
}
