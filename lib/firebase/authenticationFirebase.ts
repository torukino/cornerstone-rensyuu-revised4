import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { v4 as uuidv4 } from 'uuid'

import type { USER } from '@/types/user'

import { app } from '@/lib/firebase/firebaseClientConfig'
import { db } from '@/lib/firebase/firebaseServerConfig'

const BUG = false

interface AuthenticateFirebaseProps {
	email: string
	hashedPassword: string
	name: string
}

interface MessageProps {
	error?: string | undefined
	success?: string | undefined
}

export const authenticateFirebase = async ({ email, hashedPassword, name }: AuthenticateFirebaseProps): Promise<MessageProps> => {
	const auth = getAuth(app)
	let success = ''
	let error = ''
	await createUserWithEmailAndPassword(auth, email, hashedPassword)
		.then(userCredential => {
			// Signed in
			const user = userCredential.user
			BUG && console.log({ user })
			// firestore "users" collectionに登録
			const id = uuidv4()
			const userData = {
				id,
				name,
				email,
				password: hashedPassword,
			} as USER

			db.collection('users').doc(id).set(userData)
			success = 'google auth & firestoreの登録完了'
		})
		.catch(error => {
			const errorCode = error.code
			const errorMessage = error.message
			BUG && console.log({ errorCode, errorMessage })
			error = errorMessage
		})
	return { error: error, success: success }
}
