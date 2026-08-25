import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/authSlice'
import profileReducer from '../redux/profileSlice'
import shoppingListReducer from '../redux/shoppingListSlice'
import type { RootState } from '../redux/store'

export const createTestStore = (preloadedState: Partial<RootState> = {}) =>
  configureStore({
    reducer: {
      auth: authReducer,
      profile: profileReducer,
      shoppingList: shoppingListReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        isAuthenticated: false,
        token: '',
        ...preloadedState.auth,
      },
      profile: {
        data: null,
        loading: false,
        error: '',
        ...preloadedState.profile,
      },
      shoppingList: {
        items: [],
        filteredItems: [],
        loading: false,
        error: '',
        searchQuery: '',
        sortBy: 'date',
        ...preloadedState.shoppingList,
      },
    },
  })
