import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// The shopping list item type

interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
  category: string;
  image?: string;
  userId: string;
  dateAdded: string;
}

// Shopping list state type

interface ShoppingListState {
  items: ShoppingListItem[];
  filteredItems: ShoppingListItem[];
  loading: boolean;
  error: string;
  searchQuery: string;
  sortBy: string;
}

// Initial state

const initialState: ShoppingListState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: '',
  searchQuery: '',
  sortBy: 'date',
};

// Create the shopping list slice

const shoppingListSlice = createSlice({
  name: 'shoppingLists',
  initialState,
  reducers: {

    // Set all shopping lists

    setShoppingLists: (state, action: PayloadAction<ShoppingListItem[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;

    },

    // A new shopping list was added

    addShoppingList: (state, action: PayloadAction<ShoppingListItem>) => {
      state.items.push(action.payload);
      state.filteredItems.push(action.payload);
    },

    // Update shopping list

    updateShoppingList: (state, action: PayloadAction<ShoppingListItem>) => {

      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        const filteredIndex = state.filteredItems.findIndex(item => item.id === action.payload.id);
        if (filteredIndex !== -1) {
          state.filteredItems[filteredIndex] = action.payload;
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
      if (state.searchQuery) {
        state.filteredItems = state.items.filter(item =>
          item.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      } else {
        state.filteredItems = state.items;
      }
    },

    // Set sort option

    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },

    // Sort shopping lists

    sortShoppingLists: (state) => {
      switch (state.sortBy) {
        case 'name':
          state.filteredItems.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'category':
          state.filteredItems.sort((a, b) => a.category.localeCompare(b.category));
          break;
        case 'date':
          state.filteredItems.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
          break;
        default:
          break;
      }

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
  setShoppingLists,
  addShoppingList,
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