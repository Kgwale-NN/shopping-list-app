import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { logout, setAuthenticated } from '../../redux/authSlice'
import { User, LogOut, ArrowLeft, ChevronRight, UserPlus, Sun, Globe, Heart } from 'lucide-react'
import styles from './SettingsPage.module.css'

const SettingsPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [theme, setTheme] = useState('Light')

  const handleProfileClick = () => {
    navigate('/profile')
  }

  const handleAddAccountClick = () => {
    console.log('Add Account clicked')
    // Will implement add account functionality later
  }

  const handleThemeClick = () => {
    setTheme(theme === 'Light' ? 'Dark' : 'Light')
    // Will implement theme toggle functionality later
  }

  const handleLanguageClick = () => {
    console.log('Language & Translation clicked')
    // Will implement language selection functionality later
  }

  const handleFavouritesClick = () => {
    console.log('Favourites clicked')
    // Will implement favourites functionality later
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

            <div 
              className={styles['settings-item']}
              onClick={handleAddAccountClick}
            >
              <div className={styles['item-left']}>
                <div className={styles['item-icon']}>
                  <UserPlus size={20} />
                </div>
                <span className={styles['item-label']}>Add Account</span>
              </div>
              <ChevronRight size={20} className={styles['item-arrow']} />
            </div>
          </div>

          <div className={styles['settings-section']}>
            <h2 className={styles['section-title']}>Preferences</h2>
            
            <div 
              className={styles['settings-item']}
              onClick={handleThemeClick}
            >
              <div className={styles['item-left']}>
                <div className={styles['item-icon']}>
                  <Sun size={20} />
                </div>
                <div className={styles['item-content']}>
                  <span className={styles['item-label']}>Theme</span>
                  <span className={styles['item-sublabel']}>{theme}</span>
                </div>
              </div>
              <ChevronRight size={20} className={styles['item-arrow']} />
            </div>

            <div 
              className={styles['settings-item']}
              onClick={handleLanguageClick}
            >
              <div className={styles['item-left']}>
                <div className={styles['item-icon']}>
                  <Globe size={20} />
                </div>
                <span className={styles['item-label']}>Language & Translation</span>
              </div>
              <ChevronRight size={20} className={styles['item-arrow']} />
            </div>

            <div 
              className={styles['settings-item']}
              onClick={handleFavouritesClick}
            >
              <div className={styles['item-left']}>
                <div className={styles['item-icon']}>
                  <Heart size={20} />
                </div>
                <span className={styles['item-label']}>Favourites</span>
              </div>
              <ChevronRight size={20} className={styles['item-arrow']} />
            </div>
          </div>

          <div className={styles['settings-section']}>
            <h2 className={styles['section-title']}>Session</h2>
            
            <div 
              className={styles['settings-item'] + ' ' + styles['settings-item-destructive']}
              onClick={handleLogoutClick}
            >
              <div className={styles['item-left']}>
                <div className={styles['item-icon'] + ' ' + styles['item-icon-destructive']}>
                  <LogOut size={20} />
                </div>
                <span className={styles['item-label'] + ' ' + styles['item-label-destructive']}>Logout</span>
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