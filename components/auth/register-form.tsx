'use client'
import { useState, useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type z from 'zod'

import { register } from '@/actons/register'
import CardWrapper from '@/components/auth/card-wrapper'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RegisterSchema } from '@/schemas'

export const RegisterForm = () => {
	// パスワードの表示状態を管理するための状態変数
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')

	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: '',
			name: '',
		},
	})

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setError('')
		setSuccess('')

		startTransition(() => {
			register(values).then(data => {
				setError(data.error)
				setSuccess(data.success)
			})
		})
	}

	return (
		<CardWrapper headerLabel="アカウントを作成" backButtonLabel="すでにアカウントを持っているお持ちですか？" backButtonHref="/auth/login" showSocial>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>名前</FormLabel>
									<FormControl>
										<Input {...field} disabled={isPending} placeholder="常 道江(John Doe)" type="text" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Eメール</FormLabel>
									<FormControl>
										<Input {...field} disabled={isPending} placeholder="john@example.com" type="email" />
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
						アカウントを作成します
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
