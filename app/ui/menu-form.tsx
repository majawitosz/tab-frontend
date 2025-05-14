'use client';
import { useState, JSX, ChangeEvent } from 'react';
import { Dish } from '@/app/types/order';
import { ErrorResponse } from '@/app/types/loginRegister';
import Image from 'next/image';

export default function MenuForm(): JSX.Element {
	const [showForm, setShowForm] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [serverImages, setServerImages] = useState<string[]>([
		'/images/sample1.jpg',
		'/images/sample2.jpg',
	]);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		name: '',
		category: '',
		price: '',
		description: '',
		allergens: '',
	});

	const handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void = (
		e: ChangeEvent<HTMLInputElement>
	) => {
		const file: File | undefined = e.target.files?.[0];
		if (file) setSelectedFile(file);
	};

	const handleUpload: () => void = () => {
		if (!selectedFile) return;
		const fakePath: string = `/uploads/${selectedFile.name}`;
		setServerImages((prev) => [...prev, fakePath]);
		setSelectedFile(null);
	};

	const handleChange: (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
		<div className='mx-auto max-w-2xl space-y-6 p-6'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold text-gray-800'>Menu</h1>
				<button
					onClick={() => setShowForm((prev) => !prev)}
					className='rounded-lg bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700'
				>
					{showForm ? 'Close Form' : 'Add Dish'}
				</button>
			</div>

			{showForm && (
				<form className='animate-fade-in space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow'>
					<h2 className='text-lg font-semibold text-gray-700'>
						New Dish
					</h2>

					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
						<div>
							<label className='mb-1 block text-sm text-gray-600'>
								Name
							</label>
							<input
								type='text'
								name='name'
								value={formData.name}
								onChange={handleChange}
								className='w-full rounded-md border p-2'
								placeholder='Dish name'
							/>
						</div>
						<div>
							<label className='mb-1 block text-sm text-gray-600'>
								Category
							</label>
							<input
								type='text'
								name='category'
								value={formData.category}
								onChange={handleChange}
								className='w-full rounded-md border p-2'
								placeholder='e.g. Appetizer'
							/>
						</div>
						<div>
							<label className='mb-1 block text-sm text-gray-600'>
								Price ($)
							</label>
							<input
								type='number'
								step='0.01'
								name='price'
								value={formData.price}
								onChange={handleChange}
								className='w-full rounded-md border p-2'
								placeholder='0.00'
							/>
						</div>
					</div>

					{/* Upload Section */}
					<div className='space-y-2'>
						<label className='block text-sm text-gray-600'>
							Select a Photo
						</label>
						<input
							type='file'
							accept='image/*'
							onChange={handleFileChange}
							className='block w-full text-sm'
						/>

						{selectedFile && (
							<div className='mt-2 flex items-center justify-between'>
								<p className='text-xs text-green-600'>
									{selectedFile.name}
								</p>
								<button
									type='button'
									onClick={handleUpload}
									className='rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300'
								>
									Upload Photo to Server
								</button>
							</div>
						)}
					</div>

					{/* Choose from server images */}
					<div className='space-y-2'>
						<label className='block text-sm text-gray-600'>
							Choose Image from Server
						</label>
						<select
							className='w-full rounded-md border p-2'
							value={selectedImage ?? ''}
							onChange={(e) => setSelectedImage(e.target.value)}
						>
							<option value=''>Select an image...</option>
							{serverImages.map((src, idx) => (
								<option key={idx} value={src}>
									{src}
								</option>
							))}
						</select>

						{selectedImage && (
							<Image
								src={selectedImage}
								alt='Preview'
								className='mt-2 h-24 rounded border object-cover'
							/>
						)}
					</div>

					<div>
						<label className='mb-1 block text-sm text-gray-600'>
							Description
						</label>
						<textarea
							rows={2}
							name='description'
							value={formData.description}
							onChange={handleChange}
							className='w-full rounded-md border p-2'
							placeholder='Short description'
						/>
					</div>

					<div>
						<label className='mb-1 block text-sm text-gray-600'>
							Allergens (comma-separated)
						</label>
						<input
							type='text'
							name='allergens'
							value={formData.allergens}
							onChange={handleChange}
							className='w-full rounded-md border p-2'
							placeholder='e.g. gluten, dairy'
						/>
					</div>

					<div className='pt-2 text-right'>
						<button
							type='button'
							onClick={handleSubmit}
							className='rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700'
						>
							Send
						</button>
					</div>
				</form>
			)}
		</div>
	);
}
