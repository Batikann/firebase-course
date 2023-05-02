import { Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoute({ children, ...rest }) {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Navigate to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  )
}

export default PrivateRoute
