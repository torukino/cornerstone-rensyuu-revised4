'use client'

import React, { useState, useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { z } from 'zod'

import { login } from '@/actons/login'
import CardWrapper from '@/components/auth/card-wrapper'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginSchema } from '@/schemas'

const LoginForm = () => {
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')

	const [isPending, startTransition] = useTransition()
	// パスワードの表示状態を管理するための状態変数
	const [showPassword, setShowPassword] = useState(false)

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError('')
		setSuccess('')

		startTransition(() => {
			login(values).then((data: any) => {
				setError(data.error)
				setSuccess(data.success)
			})
		})
	}

	return (
		<CardWrapper headerLabel="おかえりなさい" backButtonLabel="Eメールの登録をしていない場合はこちら" backButtonHref="/auth/register" showSocial>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Eメール</FormLabel>
									<FormControl>
										<Input {...field} disabled={isPending} placeholder="John.doe@example.com" type="email" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										<span className="mr-4">パスワード</span>
										<Button variant="ghost" size="icon">
											<div onClick={() => setShowPassword(!showPassword)}>
												{showPassword === false && <div>🙈 表示</div>}
												{showPassword === true && <div>👀 隠す</div>}
											</div>
										</Button>
									</FormLabel>
									<FormControl>
										<Input {...field} disabled={isPending} placeholder="******" type={showPassword ? 'text' : 'password'} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button disabled={isPending} type="submit" className="w-full">
						ログイン
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}

export default LoginForm
