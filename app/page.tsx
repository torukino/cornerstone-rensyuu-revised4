import { Poppins } from 'next/font/google'

import { LoginButton } from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const font = Poppins({
	subsets: ['latin'],
	weight: ['600'],
})

export default function Home() {
	return (
		<main
			className="flex h-full flex-col items-center justify-center
		bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
		from-yellow-100 to-green-300"
		>
			<div className="space-y-6 text-center">
				<h1 className={cn('text-6xl font-semibold text-gray-600 drop-shadow-md', font.className)}>🔐 Auth</h1>
				<p className="text-gray-700 text-lg">A simple authentication service</p>
				<LoginButton>
					<Button variant="secondary" size="lg">
						ログイン
					</Button>
				</LoginButton>
			</div>
		</main>
	)
}
