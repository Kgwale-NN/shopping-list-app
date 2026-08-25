import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, LogOut, ArrowLeft, ChevronRight } from 'lucide-react'
import { useAuthSession } from '../../hooks/useAuthSession'
import styles from './SettingsPage.module.css'

interface SettingsItemProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, label, onClick }) => (
  <div className={styles['settings-item']} onClick={onClick}>
    <div className={styles['item-left']}>
      <div className={styles['item-icon']}>{icon}</div>
      <span className={styles['item-label']}>{label}</span>
    </div>
    <ChevronRight size={20} className={styles['item-arrow']} />
  </div>
)

const SettingsPage: React.FC = () => {
  const navigate = useNavigate()
  const { signOut } = useAuthSession()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleProfileClick = () => {

    navigate('/profile')

  }

  const handleLogoutClick = () => {
    setShowLogoutDialog(true)
  }

  const handleLogoutConfirm = () => {
    signOut()
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
            
            <SettingsItem
              icon={<User size={20} />}
              label="Profile"
              onClick={handleProfileClick}
            />
          </div>

          <div className={styles['settings-section']}>
            <h2 className={styles['section-title']}>Session</h2>
            
            <SettingsItem
              icon={<LogOut size={20} />}
              label="Logout"
              onClick={handleLogoutClick}
            />
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