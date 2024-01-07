import { FirestoreAdapter } from '@auth/firebase-adapter'
import NextAuth from 'next-auth'

import authConfig from '@/auth.config'
import { firestore } from '@/lib/firestore'

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	adapter: FirestoreAdapter(firestore),
	session: { strategy: 'jwt' },
	...authConfig,
})
