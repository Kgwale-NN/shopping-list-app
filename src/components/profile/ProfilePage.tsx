import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setUpdateProfile } from '../../redux/profileSlice'
import { ArrowLeft } from 'lucide-react'
import { useTransientMessage } from '../../hooks/useTransientMessage'
import { validatePasswordChange } from '../../utils/validation'
import FormField from '../ui/FormField'
import styles from './ProfilePage.module.css'

const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    surname: user?.surname || '',
    email: user?.email || '',
    cellNumber: user?.cellNumber || '',
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const { message, showMessage } = useTransientMessage()

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
    if (!isEditing) {
      setEditForm({
        name: user?.name || '',
        surname: user?.surname || '',
        email: user?.email || '',
        cellNumber: user?.cellNumber || '',
      })
    }
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Update the user profile
    const updatedProfile = {
      id: user?.id || '1',
      name: editForm.name,
      surname: editForm.surname,
      email: editForm.email,
      cellNumber: editForm.cellNumber,
    }

    dispatch(setUpdateProfile(updatedProfile))
    setIsEditing(false)
    showMessage('Profile updated successfully!')
  }

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationError = validatePasswordChange(
      passwordForm.newPassword,
      passwordForm.confirmPassword,
    )

    if (validationError) {
      showMessage(validationError)
      return
    }

    // In real app, you would verify current password first
    showMessage('Password updated successfully!')
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }

  const handleBackClick = () => {
    navigate('/settings')
  }

  return (
    <div className={styles['profile-container']}>
      <div className={styles['profile-card']}>
        <div className={styles['profile-header']}>
          <button onClick={handleBackClick} className={styles['back-button']}>
            <ArrowLeft size={24} />
          </button>
          <h1>My Profile</h1>
          <div className={styles['spacer']}></div>
        </div>

        {message && (
          <div className={styles['message']}>
            {message}
          </div>
        )}

        <div className={styles['profile-section']}>
          <div className={styles['section-header']}>
            <h2>Personal Information</h2>
            <button 
              onClick={handleEditToggle} 
              className={styles['edit-button']}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleProfileUpdate} className={styles['edit-form']}>
              <FormField
                label="Name:"
                className={styles['form-group']}
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                required
              />
              <FormField
                label="Surname:"
                className={styles['form-group']}
                type="text"
                value={editForm.surname}
                onChange={(e) => setEditForm({...editForm, surname: e.target.value})}
                required
              />
              <FormField
                label="Email:"
                className={styles['form-group']}
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                required
              />
              <FormField
                label="Cell Number:"
                className={styles['form-group']}
                type="tel"
                value={editForm.cellNumber}
                onChange={(e) => setEditForm({...editForm, cellNumber: e.target.value})}
                required
              />
              <div className={styles['form-actions']}>
                <button type="submit" className={styles['save-button']}>Save Changes</button>
              </div>
            </form>
          ) : (
            <div className={styles['profile-info']}>
              <div className={styles['info-item']}>
                <span className={styles['label']}>Name:</span>
                <span className={styles['value']}>{user?.name}</span>
              </div>
              <div className={styles['info-item']}>
                <span className={styles['label']}>Surname:</span>
                <span className={styles['value']}>{user?.surname}</span>
              </div>
              <div className={styles['info-item']}>
                <span className={styles['label']}>Email:</span>
                <span className={styles['value']}>{user?.email}</span>
              </div>
              <div className={styles['info-item']}>
                <span className={styles['label']}>Cell Number:</span>
                <span className={styles['value']}>{user?.cellNumber}</span>
              </div>
            </div>
          )}
        </div>

        <div className={styles['profile-section']}>
          <h2>Change Password</h2>
          <form onSubmit={handlePasswordUpdate} className={styles['password-form']}>
            <FormField
              label="Current Password:"
              className={styles['form-group']}
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
              required
            />
            <FormField
              label="New Password:"
              className={styles['form-group']}
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
              required
            />
            <FormField
              label="Confirm New Password:"
              className={styles['form-group']}
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
              required
            />
            <div className={styles['form-actions']}>
              <button type="submit" className={styles['save-button']}>Update Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage