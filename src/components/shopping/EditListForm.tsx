import React, { useState } from 'react'
import { type ShoppingListItem } from '../../types/types'
import styles from './EditListForm.module.css'
import { ImageAPI } from '../../api'

interface EditListFormProps {
  shoppingList: ShoppingListItem
  onUpdate: (id: string, item: Partial<ShoppingListItem>) => void
  onCancel: () => void
}

const EditListForm: React.FC<EditListFormProps> = ({ shoppingList, onUpdate, onCancel }) => {
  const [name, setName] = useState(shoppingList.name)
  const [quantity, setQuantity] = useState(shoppingList.quantity)
  const [notes, setNotes] = useState(shoppingList.notes || '')
  const [category, setCategory] = useState(shoppingList.category)

  const categories = ['Food', 'Electronics', 'Clothing', 'Home', 'Other']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name) {
      alert('Please enter a name for the shopping list')
      return
    }

    const image = name === shoppingList.name
    ? shoppingList.image || '' : await ImageAPI.searchImage(name)

    const updatedItem: Partial<ShoppingListItem> = {
      name,
      quantity,
      notes,
      category,
      image
    }

    onUpdate(shoppingList.id, updatedItem)
  }


  return (
    <div className={styles['form-container']}>
      <div className={styles['form-card']}>
        <h2>Edit Shopping List</h2>
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
              Update List
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditListForm
