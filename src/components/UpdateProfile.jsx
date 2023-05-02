import { useState } from 'react'
import { auth, resetPassword, update } from '../config/firebase'
import { login as loginHandle } from '../redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'

function UpdateProfile() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [displayName, setDisplayName] = useState(user.displayName)
  const [avatar, setAvatar] = useState(user.photoURL)
  const [passowrd, setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    await update({ displayName, photoURL: avatar })
    dispatch(
      loginHandle({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      })
    )
  }

  const handlePassword = async (e) => {
    e.preventDefault()
    await resetPassword(passowrd)
    setPassword('')
  }

  return (
    <div className="flex flex-col gap-y-10 mt-10">
      <Toaster position="top-right" />
      <div>
        <form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold">Profili Güncelle</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <label>Ad Soyad</label>
              <input
                type="text"
                className="border border-indigo-700 focus:border-indigo-800 rounded-md p-2 w-full"
                placeholder="John Doe"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <div>
                <label>Fotoğraf</label>
                <input
                  type="text"
                  className="border border-indigo-700 focus:border-indigo-800 rounded-md p-2 w-full"
                  placeholder="John Doe"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                />
              </div>
            </div>
            <button className="bg-indigo-700 hover:bg-indigo-800 text-white text-base p-2 rounded-lg font-semibold">
              Update
            </button>
          </div>
        </form>
      </div>
      <div>
        <form className="flex gap-2 flex-col" onSubmit={handlePassword}>
          <h1 className="text-2xl font-bold">Paroyalı Güncelle</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <label>Yeni Parola</label>
              <input
                type="password"
                className="border border-indigo-700 focus:border-indigo-800 rounded-md p-2 w-full"
                placeholder="John Doe"
                value={passowrd}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={!passowrd}
              className="bg-indigo-700 hover:bg-indigo-800 text-white text-base p-2 rounded-lg font-semibold"
            >
              Şifreyi Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default UpdateProfile
