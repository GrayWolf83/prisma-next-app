import Image from 'next/image'
import { Inter } from 'next/font/google'
import { prisma } from '@/server/db'
import { useEffect, useState } from 'react'
import { trpc } from '@/shared/api'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const { data } = trpc.hello.useQuery({ text: 'Name' })

	return <pre>{JSON.stringify(data?.greeting, null, 2)}</pre>
}
