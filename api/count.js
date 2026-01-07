import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
}

// Initialize Firebase (only if not already initialized)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { objectId } = req.query

        if (!objectId) {
            return res.status(400).json({ error: 'Missing objectId parameter' })
        }

        const q = query(collection(db, 'likes'), where('objectId', '==', objectId))
        const querySnapshot = await getDocs(q)
        const count = querySnapshot.size

        return res.status(200).json({
            data: { count }
        })
    } catch (error) {
        console.error('Error counting likes:', error)
        return res.status(500).json({ error: 'Failed to count likes' })
    }
}
