import { ref, onUnmounted } from 'vue'
import { useAuth } from '@vueuse/firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { firebaseConfig } from '~/config/firebase'

firebase.initializeApp(firebaseConfig)

const { auth, firestore } = firebase
const { GoogleAuthProvider } = auth
const db = firestore()

const { isAuthenticated, user } = useAuth()

export const authentication = () => {
  const signIn = () => auth().signInWithPopup(new GoogleAuthProvider())
  const signOut = () => auth().signOut()
  return { signIn, signOut, isAuthenticated, user }
}

export const database = (movieId) => {
  const comments = ref([])

  const commentsCollection = db.collection('comments')
  const commentsQuery = commentsCollection
    .where('movieId', '==', movieId)
    .orderBy('createdAt')

  const unsubscribe = commentsQuery.onSnapshot((s) => {
    comments.value = s.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  })

  onUnmounted(unsubscribe)

  const addComment = async (text) => {
    if (!isAuthenticated.value) return
    const { uid, displayName } = user.value
    await commentsCollection.add({
      userName: displayName,
      userId: uid,
      movieId,
      text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  return { comments, addComment }
}
