import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch,useAppSelector } from '../../redux/hooks'
import { Heart, Settings } from 'lucide-react'
import ShoppingListCard from './ShoppingListCard'
import AddListForm from './AddListForm'
import EditListForm from './EditListForm'
import { shoppingListApi } from '../../api'
import type { ShoppingListItem } from '../../types/types'
import styles from './HomePage.module.css'
import { setShoppingLists,setShoppingList,updateShoppingList,deleteShoppingList} from '../../redux/shoppingListSlice'




const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const [searchParams, setSearchParams] = useSearchParams()
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingItem, setEditingItem] = useState<ShoppingListItem | null>(null)
  const [showFavoritesOnly , setShowFavoritesOnly] = useState(false)

  // Get search and sort from URL
  const searchQuery = searchParams.get('search') || ''
  const sortBy = searchParams.get('sort') || 'date'

  // Shopping list data from API
  const shoppingLists = useAppSelector((state) => state.shoppingList.items)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load shopping lists from API
  useEffect(() => {
    const loadShoppingLists = async () => {
      try {
        setLoading(true)
        const data = await shoppingListApi.getAll(user?.id || '1')
        dispatch( setShoppingLists(data))
        setError('')
      } catch (err) {
        setError('Failed to load shopping lists')
        console.error('Error loading shopping lists:', err)
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) {
      loadShoppingLists()
    }
  }, [user?.id])

  // Filter and sort shopping lists
  const filteredAndSortedLists = useMemo(() => {
    let filtered = [...shoppingLists]

    if(showFavoritesOnly) {

      filtered = filtered.filter(item => item.isFavorite)

    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category))
        break
      case 'date':
        filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
        break
      default:
        break
    }

    return filtered
  }, [shoppingLists, searchQuery, sortBy,showFavoritesOnly])

  const handleEdit = (id: string) => {
    const item = shoppingLists.find(list => list.id === id)
    if (item) {
      setEditingItem(item)
      setShowEditForm(true)
    }
  }

  const handleUpdate = async (id: string, updatedItem: Partial<ShoppingListItem>) => {
    try {
      // Remove image data for API call
      const { image, ...itemData } = updatedItem
      
      const updatedList = await shoppingListApi.update(id, itemData)
      
      // Add the image back locally
      const updatedListWithImage = {
        ...updatedList,
        image: image || ''
      }
      
      

      dispatch(updateShoppingList(updatedListWithImage))
      setShowEditForm(false)
      setEditingItem(null)
      setError('')
    } catch (err) {
      setError('Failed to update shopping list')
      console.error('Error updating shopping list:', err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await shoppingListApi.delete(id)
     deleteShoppingList(id)
    } catch (err) {
      setError('Failed to delete shopping list')
      console.error('Error deleting shopping list:', err)
    }
  }

  const handleAddList = async (newList: Partial<ShoppingListItem>) => {
    try {
      
      const listWithUserId = {
        ...newList,
        userId: user?.id || '1',
        dateAdded: new Date().toISOString()
      }
      const createdList = await shoppingListApi.create(listWithUserId)

      
      dispatch(setShoppingLists([createdList]))
      setShowAddForm(false)
      setError('')
    } catch (err) {
      setError('Failed to add shopping list.')
      console.error('Error adding shopping list:', err)
    }
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

        
      <div className={styles['search-bar']}>
        <input
          type="text"
          placeholder="Search shopping lists..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles['search-input']}
        />

        {shoppingLists.length > 1 && (

         <select
          value={sortBy}
          onChange={handleSortChange}
          className={styles['sort-select']}
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
          <option value="category">Sort by Category</option>
        </select>

        )}

      </div>

        <div className={styles['user-info']}>
          <span>Welcome, {user?.name}</span>

          <button
           onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
           className={styles['favorite-button']}
           aria-label="Show favorite shopping lists"
           title="Show favorite shopping lists"
      >

      <Heart
      size={24}
      fill={showFavoritesOnly ? 'currentColor' : 'none'}
      />

           </button>

          <button onClick={() => navigate('/settings')} className={styles['settings-button']}>
            <Settings size={24} />
          </button>
        </div>
        
      </div>


      <div className={styles['add-button-container']}>
        <button onClick={() => setShowAddForm(true)} className={styles['add-button']}>
          + Add New List
        </button>
      </div>

      {error && (
        <div className={styles['error-message']}>
          {error}
        </div>
      )}

      {loading ? (
        <div className={styles['loading-state']}>
          <p>Loading shopping lists...</p>
        </div>
      ) : (
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
      )}

      {showAddForm && (
        <AddListForm
          onAdd={handleAddList}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {showEditForm && editingItem && (
        <EditListForm
          shoppingList={editingItem}
          onUpdate={handleUpdate}
          onCancel={() => {
            setShowEditForm(false)
            setEditingItem(null)
          }}
        />
      )}
    </div>
  )
}

export default HomePage