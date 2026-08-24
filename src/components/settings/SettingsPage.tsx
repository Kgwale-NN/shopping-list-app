import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { logout, setAuthenticated } from '../../redux/authSlice'
import { User, LogOut, ArrowLeft, ChevronRight } from 'lucide-react'
import styles from './SettingsPage.module.css'

const SettingsPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleProfileClick = () => {

    navigate('/profile')

  }

  const handleLogoutClick = () => {
    setShowLogoutDialog(true)
  }

  const handleLogoutConfirm = () => {
    dispatch(logout())
    dispatch(setAuthenticated(false))
    navigate('/login')

  }

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false)
  }

  const handleBackClick = () => {

    navigate('/home')

  }

  return (
    
    <div className={styles['settings-container']}>
      <div className={styles['settings-card']}>
        <div className={styles['settings-header']}>
          <button onClick={handleBackClick} className={styles['back-button']}>
            <ArrowLeft size={24} />
          </button>
          <h1>Settings</h1>
          <div className={styles['spacer']}></div>
        </div>

        <div className={styles['settings-content']}>
          <div className={styles['settings-section']}>
            <h2 className={styles['section-title']}>Account</h2>
            
            <div 
              className={styles['settings-item']}
              onClick={handleProfileClick}
            >
              <div className={styles['item-left']}>
                <div className={styles['item-icon']}>
                  <User size={20} />
                </div>
                <span className={styles['item-label']}>Profile</span>
              </div>
              <ChevronRight size={20} className={styles['item-arrow']} />
            </div>
          </div>

          <div className={styles['settings-section']}>
            <h2 className={styles['section-title']}>Session</h2>
            
            <div 
              className={styles['settings-item']}
              onClick={handleLogoutClick}
            >
              <div className={styles['item-left']}>
                <div className={styles['item-icon']}>
                  <LogOut size={20} />
                </div>
                <span className={styles['item-label']}>Logout</span>
              </div>
              <ChevronRight size={20} className={styles['item-arrow']} />
            </div>
          </div>
        </div>
      </div>

      {showLogoutDialog && (
        <div className={styles['dialog-overlay']}>
          <div className={styles['dialog']}>
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className={styles['dialog-actions']}>
              <button 
                onClick={handleLogoutCancel} 
                className={styles['dialog-cancel']}
              >
                Cancel
              </button>
              <button 
                onClick={handleLogoutConfirm} 
                className={styles['dialog-confirm']}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsPage