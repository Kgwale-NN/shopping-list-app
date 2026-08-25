import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import profileReducer from './profileSlice'
import shoppingListReducer from './shoppingListSlice'

// Create the redux store with all the reducers

const store = configureStore({

    reducer : {

        auth: authReducer,
        profile: profileReducer,
        shoppingList: shoppingListReducer
    },
    // Keep the state (including the auth token) out of the Redux devtools
    // extension in production builds.
    devTools: import.meta.env.DEV
})

// Export types for use in hooks

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store


