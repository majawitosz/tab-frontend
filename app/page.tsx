/** @format */

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page(): React.ReactNode {
	return (
		<main className='flex min-h-screen flex-col p-6'>
			<div className='mt-4 flex grow flex-col gap-4 md:flex-row'>
				<div className='flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20'>
					<Link
						href='/login'
						className='flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base'
					>
						<span>Log in</span>{' '}
						<ArrowRightIcon className='w-5 md:w-6' />
					</Link>
					<Link
						href='/register'
						className='flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base'
					>
						<span>Register</span>{' '}
						<ArrowRightIcon className='w-5 md:w-6' />
					</Link>
				</div>
				<div className='flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12'>
					{/* Add Hero Images Here */}
				</div>
			</div>
		</main>
	);
}
