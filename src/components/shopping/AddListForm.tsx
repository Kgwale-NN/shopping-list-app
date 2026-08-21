import React, { useState } from 'react'
import { type ShoppingListItem } from '../../types/types'
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

  const categories = ['Food', 'Electronics', 'Clothing', 'Home', 'Other']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name) {
      alert('Please enter a name for the shopping list')
      return
    }

    const newItem: ShoppingListItem = {
      id: Date.now().toString(),
      name,
      quantity,
      notes,
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
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={styles['form-container']}>
      <div className={styles['form-card']}>
        <h2>Add New Shopping List</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <label>Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter shopping list name"
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
            />
          </div>

          <div className={styles['form-group']}>
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
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