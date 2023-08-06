import Image from 'next/image'
import { Inter } from 'next/font/google'
import { prisma } from '@/server/db'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const [data, setData] = useState('')

	useEffect(() => {
		const getData = async () => {
			const response = await fetch('http://localhost:3000/api/hello')
			const data = await response.json()
			setData(data)
		}

		getData()
	}, [])

	return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export const getServerSideProps = async () => {
	// const response = await fetch('http://localhost:3000/api/hello')
	// const data = await response.json()

	// return {
	// 	props: {
	// 		data,
	// 	},
	// }

	const users = await prisma.user.findMany()

	return {
		props: {
			data: users,
		},
	}
}
