import firebase from "firebase/app"
import { useAuth } from "@vueuse/firebase"
import "firebase/auth"

import { firebaseConfig } from "~/config/firebase"

firebase.initializeApp(firebaseConfig)

const { auth } = firebase
const { GoogleAuthProvider } = auth

const { isAuthenticated, user } = useAuth()

export const authentication = () => {
  const signIn = () => auth().signInWithPopup(new GoogleAuthProvider())
  const signOut = () => auth().signOut()
  return { signIn, signOut, isAuthenticated, user }
}
