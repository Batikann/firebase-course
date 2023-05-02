import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updatePassword,
} from 'firebase/auth'
import toast from 'react-hot-toast'
import { store } from '../redux/store'
import {
  login as loginHandle,
  logout as logoutHandle,
} from '../redux/authSlice'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_API_KEY,
  authDomain: import.meta.env.VITE_REACT_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_ID,
  measurementId: import.meta.env.VITE_REACT_MESASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    toast.success('Successfully created!')
    return user
  } catch (error) {
    toast.error(error.message)
  }
}

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    toast.success('Successfully login in')
    return user
  } catch (error) {
    toast.error(error.message)
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
    toast.success('Logout successfull')
    return true
  } catch (error) {
    toast.error(error.message)
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(
      loginHandle({
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        uid: user.uid,
      })
    )
  } else {
    store.dispatch(logoutHandle(user))
  }
})

export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data)
    toast.success('Bilgileriniz Başariyla güncellendi')
  } catch (error) {
    toast.error(error.message)
  }
}

export const sendVerificationEmail = async () => {
  try {
    await sendEmailVerification(auth.currentUser)
    toast.success(
      `Doğrulama Maili ${auth.currentUser.email} adresine gönderildi...`
    )
  } catch (error) {
    toast.error(error.message)
  }
}

export const resetPassword = async (data) => {
  try {
    await updatePassword(auth.currentUser, data)
    toast.success('Parola başarıyla güncellendi')
  } catch (error) {
    toast.error(error.message)
  }
}
