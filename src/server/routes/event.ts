import { isAuth } from './../trpc'
import {
	CreateEventSchema,
	JoinEventSchema,
	DetachEventSchema,
	UpdateEventSchema,
} from '@/shared/api/schema'
import { prisma } from './../db'
import { procedure, router } from '../trpc'
import { z } from 'zod'

export const eventRouter = router({
	findMany: procedure.query(async ({ ctx: { user } }) => {
		const events = await prisma.event.findMany({
			include: {
				participations: true,
			},
		})

		return events.map(({ participations, ...event }) => ({
			...event,
			isJoined: participations.some(({ userId }) => userId === user?.id),
		}))
	}),
	create: procedure
		.input(CreateEventSchema)
		.use(isAuth)
		.mutation(async ({ input, ctx: { user } }) => {
			return prisma.event.create({
				data: {
					...input,
					authorId: user?.id,
				},
			})
		}),

	join: procedure
		.input(JoinEventSchema)
		.use(isAuth)
		.mutation(({ input, ctx: { user } }) => {
			return prisma.participation.create({
				data: {
					eventId: input.id,
					userId: user.id,
				},
			})
		}),

	detach: procedure
		.input(DetachEventSchema)
		.use(isAuth)
		.mutation(({ input, ctx: { user } }) => {
			return prisma.participation.delete({
				where: {
					userId_eventId: { eventId: input.id, userId: user.id },
				},
			})
		}),

	update: procedure
		.input(UpdateEventSchema)
		.use(isAuth)
		.mutation(async ({ input, ctx: { user } }) => {
			return prisma.event.update({
				where: { id: input.id, authorId: user.id },
				data: {
					title: input.title,
					description: input.description,
					date: input.date,
				},
			})
		}),

	findUnique: procedure
		.input(
			z.object({
				id: z.number(),
			}),
		)
		.use(isAuth)
		.query(({ input }) => {
			return prisma.event.findUnique({
				where: input,
				select: {
					title: true,
					description: true,
					date: true,
					participations: {
						select: {
							user: {
								select: {
									name: true,
								},
							},
						},
					},
				},
			})
		}),
})
