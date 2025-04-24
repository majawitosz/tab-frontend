'use client';
import { JSX, useState } from 'react';
import Image from 'next/image';

interface TileProps {
	name: string;
	desc?: string;
	pic?: string;
	allergens?: string[];
	price: number;
	category: string;
}

export function Tile({
	name,
	desc,
	pic,
	allergens,
	price,
	category,
}: TileProps): JSX.Element {
	const [isOpen, setIsOpen] = useState(false);
	const [imageError, setImageError] = useState(false);

	// Toggle dropdown visibility
	const toggleDropdown: () => void = (): void => {
		setIsOpen((prev: boolean) => !prev);
	};

	// Handle image loading error
	const handleImageError: () => void = () => {
		setImageError(true); // Set image error state if image fails
	};

	return (
		<div className='space-y-4 rounded-2xl bg-white p-4 shadow-lg transition hover:shadow-xl'>
			<div
				onClick={toggleDropdown}
				className='flex cursor-pointer items-center gap-4'
			>
				<div className='relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-100'>
					{pic && !imageError ? (
						<Image
							src={pic}
							alt={name}
							width={48}
							height={48}
							className='object-cover'
							onError={handleImageError} // Handle image loading error
						/>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 512 512'
							className='h-full w-full text-gray-400'
						>
							<path d='M0 192c0-35.3 28.7-64 64-64c.5 0 1.1 0 1.6 0C73 91.5 105.3 64 144 64c15 0 29 4.1 40.9 11.2C198.2 49.6 225.1 32 256 32s57.8 17.6 71.1 43.2C339 68.1 353 64 368 64c38.7 0 71 27.5 78.4 64c.5 0 1.1 0 1.6 0c35.3 0 64 28.7 64 64c0 11.7-3.1 22.6-8.6 32L8.6 224C3.1 214.6 0 203.7 0 192zm0 91.4C0 268.3 12.3 256 27.4 256l457.1 0c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28l-231.5 0c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4z' />
						</svg>
					)}
				</div>
				<div className='flex-1'>
					<h3 className='text-lg font-semibold text-gray-800'>
						{name}{' '}
						<span className='text-sm text-gray-500'>
							(${price.toFixed(2)})
						</span>
					</h3>
					<p className='text-xs text-gray-500'>{category}</p>
				</div>
			</div>

			{isOpen && (
				<div className='space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4'>
					{desc && <p className='text-sm text-gray-600'>{desc}</p>}

					{/* Display allergens if available */}
					{allergens && allergens.length > 0 && (
						<div className='rounded-md border border-red-200 bg-red-50 p-3'>
							<div className='mb-2 flex items-center gap-2'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 512 512'
									className='h-5 w-5 text-red-600'
								>
									<path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z' />
								</svg>
								<span className='text-sm font-semibold text-red-700'>
									Allergens:
								</span>
							</div>
							<ul className='list-disc pl-5 text-sm text-red-600'>
								{allergens.map((a: string, i: number) => (
									<li key={i}>{a}</li>
								))}
							</ul>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
