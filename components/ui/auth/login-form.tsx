import React from 'react'

import CardWrapper from '@/components/ui/auth/card-wrapper'

const LoginForm = () => {
	return (
		<CardWrapper headerLabel="おかえりなさい" backButtonLabel="アカウントがない場合はこちら" backButtonHref="/auth/register" showSocial>
			Login Form
		</CardWrapper>
	)
}

export default LoginForm
