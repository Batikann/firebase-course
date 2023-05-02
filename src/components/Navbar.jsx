import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="https://flowbite.com" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>
        <div className="flex items-center gap-x-3">
          <Link
            to="/login"
            className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
