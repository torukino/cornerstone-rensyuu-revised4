'use server'

import { AuthError } from 'next-auth'

import type * as z from 'zod'

import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/route'
import { LoginSchema } from '@/schemas'

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'Invalid fields' }
	}

	const { email, password } = validatedFields.data

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		})
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: '認証に失敗しました' }
				default:
					return { error: 'エラーが発生しました' }
			}
		}
		throw error
	}
	return { success: 'Email sent' }
}
