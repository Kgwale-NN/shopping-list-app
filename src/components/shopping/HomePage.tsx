import React, { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import { Settings } from 'lucide-react'
import ShoppingListCard from './ShoppingListCard'
import AddListForm from './AddListForm'
import type { ShoppingListItem } from '../../types/types'
import { filterAndSort } from '../../utils/shoppingList'
import styles from './HomePage.module.css'

const yesterday = new Date(Date.now() - 86400000).toISOString()

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  const [searchParams, setSearchParams] = useSearchParams()
  const [showAddForm, setShowAddForm] = useState(false)

  // Get search and sort from URL
  const searchQuery = searchParams.get('search') || ''
  const sortBy = searchParams.get('sort') || 'date'

  // Mock shopping list data (will be replaced with Redux state)
  const [shoppingLists, setShoppingLists] = useState<ShoppingListItem[]>([
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
    },
    {
      id: '3',
      name: 'Clothing',
      quantity: 3,
      notes: 'Need new clothes for winter',
      category: 'Clothing',
      userId: user?.id || '1',
      dateAdded: yesterday // Yesterday
    }
  ])

  // Filter and sort shopping lists
  const filteredAndSortedLists = useMemo(
    () => filterAndSort(shoppingLists, searchQuery, sortBy),
    [shoppingLists, searchQuery, sortBy]
  )

  const handleEdit = (id: string) => {
    console.log('Edit shopping list:', id)
    // Will implement edit functionality later
  }

  const handleDelete = (id: string) => {
    console.log('Delete shopping list:', id)
    // Will implement delete functionality later
  }

  const handleAddList = (newList: ShoppingListItem) => {
    setShoppingLists([...shoppingLists, newList])
    setShowAddForm(false)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value) {
      setSearchParams({ search: value, sort: sortBy })
    } else {
      setSearchParams({ sort: sortBy })
    }
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSearchParams({ search: searchQuery, sort: value })
  }

  return (
    <div className={styles['home-container']}>
      <div className={styles['home-header']}>
        <h1>Shopping Lists</h1>
        <div className={styles['user-info']}>
          <span>Welcome, {user?.name}</span>
          <button onClick={() => navigate('/settings')} className={styles['settings-button']}>
            <Settings size={24} />
          </button>
        </div>
      </div>

      <div className={styles['search-bar']}>
        <input
          type="text"
          placeholder="Search shopping lists..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles['search-input']}
        />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className={styles['sort-select']}
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
          <option value="category">Sort by Category</option>
        </select>
      </div>

      <div className={styles['add-button-container']}>
        <button onClick={() => setShowAddForm(true)} className={styles['add-button']}>
          + Add New List
        </button>
      </div>

      <div className={styles['shopping-lists-grid']}>
        {filteredAndSortedLists.length > 0 ? (
          filteredAndSortedLists.map((list) => (
            <ShoppingListCard
              key={list.id}
              shoppingList={list}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className={styles['empty-state']}>
            <p>No shopping lists found. {searchQuery ? 'Try a different search term.' : 'Create your first list!'}</p>
          </div>
        )}
      </div>

      {showAddForm && (
        <AddListForm
          onAdd={handleAddList}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  )
}

export default HomePage