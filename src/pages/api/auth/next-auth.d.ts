import NextAuth from 'next-auth/next'

declare module 'next-auth' {
	interface User {
		id: number
		email: string
		name: string
	}

	interface Session {
		user: {
			id: number
			email: string
			name: string
		}
	}
}
