import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { logout, setAuthenticated } from '../../redux/authSlice'
import ShoppingListCard from './ShoppingListCard'
import styles from './HomePage.module.css'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const [searchQuery, setSearchQuery] = useState('')

  // Mock shopping list data (will be replaced with Redux state)
  const mockShoppingLists = [
    {
      id: '1',
      name: 'Groceries',
      quantity: 5,
      notes: 'Weekly grocery shopping',
      category: 'Food',
      userId: user?.id || '1',
      dateAdded: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Electronics',
      quantity: 2,
      notes: 'Need new headphones and charger',
      category: 'Electronics',
      userId: user?.id || '1',
      dateAdded: new Date().toISOString()
    }
  ]

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setAuthenticated(false))
    navigate('/login')
  }

  const handleEdit = (id: string) => {
    console.log('Edit shopping list:', id)
    // Will implement edit functionality later
  }

  const handleDelete = (id: string) => {
    console.log('Delete shopping list:', id)
    // Will implement delete functionality later
  }

  return (
    <div className={styles['home-container']}>
      <div className={styles['home-header']}>
        <h1>Shopping Lists</h1>
        <div className={styles['user-info']}>
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout} className={styles['logout-button']}>Logout</button>
        </div>
      </div>

      <div className={styles['search-bar']}>
        <input
          type="text"
          placeholder="Search shopping lists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles['search-input']}
        />
      </div>

      <div className={styles['add-button-container']}>
        <button className={styles['add-button']}>+ Add New List</button>
      </div>

      <div className={styles['shopping-lists-grid']}>
        {mockShoppingLists.map((list) => (
          <ShoppingListCard
            key={list.id}
            shoppingList={list}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default HomePage