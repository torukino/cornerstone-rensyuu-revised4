'use server'

import type { USER } from '@/types/user'

import { db } from '@/lib/firebase/firebaseServerConfig'

export const updateUser = async (user: USER): Promise<void> => {
	await db.collection('users').doc(user.id).set(user)
}

export const deleteUserById = async (id: string): Promise<void> => {
	await db.collection('users').doc(id).delete()
}

export const getUsers = async (): Promise<USER[]> => {
	const users: USER[] = []
	await db
		.collection('users')
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(doc => {
				users.push(doc.data() as USER)
			})
		})
	return users
}

export const getUserByEmail = async (email: string): Promise<USER | undefined> => {
	const users: USER[] = []
	const user: USER | undefined = undefined
	await db
		.collection('users')
		.where('email', '==', email)
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(doc => {
				const user: USER = doc.data() as USER
				users.push(user)
			})
		})
	if (users.length > 0) {
		return users[0]
	}

	return undefined
}
