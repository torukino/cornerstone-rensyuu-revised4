import React from 'react'

import { auth } from '@/auth'

const SettingsPage = async () => {
	const session = await auth()

	return <div className="flex text-3xl items-center justify-center h-screen">{JSON.stringify(session)}</div>
}

export default SettingsPage