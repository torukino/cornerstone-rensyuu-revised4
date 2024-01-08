import React from 'react'

import { logout } from '@/actons/logout'
import { auth } from '@/auth'

const SettingsPage = async () => {
	const session = await auth()

	return (
		<>
			<div className="flex text-3xl items-center justify-center h-screen">{JSON.stringify(session)}</div>
			<form action={logout}>
				<button type="submit">Logout</button>
			</form>
		</>
	)
}

export default SettingsPage
