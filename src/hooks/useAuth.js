import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { selectToken } from '../features/auth/authSlice'

const useAuth = () => {
  const token = useSelector(selectToken)

  if (token) {
    const decodedToken = jwtDecode(token)
    const { id, username, email } = decodedToken.UserInfo

    return { id, username, email }
  }

  return { id: '', username: '', email: '' }
}

export default useAuth
