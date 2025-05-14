'use client';
import { useState, JSX, ChangeEvent } from 'react';
import { Dish } from '@/app/types/order';
import { ErrorResponse } from '@/app/types/loginRegister';
import Image from 'next/image';
import imageIcon from '@/app/images/image-icon.svg';

export default function MenuForm(): JSX.Element {
	const [showForm, setShowForm] = useState(false);

	const [formData, setFormData] = useState({
		name: '',
		category: '',
		price: '',
		description: '',
		allergens: '',
	});

	const handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void = () =>
		//e: ChangeEvent<HTMLInputElement>
		{
			//const file: File | undefined = e.target.files?.[0];
			//if (file) setSelectedFile(file);
		};

	const handleChange: (
		e: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => void = (
		e: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit: () => Promise<void> = async () => {
		try {
			const dish: Dish = {
				name: formData.name,
				category: formData.category,
				price: parseFloat(formData.price),
				description: formData.description,
				//image_url: selectedImage,
				// allergens: formData.allergens.split(',').map((name) => ({
				// 	id: 0,
				// 	name: name.trim(),
				// 	description: '',
				// })),
				is_available: true,
				is_visible: true,
			};

			const res: Response = await fetch('/api/menu', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dish),
			});

			if (!res.ok) {
				const data: ErrorResponse = await res.json();
				throw new Error(data.detail || 'Failed to create dish');
			}

			alert('Dish created successfully');
			setShowForm(false);
		} catch (err) {
			alert(err instanceof Error ? err.message : 'Unexpected error');
		}
	};

	return (
		<div className='mx-auto max-w-md p-6'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold text-gray-800'>Menu</h1>
				<button
					onClick={() => setShowForm((prev) => !prev)}
					className='rounded-lg bg-blue-500 px-4 py-2 font-medium text-white shadow transition hover:bg-blue-400'
				>
					{showForm ? 'Close Form' : 'Add Dish'}
				</button>
			</div>

			{showForm && (
				<form className='blur-xs Gray-600 mt-6 rounded-3xl border border-gray-200 bg-white p-8 shadow'>
					<h2 className='text-1da1f2 p-4 pl-0 text-2xl font-semibold text-gray-700'>
						Add Dish to <br />
						Menu
					</h2>

					<div className='pd-8 space-y-4'>
						<div>
							<label className='mb-1 block text-sm font-medium text-gray-600'>
								Dish Name
							</label>
							<input
								type='text'
								name='name'
								value={formData.name}
								onChange={handleChange}
								className='w-full rounded-xl border p-2'
								placeholder='Name of the dish'
							/>
						</div>
						<div>
							<label className='mb-1 block text-sm font-medium text-gray-600'>
								Dish Category
							</label>
							<select
								name='category'
								value={formData.category}
								onChange={handleChange}
								className='w-full rounded-xl border p-2 text-gray-500'
							>
								<option value=''>Dropdown option</option>
								<option value='appetizer'>Appetizer</option>
								<option value='main'>Main Course</option>
								<option value='dessert'>Dessert</option>
							</select>
						</div>
						<div>
							<label className='mb-1 block text-sm font-medium text-gray-600'>
								Dish Price
							</label>
							<input
								type='number'
								step='0.01'
								name='price'
								value={formData.price}
								onChange={handleChange}
								className='w-full rounded-xl border p-2'
								placeholder='0.00'
							/>
						</div>
						<div>
							<label className='mb-1 block text-sm font-medium text-gray-600'>
								Description
							</label>
							<input
								type='text'
								name='description'
								value={formData.description}
								onChange={handleChange}
								className='w-full rounded-xl border p-2'
								placeholder='Description of the dish'
							/>
						</div>
						<div>
							<label className='mb-1 block text-sm font-medium text-gray-600'>
								Allergens
							</label>
							<select
								name='allergens'
								value={formData.allergens}
								onChange={handleChange}
								className='w-full rounded-xl border p-2 text-gray-500'
							>
								<option value=''>Dropdown option</option>
								<option value='none'>None</option>
								<option value='nuts'>Nuts</option>
								<option value='gluten'>Gluten</option>
							</select>
						</div>
						<div className='grid grid-cols-3 items-center justify-between divide-x-2'>
							<div>
								<label className='mb-1 block text-sm font-medium text-gray-600'>
									Choose Image
								</label>
								<div className='grid place-items-center rounded-xl border p-8 text-center'>
									<input
										type='file'
										accept='image/*'
										onChange={handleFileChange}
										className='hidden'
									/>
									<span className='flex cursor-pointer justify-center text-gray-400'>
										<Image
											className='self-center'
											src={imageIcon}
											alt='missing icon'
										/>
									</span>
								</div>
							</div>
							<div></div>
							<div className='mt-6'>
								<button
									type='button'
									onClick={handleSubmit}
									className='rounded-md bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-400'
								>
									Add Dish
								</button>
							</div>
						</div>
					</div>
				</form>
			)}
		</div>
	);
}
