// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma, User } from '@/server/db'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<User[]>,
) {
	const users = await prisma.user.findMany()

	res.status(200).json(users)
}
