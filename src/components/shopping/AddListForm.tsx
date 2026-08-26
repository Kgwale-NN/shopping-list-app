import React, { useState } from 'react'
import { type ShoppingListItem } from '../../types/types'
import styles from './AddListForm.module.css'
import { ImageAPI } from '../../api'

interface AddListFormProps {
  onAdd: (item: Partial<ShoppingListItem>) => void
  onCancel: () => void
}

const AddListForm: React.FC<AddListFormProps> = ({ onAdd, onCancel }) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')
  const [category, setCategory] = useState('Food')

  const categories = ['Food', 'Electronics', 'Clothing', 'Home', 'Other']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name) {
      alert('Please enter a name for the shopping list')
      return
    }

    const image = await ImageAPI.searchImage(name)

    const newItem: Partial<ShoppingListItem> = {
      name,
      quantity,
      notes,
      category,
      image
    }

    onAdd(newItem)
    
    // Reset form
    setName('')
    setQuantity(1)
    setNotes('')
    setCategory('Food')
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