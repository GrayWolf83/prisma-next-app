import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const main = async () => {
	const user = await db.user.create({
		data: {
			name: 'Пользователь1',
			email: 'e1@mail.ru',
			password: '123456',
		},
		select: {
			// Выбирает поля которые нужно вернуть в запросе
			name: true,
			events: true,
		},
	})

	console.log('User', user)
}

main().then(() => db.$disconnect())
