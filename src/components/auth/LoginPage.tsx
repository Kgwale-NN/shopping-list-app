import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { useAuthSession } from '../../hooks/useAuthSession'
import { validateCredentials } from '../../utils/validation'
import FormField from '../ui/FormField'
import styles from './LoginPage.module.css'

export const LoginPage:React.FC = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const { signIn } = useAuthSession()

    const handleLogin = async (e: React.FormEvent) => {

        e.preventDefault()

        const validationError = validateCredentials({ required: [email, password] })

        if(validationError){

           setError(validationError)
           return
        }

        setError('')

        try{

            // I need to replace this with he actual API call.

            signIn({
                id: '1',
                email: email,
                name: 'Test',
                surname: 'User',
                cellNumber : '1234567890'
            })
        }catch{

            setError('Login failed. please try again')
        }
    }


  return (

    <div className={styles['login-container']}>


      <div className={styles['login-card']}>

      <h2>Login</h2>
      {error && <div className={styles['error-message']}>{error}</div>}

      <form onSubmit={handleLogin}>

          <FormField
            label="Email"
            className={styles['form-group']}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          />

          <FormField
            label="Password"
            className={styles['form-group']}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />

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
