import { collection, query, getDocs, where } from 'firebase/firestore'

import type { USER } from '@/types/user'

import { db } from '@/lib/firebase/firebase'
// export const updateUser = async (user: USER): Promise<void> => {
// 	await db.collection('users').doc(user.id).set(user)
// }

// export const deleteUserById = async (id: string): Promise<void> => {
// 	await db.collection('users').doc(id).delete()
// }

// export const getUsers = async (): Promise<USER[]> => {
// 	const users: USER[] = []
// 	await db
// 		.collection('users')
// 		.get()
// 		.then(querySnapshot => {
// 			querySnapshot.forEach(doc => {
// 				users.push(doc.data() as USER)
// 			})
// 		})
// 	return users
// }

export const getUserByEmailClient = async (email: string): Promise<USER | undefined> => {
	const users: USER[] = []

	const usersRef = collection(db, 'users')
	const q = query(usersRef, where('email', '==', email))
	const querySnapshot = await getDocs(q)
	querySnapshot.forEach(doc => {
		users.push(doc.data() as USER)
		console.log(doc.id, ' => ', doc.data())
	})

	if (users.length > 0) {
		return users[0]
	}

	return undefined
}
