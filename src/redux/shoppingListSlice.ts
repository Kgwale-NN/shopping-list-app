import { createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type { ShoppingListItem } from "../types/types";
import { filterByName, sortItems } from "../utils/shoppingList";

interface ShoppingListState{

    items: ShoppingListItem[],
    filteredItems: ShoppingListItem[],
    loading: boolean,
    error: string,
    searchQuery: string,
    sortBy: string
}

const initialState : ShoppingListState = {

items: [],
filteredItems: [],
loading: false,
error: '',
searchQuery: '',
sortBy: 'date'

}

const shoppingListSlice = createSlice ({


    name: 'shoppingList',
    initialState,
    reducers :{

        setShoppingList: (state,action:PayloadAction<ShoppingListItem>) =>{

            state.items.push(action.payload)
            state.filteredItems.push(action.payload)

        },

        updateShoppingList: (state,action:PayloadAction<ShoppingListItem>) =>{


            const index = state.items.findIndex(item => item.id === action.payload.id)

            if(index !== -1){

                state.items[index] = action.payload

                const filteredIndex = state.filteredItems.findIndex(item => item.id === action.payload.id)

                if(filteredIndex !== -1){

                    state.filteredItems[filteredIndex] = action.payload
                }
            }
        },

 // Delete shopping list

    deleteShoppingList: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.filteredItems = state.filteredItems.filter(item => item.id !== action.payload);
    },

    // Set search query

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    // Filter shopping lists

    filterShoppingLists: (state) => {
      state.filteredItems = filterByName(state.items, state.searchQuery);
    },

    // Set sort option

    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },

    // Sort shopping lists

    sortShoppingLists: (state) => {
      state.filteredItems = sortItems(state.filteredItems, state.sortBy);
    },

    // Set loading state

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error message

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

  },

});

// Export actions and reducer

export const {
  setShoppingList,
  updateShoppingList,
  deleteShoppingList,
  setSearchQuery,
  filterShoppingLists,
  setSortBy,
  sortShoppingLists,
  setLoading,
  setError,
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
