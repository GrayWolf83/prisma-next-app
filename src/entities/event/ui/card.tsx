import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

type EventCardProps = {
	id: number
	title: string
	description: string | null
	date: Date
	action: ReactNode
	update: ReactNode
}

export const EventCard = ({
	id,
	title,
	description,
	date,
	action,
	update,
}: EventCardProps) => {
	return (
		<div className='flex font-sans shadow-xl mb-2'>
			<div className='flex-none w-48 relative'>
				<Image
					src='/meet2.jpg'
					alt=''
					className='absolute inset-0 w-full h-full object-cover py-2'
					fill
				/>
			</div>
			<div className='flex-auto p-6'>
				<div className='flex flex-wrap -mt-6 pt-6 pb-6'>
					<h1 className='flex-auto text-lg font-semibold text-slate-900'>
						{title}
					</h1>
					<div className='text-lg font-semibold text-slate-500'>
						{date.toDateString()}
					</div>
					<div className='w-full flex-none text-sm font-medium text-slate-700 mt-2'>
						{description}
					</div>
				</div>

				<div className='flex space-x-4 mb-6 text-sm font-medium'>
					<div className='flex-auto flex space-x-4'>
						{action}
						<Link href={`/events/${id}`}>
							<button className='h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900'>
								Подробнее
							</button>
						</Link>
						{update}
					</div>
				</div>
			</div>
		</div>
	)
}
