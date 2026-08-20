import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { setUser, setToken } from '../../redux/authSlice'
import { type RegisterData } from '../../types/types'
import styles from './RegisterPage.module.css'

export const RegisterPage: React.FC = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [cellNumber, setCellNumber] = useState('')
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {

    e.preventDefault()
    setError('')

    if (!email || !password || !name || !surname || !cellNumber) {
      setError('Please fill in all fields')
      return
    }

    
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {

      const mockUser = {
        id: Date.now().toString(),
        email: email,
        name: name,
        surname: surname,
        cellNumber: cellNumber
      }

      dispatch(setUser(mockUser))
      dispatch(setToken('mock-token'))
      navigate('/home')
    } catch (error) {

      setError('Registration failed. Please try again')
    }
  }

  return (

    <div className={styles['register-container']}>

      <div className={styles['register-card']}>

        <h2>Register</h2>
        {error && <div className={styles['error-message']}>{error}</div>}

        <form onSubmit={handleRegister}>

          <div className={styles['form-group']}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className={styles['form-group']}>
            <label>Surname:</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Enter your surname"
            />
          </div>

          <div className={styles['form-group']}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className={styles['form-group']}>
            <label>Cell Number:</label>
            <input
              type="tel"
              value={cellNumber}
              onChange={(e) => setCellNumber(e.target.value)}
              placeholder="Enter your cell number"
            />
          </div>

          <div className={styles['form-group']}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type='submit' className={styles['register-button']}>Register</button>
        </form>

        <p className={styles['login-link']}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>

    </div>

  )
}

export default RegisterPage