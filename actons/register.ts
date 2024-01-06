'use server'
import bcrypt from 'bcryptjs'

import type { USER } from '@/types/user'
import type * as z from 'zod'

// import { getUserByEmail } from '@/data/user'
// import { sendVerificationEmail } from '@/lib/mail'
// import { generateVerificationToken } from '@/lib/tokens'
import { authenticateFirebase } from '@/lib/firebase/authenticationFirebase'
import { getUserByEmail } from '@/lib/firebase/userDB'
import { RegisterSchema } from '@/schemas'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	console.log(`input values`, values)
	const validatedFileds = RegisterSchema.safeParse(values)

	if (!validatedFileds.success) {
		return { error: 'Invalid fields!' }
	}

	const { email, password, name } = validatedFileds.data
	const hashedPassword = await bcrypt.hash(password, 10)
	// console.log(`hashedPassword`, { hashedPassword })

	const existingUser: USER | undefined = await getUserByEmail(email)

	if (existingUser) {
		return { error: `${email}は既に登録済みです` }
	}

	// firebase authenticationとfirestore "users" collectionに登録
	const message = await authenticateFirebase({ email, hashedPassword, name })

	console.log({ message })
	//TODO: Send verification token email
	// const verificationToken = await generateVerificationToken(email)

	// await sendVerificationEmail(verificationToken.email, verificationToken.token)

	if (message.error !== '') return { error: message.error }
	return { success: message.success }
}
