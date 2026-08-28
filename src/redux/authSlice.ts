import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define the user

interface User {

   id: string,
   email: string,
   name: string,
   surname: string,
   cellNumber: string
}

// Define authentication state type

interface AuthState {

   user: User | null,
   isAuthenticated: boolean,
   token: string

}

// define the initial state

const getInitialAuthState = (): AuthState => {
   const savedAuth = localStorage.getItem('shopping-list-auth')

   if (!savedAuth) {
      return {
         user: null,
         isAuthenticated: false,
         token: '',
      }
   }

   try {
      return JSON.parse(savedAuth) as AuthState
   } catch {
      localStorage.removeItem('shopping-list-auth')

      return {
         user: null,
         isAuthenticated: false,
         token: '',
      }
   }
}

const initialState: AuthState = getInitialAuthState()

const authSlice = createSlice({

   name: 'auth',
   initialState,
   reducers: {

      // set user data

      setUser: (state, action: PayloadAction<User>) => {

         state.user = action.payload
      },

      // set authentication token

      setToken: (state, action: PayloadAction<string>) => {

         state.token = action.payload

      },

      // set authentication status

      setAuthenticated: (state, action: PayloadAction<boolean>) => {

         state.isAuthenticated = action.payload

      },

      // log user out

      logout: (state) => {

         state.user = null
         state.isAuthenticated = false
         state.token = ''

      }


   }
})

export const { setUser, setToken, setAuthenticated, logout } = authSlice.actions
export default authSlice.reducer

