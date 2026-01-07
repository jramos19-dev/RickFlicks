const admin = require('firebase-admin')

function getDb() {
    if (admin.apps.length === 0) {
        const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
        if (!json) {
            throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_JSON')
        }
        const serviceAccount = JSON.parse(json)

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        })
    }

    return admin.firestore()
}

module.exports = async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const db = getDb()
        const objectId = req.query && req.query.objectId

        if (!objectId) {
            return res.status(400).json({ error: 'Missing objectId parameter' })
        }

        const snap = await db
            .collection('likes')
            .where('objectId', '==', objectId)
            .get()

        return res.status(200).json({ data: { count: snap.size } })
    } catch (error) {
        console.error('Error counting likes:', error)
        return res.status(500).json({ error: 'Failed to count likes' })
    }
}
