import { setAuthenticated } from '../authSlice'
import store from '../store'

describe('store', () => {
  it('contains each slice with its initial state shape', () => {
    expect(store.getState()).toEqual({
      auth: {
        user: null,
        isAuthenticated: false,
        token: '',
      },
      profile: {
        data: null,
        loading: false,
        error: '',
      },
      shoppingList: {
        items: [],
        filteredItems: [],
        loading: false,
        error: '',
        searchQuery: '',
        sortBy: 'date',
      },
    })
  })

  it('updates the correct slice when dispatching an action', () => {
    store.dispatch(setAuthenticated(true))

    expect(store.getState().auth.isAuthenticated).toBe(true)
    expect(store.getState().profile).toEqual({
      data: null,
      loading: false,
      error: '',
    })
  })
})
