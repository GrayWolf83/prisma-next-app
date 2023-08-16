import { trpc } from '@/shared/api/index'

type DetachEventButtonProps = {
	eventId: number
	onSuccess: () => void
}

export const DetachEventButton = ({
	eventId,
	onSuccess,
}: DetachEventButtonProps) => {
	const { mutate } = trpc.event.detach.useMutation({ onSuccess })

	const handleClick = () => {
		mutate({ id: eventId })
	}

	return (
		<button
			className='h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900'
			onClick={handleClick}>
			Покинуть событие
		</button>
	)
}
