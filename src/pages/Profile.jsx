import { useDispatch, useSelector } from 'react-redux'
import { logout, sendVerificationEmail } from '../config/firebase'
import { logout as logoutHandle } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import UpdateProfile from '../components/UpdateProfile'

function Profile() {
  const { user } = useSelector((state) => state.auth)
  console.log(user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout()
    dispatch(logoutHandle())
    navigate('/login')
  }

  const handleVerification = async () => {
    await sendVerificationEmail()
  }

  return (
    <div className="text-yellow-950 flex flex-col gap-y-4 p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          {user.photoURL && (
            <img src={user.photoURL} className="w-7 h-7 rounded-full" />
          )}
          <h1>{user.displayName}</h1>
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="bg-indigo-700 hover:bg-indigo-800 text-white p-2 rounded-md text-sm cursor-pointer font-medium"
            onClick={handleLogout}
          >
            Çıkış yap
          </button>
          {!user.emailVerified && (
            <button
              className="text-white bg-indigo-700 hover:bg-indigo-800 p-2 rounded-md text-sm"
              onClick={handleVerification}
            >
              Email Doğrula
            </button>
          )}
        </div>
      </div>
      <UpdateProfile />
    </div>
  )
}
export default Profile
