import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import shoppingListReducer from './shoppingListSlice';

// Create the Redux store with all reducers

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    shoppingLists: shoppingListReducer,
  },
});

// Export types for use in hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;