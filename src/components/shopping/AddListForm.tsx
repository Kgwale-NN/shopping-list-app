import React, { useState } from 'react'
import { type ShoppingListItem } from '../../types/types'
import {
  ALLOWED_IMAGE_TYPES,
  MAX_NOTES_LENGTH,
  MAX_QUANTITY,
  MAX_TEXT_LENGTH,
  validateImageFile,
  validateQuantity,
} from '../../utils/validation'
import styles from './AddListForm.module.css'

interface AddListFormProps {
  onAdd: (item: ShoppingListItem) => void
  onCancel: () => void
}

const AddListForm: React.FC<AddListFormProps> = ({ onAdd, onCancel }) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')
  const [category, setCategory] = useState('Food')
  const [image, setImage] = useState('')
  const [error, setError] = useState('')

  const categories = ['Food', 'Electronics', 'Clothing', 'Home', 'Other']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setError('')

    const trimmedName = name.trim()

    if (!trimmedName) {
      setError('Please enter a name for the shopping list')
      return
    }

    if (trimmedName.length > MAX_TEXT_LENGTH) {
      setError(`Name must be at most ${MAX_TEXT_LENGTH} characters`)
      return
    }

    const quantityError = validateQuantity(quantity)

    if (quantityError) {
      setError(quantityError)
      return
    }

    if (!categories.includes(category)) {
      setError('Please choose a valid category')
      return
    }

    const newItem: ShoppingListItem = {
      id: crypto.randomUUID(),
      name: trimmedName,
      quantity,
      notes: notes.trim(),
      category,
      image,
      userId: '1', // Will be replaced with actual user ID
      dateAdded: new Date().toISOString()
    }

    onAdd(newItem)
    
    // Reset form
    setName('')
    setQuantity(1)
    setNotes('')
    setCategory('Food')
    setImage('')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    const imageError = validateImageFile(file)

    if (imageError) {
      setError(imageError)
      e.target.value = ''
      setImage('')
      return
    }

    setError('')

    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(typeof reader.result === 'string' ? reader.result : '')
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className={styles['form-container']}>
      <div className={styles['form-card']}>
        <h2>Add New Shopping List</h2>
        {error && <div className={styles['error-message']}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <label>Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter shopping list name"
              maxLength={MAX_TEXT_LENGTH}
              required
            />
          </div>

          <div className={styles['form-group']}>
            <label>Quantity *</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              max={MAX_QUANTITY}
              step="1"
              required
            />
          </div>

          <div className={styles['form-group']}>
            <label>Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className={styles['form-group']}>
            <label>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes (optional)"
              rows={3}
              maxLength={MAX_NOTES_LENGTH}
            />
          </div>

          <div className={styles['form-group']}>
            <label>Image</label>
            <input
              type="file"
              accept={ALLOWED_IMAGE_TYPES.join(',')}
              onChange={handleImageUpload}
            />
            {image && (
              <div className={styles['image-preview']}>
                <img src={image} alt="Preview" />
              </div>
            )}
          </div>

          <div className={styles['form-actions']}>
            <button type="button" onClick={onCancel} className={styles['cancel-button']}>
              Cancel
            </button>
            <button type="submit" className={styles['submit-button']}>
              Add List
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddListForm