import { trpc } from '@/shared/api/index'
import {
	CreateEventForm,
	CreateEventValues,
} from '@/features/create-event/index'
import { useRouter } from 'next/router'

export default function UpdateEvent() {
	const router = useRouter()
	const {
		data: event,
		isLoading,
		refetch,
	} = trpc.event.findUnique.useQuery({
		id: Number(router.query.id),
	})

	const { mutate } = trpc.event.update.useMutation({
		onSuccess: () => {
			refetch()
			router.push('/')
		},
	})

	if (isLoading) {
		return 'Loading'
	}

	const handleSubmit = (data: CreateEventValues) => {
		mutate({ ...data, id: Number(router.query.id) })
	}

	return (
		<div className='mx-auto max-w-4xl'>
			{event && (
				<CreateEventForm onSubmit={handleSubmit} initial={event} />
			)}
		</div>
	)
}
