import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { setUser, setToken, setAuthenticated } from '../../redux/authSlice'
import { signUp } from '../../services/authService'
import { validateCellNumber, validateEmail, validateName, validatePassword } from '../../utils/validation'
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

    const validationError =
      validateName(name, 'Name') ??
      validateName(surname, 'Surname') ??
      validateEmail(email) ??
      validateCellNumber(cellNumber) ??
      validatePassword(password)

    if (validationError) {
      setError(validationError)
      return
    }

    try {

      const session = await signUp({ email, password, name, surname, cellNumber })

      dispatch(setUser(session.user))
      dispatch(setToken(session.token))
      dispatch(setAuthenticated(true))
      navigate('/home')
    } catch {

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
              maxLength={100}
            />
          </div>

          <div className={styles['form-group']}>
            <label>Surname:</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Enter your surname"
              maxLength={100}
            />
          </div>

          <div className={styles['form-group']}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              maxLength={100}
            />
          </div>

          <div className={styles['form-group']}>
            <label>Cell Number:</label>
            <input
              type="tel"
              value={cellNumber}
              onChange={(e) => setCellNumber(e.target.value)}
              placeholder="Enter your cell number"
              maxLength={20}
            />
          </div>

          <div className={styles['form-group']}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="new-password"
              maxLength={128}
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