// import admin from 'firebase-admin'
// import { getApps, cert } from 'firebase-admin/app'

// import type { App as FirebaseApp } from 'firebase-admin/app'

// let app: FirebaseApp
// if (!getApps().length) {
// 	if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
// 		throw new Error('FIREBASE_SERVICE_ACCOUNT環境変数が設定されていません。')
// 	}
// 	const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)

// 	app = admin.initializeApp({
// 		projectId: process.env.FIREBASE_PROJECT_ID,
// 		credential: cert(serviceAccount),
// 	})
// } else {
// 	app = getApps()[0] // 既に初期化されているアプリのインスタンスを取得
// }

// export { app }
// export const db = getFirestore(app)

import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
	throw new Error('FIREBASE_SERVICE_ACCOUNT環境変数が設定されていません。')
}
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)

export const firebaseAdmin =
	getApps()[0] ??
	initializeApp({
		credential: cert(serviceAccount),
	})

export const auth = getAuth()
export const db = getFirestore(getApps()[0])
