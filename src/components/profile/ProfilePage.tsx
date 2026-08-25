import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setUpdateProfile } from '../../redux/profileSlice'
import { ArrowLeft } from 'lucide-react'
import { validateCellNumber, validateEmail, validateName, validatePassword } from '../../utils/validation'
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
  const [message, setMessage] = useState('')

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

    const validationError =
      validateName(editForm.name, 'Name') ??
      validateName(editForm.surname, 'Surname') ??
      validateEmail(editForm.email) ??
      validateCellNumber(editForm.cellNumber)

    if (validationError) {
      setMessage(validationError)
      return
    }

    const updatedProfile = {
      id: user?.id || '1',
      name: editForm.name.trim(),
      surname: editForm.surname.trim(),
      email: editForm.email.trim(),
      cellNumber: editForm.cellNumber.trim(),
    }

    dispatch(setUpdateProfile(updatedProfile))
    setIsEditing(false)
    setMessage('Profile updated successfully!')
    
    setTimeout(() => setMessage(''), 3000)
  }

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!passwordForm.currentPassword) {
      setMessage('Please enter your current password')
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    const passwordError = validatePassword(passwordForm.newPassword)

    if (passwordError) {
      setMessage(passwordError)
      return
    }

    if (passwordForm.newPassword === passwordForm.currentPassword) {
      setMessage('New password must be different from the current password')
      return
    }

    // The current password can only be verified server side, so nothing is
    // changed until an authentication API is available.
    setMessage('Password changes are not available yet')
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    
    setTimeout(() => setMessage(''), 3000)
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
              <div className={styles['form-group']}>
                <label>Name:</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  maxLength={100}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label>Surname:</label>
                <input
                  type="text"
                  value={editForm.surname}
                  onChange={(e) => setEditForm({...editForm, surname: e.target.value})}
                  maxLength={100}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label>Email:</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  maxLength={100}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label>Cell Number:</label>
                <input
                  type="tel"
                  value={editForm.cellNumber}
                  onChange={(e) => setEditForm({...editForm, cellNumber: e.target.value})}
                  maxLength={20}
                  required
                />
              </div>
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
            <div className={styles['form-group']}>
              <label>Current Password:</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                autoComplete="current-password"
                maxLength={128}
                required
              />
            </div>
            <div className={styles['form-group']}>
              <label>New Password:</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                autoComplete="new-password"
                maxLength={128}
                required
              />
            </div>
            <div className={styles['form-group']}>
              <label>Confirm New Password:</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                autoComplete="new-password"
                maxLength={128}
                required
              />
            </div>
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