import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { setUser, setToken, setAuthenticated } from '../../redux/authSlice'
import { userApi } from '../../api'
import styles from './LoginPage.module.css'
import { User } from 'lucide-react'
import bcrypt from 'bcryptjs'

export const LoginPage: React.FC = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault()
    setError('')

    if (!email || !password) {

      setError('please fill in all fields')
      return
    }

    try {

      const user = await userApi.login(email)

      if (!user || !(await bcrypt.compare(password, user.password))) {
        setError('Invalid email or password')
        return
      }

      const sessionUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        cellNumber: user.cellNumber,
      }

      const authSession = {
        user: sessionUser,
        isAuthenticated: true,
        token: 'json-server-session',
      }

      localStorage.setItem('shopping-list-auth', JSON.stringify(authSession))

      dispatch(setUser(sessionUser))
      dispatch(setToken('json-server-session'))
      dispatch(setAuthenticated(true))
      navigate('/home')
    } catch {

      setError('Login failed. please try again')
    }
  }


  return (

    <div className={styles['login-container']}>


      <div className={styles['login-card']}>

        <div className={styles.avatar}>

          <User size={34} color="#FAF9F6" />

        </div>

        <h2>Login</h2>
        {error && <div className={styles['error-message']}>{error}</div>}

        <form onSubmit={handleLogin}>

          <div className={styles['form-group']}>
            <label>Email</label>
            <input

              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"

            />

          </div>

          <div className={styles['form-group']}>

            <label>Password</label>
            <input

              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"

            />
          </div>

          <button type='submit' className={styles['login-button']}>login</button>
        </form>

        <p className={styles['register-link']}>

          Don't have an account? <Link to="/register">Register</Link>

        </p>
      </div>

    </div>

  )
}

export default LoginPage