import { trpc } from '@/shared/api'
import { EventCard } from '@/entities/event/ui/card'
import { JoinEventButton } from '@/features/join-event/ui/button'
import { DetachEventButton } from '@/features/detach-event/ui/button'
import Link from 'next/link'

export default function Home(props: any) {
	const { data, refetch } = trpc.event.findMany.useQuery()

	return (
		<ul>
			{data?.map((event) => (
				<li key={event.id}>
					<EventCard
						{...event}
						action={
							!event.isJoined ? (
								<JoinEventButton
									eventId={event.id}
									onSuccess={refetch}
								/>
							) : (
								<DetachEventButton
									eventId={event.id}
									onSuccess={refetch}
								/>
							)
						}
						update={
							props?.session?.user?.id === event.authorId && (
								<Link href={`/events/update/${event.id}`}>
									<button className='h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900'>
										Редактировать
									</button>
								</Link>
							)
						}
					/>
				</li>
			))}
		</ul>
	)
}
