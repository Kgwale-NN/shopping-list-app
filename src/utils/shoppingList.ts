import type { ShoppingListItem } from '../types/types'

export type SortOption = 'date' | 'name' | 'category'

export const filterByName = (
  items: ShoppingListItem[],
  searchQuery: string,
): ShoppingListItem[] => {
  if (!searchQuery) {
    return items
  }

  const query = searchQuery.toLowerCase()

  return items.filter((item) => item.name.toLowerCase().includes(query))
}

export const sortItems = (
  items: ShoppingListItem[],
  sortBy: string,
): ShoppingListItem[] => {
  const sorted = [...items]

  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'category':
      return sorted.sort((a, b) => a.category.localeCompare(b.category))
    case 'date':
      return sorted.sort(
        (a, b) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
      )
    default:
      return sorted
  }
}

export const filterAndSort = (
  items: ShoppingListItem[],
  searchQuery: string,
  sortBy: string,
): ShoppingListItem[] => sortItems(filterByName(items, searchQuery), sortBy)
