/**
 * ランディングページ用のルート
 * authenticationなしでアクセスできる
 * @type {string[]}
 */
export const publicRoutes = ['/']

/**
 * authenticationのために使われるルート
 * authenticationなしでアクセスできる
 * ログインできれば "/settings"にリダイレクトされる
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register']

/**
 * API authenticationのために使われるルートの接頭辞
 * この接頭辞で始まるルートはauthentication関連に使われるAPI
 * @type{string} */
export const apiAuthPrefix = '/api/auth'

/**
 * ログイン後のデフォルトのリダイレクト先
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings'
