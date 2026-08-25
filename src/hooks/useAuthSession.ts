import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../redux/hooks'
import { setUser, setToken, setAuthenticated, logout } from '../redux/authSlice'
import type { User } from '../types/types'

const MOCK_TOKEN = 'mock-token'

/**
 * Shared sign in / sign out flow used by the auth, home and settings screens.
 */
export const useAuthSession = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const signIn = (user: User, token: string = MOCK_TOKEN) => {
    dispatch(setUser(user))
    dispatch(setToken(token))
    dispatch(setAuthenticated(true))
    navigate('/home')
  }

  const signOut = () => {
    dispatch(logout())
    dispatch(setAuthenticated(false))
    navigate('/login')
  }

  return { signIn, signOut }
}
