import React,{useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {useAppDispatch} from '../../redux/hooks'
import { setUser, setToken, setAuthenticated } from '../../redux/authSlice'
import { userApi } from '../../api'
import styles from './LoginPage.module.css'

export const LoginPage:React.FC = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {

        e.preventDefault()
        setError('')

        if(!email || !password){

           setError('please fill in all fields') 
           return
        }

        try{

            const user = await userApi.login(email, password)

            if (!user) {
              setError('Invalid email or password')
              return
            }

            dispatch(setUser(user))
            dispatch(setToken('json-server-session'))
            dispatch(setAuthenticated(true))
            navigate('/home')
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