export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  cellNumber: string;
  password?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  surname: string;
  cellNumber: string;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
  category: string;
  image?: string;
  userId: string;
  dateAdded: string;
  isFavorite?: boolean
}
