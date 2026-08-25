import reducer, {
  deleteShoppingList,
  filterShoppingLists,
  setError,
  setLoading,
  setSearchQuery,
  setShoppingList,
  setSortBy,
  sortShoppingLists,
  updateShoppingList,
} from '../shoppingListSlice'

const milk = {
  id: 'milk',
  name: 'Milk',
  quantity: 2,
  category: 'Food',
  userId: 'user-1',
  dateAdded: '2025-01-01T00:00:00.000Z',
}

const batteries = {
  id: 'batteries',
  name: 'Batteries',
  quantity: 4,
  category: 'Electronics',
  userId: 'user-1',
  dateAdded: '2025-01-03T00:00:00.000Z',
}

const apples = {
  id: 'apples',
  name: 'Apples',
  quantity: 6,
  category: 'Food',
  userId: 'user-1',
  dateAdded: '2025-01-02T00:00:00.000Z',
}

describe('shoppingListSlice', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
      filteredItems: [],
      loading: false,
      error: '',
      searchQuery: '',
      sortBy: 'date',
    })
  })

  it('adds an item to items and filteredItems', () => {
    const state = reducer(undefined, setShoppingList(milk))

    expect(state.items).toEqual([milk])
    expect(state.filteredItems).toEqual([milk])
  })

  it('updates a matching item in both collections', () => {
    const updatedMilk = { ...milk, quantity: 5 }
    const initialState = {
      items: [milk, batteries],
      filteredItems: [milk],
      loading: false,
      error: '',
      searchQuery: 'milk',
      sortBy: 'date',
    }

    const state = reducer(initialState, updateShoppingList(updatedMilk))

    expect(state.items).toContainEqual(updatedMilk)
    expect(state.filteredItems).toEqual([updatedMilk])
  })

  it('updates items without adding to filteredItems when the item is not filtered', () => {
    const updatedBatteries = { ...batteries, quantity: 8 }
    const initialState = {
      items: [milk, batteries],
      filteredItems: [milk],
      loading: false,
      error: '',
      searchQuery: 'milk',
      sortBy: 'date',
    }

    const state = reducer(initialState, updateShoppingList(updatedBatteries))

    expect(state.items).toContainEqual(updatedBatteries)
    expect(state.filteredItems).toEqual([milk])
  })

  it('ignores updates for unknown ids', () => {
    const initialState = reducer(undefined, setShoppingList(milk))
    const state = reducer(initialState, updateShoppingList({ ...batteries, id: 'unknown' }))

    expect(state).toEqual(initialState)
  })

  it('deletes an item from both collections', () => {
    const state = reducer(
      {
        items: [milk, batteries],
        filteredItems: [batteries, milk],
        loading: false,
        error: '',
        searchQuery: '',
        sortBy: 'date',
      },
      deleteShoppingList(milk.id),
    )

    expect(state.items).toEqual([batteries])
    expect(state.filteredItems).toEqual([batteries])
  })

  it('sets a search query and filters case-insensitively by name', () => {
    let state = reducer(
      {
        items: [milk, batteries, apples],
        filteredItems: [milk, batteries, apples],
        loading: false,
        error: '',
        searchQuery: '',
        sortBy: 'date',
      },
      setSearchQuery('MIL'),
    )
    state = reducer(state, filterShoppingLists())

    expect(state.searchQuery).toBe('MIL')
    expect(state.filteredItems).toEqual([milk])
  })

  it('resets filteredItems to all items for an empty query', () => {
    const state = reducer(
      {
        items: [milk, batteries],
        filteredItems: [milk],
        loading: false,
        error: '',
        searchQuery: '',
        sortBy: 'date',
      },
      filterShoppingLists(),
    )

    expect(state.filteredItems).toEqual([milk, batteries])
  })

  it('sets sortBy and sorts by name, category, and newest date', () => {
    const initialState = {
      items: [milk, batteries, apples],
      filteredItems: [milk, batteries, apples],
      loading: false,
      error: '',
      searchQuery: '',
      sortBy: 'date',
    }

    let state = reducer(initialState, setSortBy('name'))
    state = reducer(state, sortShoppingLists())
    expect(state.filteredItems.map((item) => item.id)).toEqual(['apples', 'batteries', 'milk'])

    state = reducer(state, setSortBy('category'))
    state = reducer(state, sortShoppingLists())
    expect(state.filteredItems.map((item) => item.id)).toEqual(['batteries', 'apples', 'milk'])

    state = reducer(state, setSortBy('date'))
    state = reducer(state, sortShoppingLists())
    expect(state.filteredItems.map((item) => item.id)).toEqual(['batteries', 'apples', 'milk'])
  })

  it('does not reorder for an unknown sort option', () => {
    const initialState = {
      items: [milk, batteries],
      filteredItems: [milk, batteries],
      loading: false,
      error: '',
      searchQuery: '',
      sortBy: 'unknown',
    }

    expect(reducer(initialState, sortShoppingLists()).filteredItems).toEqual([milk, batteries])
  })

  it('sets loading and error state', () => {
    let state = reducer(undefined, setLoading(true))
    state = reducer(state, setError('Could not load lists'))

    expect(state.loading).toBe(true)
    expect(state.error).toBe('Could not load lists')
  })
})
