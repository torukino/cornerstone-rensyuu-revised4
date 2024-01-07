import NextAuth from 'next-auth'

import authConfig from '@/auth.config'
import { DEFAULT_LOGIN_REDIRECT, publicRoutes, apiAuthPrefix, authRoutes } from '@/route'

const { auth } = NextAuth(authConfig)
console.log('@@@@ auth', {auth})
export default auth(req => {
	const isLoggedIn = !!req.auth
	console.log('IS LoggedIn: ', isLoggedIn)
	console.log('ROUTE', req.nextUrl.pathname)

	const { nextUrl } = req

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
	const isAuthRoute = authRoutes.includes(nextUrl.pathname)

	if (isApiAuthRoute) {
		return null
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
		}
		return null
	}

	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(new URL('/auth/login', nextUrl))
	}

	return null
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
