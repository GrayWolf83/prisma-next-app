import { trpc } from '@/shared/api'
import { EventCard } from '@/entities/event/ui/card'
import { JoinEventButton } from '@/features/join-event/ui/button'
import { DetachEventButton } from '@/features/detach-event/ui/button'

export default function Home() {
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
					/>
				</li>
			))}
		</ul>
	)
}
