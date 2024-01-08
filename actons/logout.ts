'use server'

import { signOut as signOutFirebase } from 'firebase/auth'

import { signOut as signOutAuth } from '@/auth'
import { firebaseAuth } from '@/lib/firebase/firebase'

export const logout = async () => {
	// some server stuff
	await signOutFirebase(firebaseAuth)
	await signOutAuth()
}
