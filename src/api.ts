import axios from 'axios'
import type { RegisterData, ShoppingListItem, User } from './types/types'

const API_BASE_URL = 'http://localhost:3001'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
})

// User API
export const userApi = {
  login: async (email: string, password: string) => {
    const response = await api.get('/users', {
      params: { email, password }
    })
    return response.data[0] // Returns the user if found
  },

  register: async (userData: RegisterData) => {
    const response = await api.post('/users', userData)
    return response.data
  },

  getProfile: async (userId: string) => {
    const response = await api.get(`/users/${userId}`)
    return response.data
  },

  updateProfile: async (userId: string, userData: Partial<User>) => {
    const response = await api.patch(`/users/${userId}`, userData)
    return response.data
  },
}

// Shopping List API
export const shoppingListApi = {
  getAll: async (userId: string) => {
    const response = await api.get('/shoppingLists', {
      params: { userId }
    })
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get(`/shoppingLists/${id}`)
    return response.data
  },

  create: async (shoppingListData: Partial<ShoppingListItem>) => {
    const response = await api.post('/shoppingLists', shoppingListData)
    return response.data
  },

  update: async (id: string, shoppingListData: Partial<ShoppingListItem>) => {
    const response = await api.patch(`/shoppingLists/${id}`, shoppingListData)
    return response.data
  },

  delete: async (id: string) => {
    const response = await api.delete(`/shoppingLists/${id}`)
    return response.data
  },
}

export default api
