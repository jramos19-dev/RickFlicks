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

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const db = getDb()
        const { like } = req.body || {}

        if (!like || !like.objectId) {
            return res.status(400).json({ error: 'Missing like data' })
        }

        const docRef = await db.collection('likes').add({
            objectId: like.objectId,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            ...like,
        })

        return res.status(201).json({ success: true, id: docRef.id })
    } catch (error) {
        console.error('Error adding like:', error)
        return res.status(500).json({ error: 'Failed to add like' })
    }
}
