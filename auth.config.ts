import bcrypt from 'bcryptjs'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import type { NextAuthConfig } from 'next-auth'

import { getUserByEmailClient } from '@/lib/firebase/userDBClient'
import { LoginSchema } from '@/schemas'

export default {
	providers: [
		CredentialsProvider({
			//https://authjs.dev/getting-started/providers/credentials-tutorial
			async authorize(credentials: any) {
				console.log('@@@ credentials', credentials)
				const validatedFields = LoginSchema.safeParse(credentials)
				console.log('@@@ validatedFields', validatedFields)
				if (validatedFields.success) {
					const { email, password } = validatedFields.data
					console.log('@@@ email', email)
					console.log('@@@ password', password)
					const user = await getUserByEmailClient(email)
					console.log('@@@ user', { user })
					if (!user || !user.password) {
						return null
					}
					const inputPassword = password
					const hashedPasswordFromFirestore = user.password
					const passwordMatch = await bcrypt.compare(inputPassword, hashedPasswordFromFirestore)
					console.log('@@@ inputPassword', { inputPassword })
					console.log('@@@ hashedPasswordFromFirestore', { hashedPasswordFromFirestore })
					console.log('@@@ passwordMatch', { passwordMatch })

					if (passwordMatch) {
						const auth = getAuth()
						signInWithEmailAndPassword(auth, email, hashedPasswordFromFirestore)
							.then(userCredential => {
								// Signed in
								const user = userCredential.user
								if (user.emailVerified) {
									return user
								}
								// ...
								return null
							})
							.catch(error => {
								const errorCode = error.code
								const errorMessage = error.message
								console.log('@@@ error', { errorCode, errorMessage })
							})

						return user
					}
				}

				//************************ */

				return null
			},
		}),
	],
} satisfies NextAuthConfig
