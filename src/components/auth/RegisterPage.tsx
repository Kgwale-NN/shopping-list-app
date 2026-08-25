import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthSession } from '../../hooks/useAuthSession'
import { validateCredentials } from '../../utils/validation'
import FormField from '../ui/FormField'
import styles from './RegisterPage.module.css'

export const RegisterPage: React.FC = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [cellNumber, setCellNumber] = useState('')
  const [error, setError] = useState('')
  const { signIn } = useAuthSession()

  const handleRegister = async (e: React.FormEvent) => {

    e.preventDefault()

    const validationError = validateCredentials({
      email,
      password,
      required: [email, password, name, surname, cellNumber],
    })

    if (validationError) {
      setError(validationError)
      return
    }

    setError('')

    try {

      signIn({
        id: Date.now().toString(),
        email: email,
        name: name,
        surname: surname,
        cellNumber: cellNumber
      })
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

          <FormField
            label="Name:"
            className={styles['form-group']}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />

          <FormField
            label="Surname:"
            className={styles['form-group']}
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Enter your surname"
          />

          <FormField
            label="Email:"
            className={styles['form-group']}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <FormField
            label="Cell Number:"
            className={styles['form-group']}
            type="tel"
            value={cellNumber}
            onChange={(e) => setCellNumber(e.target.value)}
            placeholder="Enter your cell number"
          />

          <FormField
            label="Password:"
            className={styles['form-group']}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <button type='submit' className={styles['register-button']}>Register</button>
        </form>

        <p className={styles['login-link']}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>

    </div>

  )
}
