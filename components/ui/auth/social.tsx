import React from 'react'

import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/button'
const social = () => {
	return (
		<div className="flex items-center w-full gap-x-2">
			<Button size="lg" className="w-full" variant="outline">
				<FcGoogle className="w-6 h-6" />
			</Button>
			<Button size="lg" className="w-full" variant="outline">
				<FaGithub className="w-6 h-6" />
			</Button>
		</div>
	)
}

export default social
