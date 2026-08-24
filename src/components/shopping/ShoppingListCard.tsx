import React from 'react'
import { type ShoppingListItem } from '../../types/types'
import styles from './ShoppingListCard.module.css'

interface ShoppingListCardProps {
  shoppingList: ShoppingListItem
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const ShoppingListCard: React.FC<ShoppingListCardProps> = ({ shoppingList, onEdit, onDelete }) => {
  return (
    <div className={styles['card']}>
      {shoppingList.image && (
        <div className={styles['card-image']}>
          <img src={shoppingList.image} alt={shoppingList.name} />
        </div>
      )}
      <div className={styles['card-content']}>
        <h3 className={styles['card-title']}>{shoppingList.name}</h3>
        <div className={styles['card-details']}>
          <span className={styles['card-category']}>{shoppingList.category}</span>
          <span className={styles['card-quantity']}>Qty: {shoppingList.quantity}</span>
        </div>
        {shoppingList.notes && (
          <p className={styles['card-notes']}>{shoppingList.notes}</p>
        )}
        <div className={styles['card-actions']}>
          <button onClick={ () => onEdit(shoppingList.id)} className={styles['edit-button']}>
            Edit
          </button>
          <button onClick={() => onDelete(shoppingList.id)} className={styles['delete-button']}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShoppingListCard