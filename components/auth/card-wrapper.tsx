import React from 'react'

import BackButton from '@/components/auth/back-button'
import Header from '@/components/auth/header'
import Social from '@/components/auth/social'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface CardWrapperProps {
	children: React.ReactNode
	headerLabel: string
	backButtonLabel: string
	backButtonHref: string
	showSocial?: boolean
}

const CardWrapper = ({ children, headerLabel, backButtonLabel, backButtonHref, showSocial }: CardWrapperProps) => {
	return (
		<Card className="w-[400px] shadow-md">
			<Header label={headerLabel} />
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)}
			<CardFooter>
				<BackButton label={backButtonLabel} href={backButtonHref} />
			</CardFooter>
		</Card>
	)
}

export default CardWrapper
