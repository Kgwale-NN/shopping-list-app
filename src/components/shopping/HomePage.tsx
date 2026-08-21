import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { logout, setAuthenticated } from '../../redux/authSlice'
import styles from './HomePage.module.css'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setAuthenticated(false))
    navigate('/login')
  }

  return (
    <div className={styles['home-container']}>
      <div className={styles['home-header']}>
        <h1>Shopping Lists</h1>
        <div className={styles['user-info']}>
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout} className={styles['logout-button']}>Logout</button>
        </div>
      </div>

      <div className={styles['search-bar']}>
        <input
          type="text"
          placeholder="Search shopping lists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles['search-input']}
        />
      </div>

      <div className={styles['add-button-container']}>
        <button className={styles['add-button']}>+ Add New List</button>
      </div>

      <div className={styles['shopping-lists-grid']}>
        <div className={styles['empty-state']}>
          <p>No shopping lists yet. Create your first list!</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage