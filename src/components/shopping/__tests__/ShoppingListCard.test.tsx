import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ShoppingListCard from '../ShoppingListCard'
import type { ShoppingListItem } from '../../../types/types'

const item: ShoppingListItem = {
  id: 'item-1',
  name: 'Groceries',
  quantity: 3,
  category: 'Food',
  notes: 'Buy fresh produce',
  image: 'https://example.com/groceries.png',
  userId: 'user-1',
  dateAdded: '2025-01-01T00:00:00.000Z',
}

describe('ShoppingListCard', () => {
  it('renders item details, image, notes, and invokes edit and delete callbacks', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()
    const onDelete = vi.fn()

    render(<ShoppingListCard shoppingList={item} onEdit={onEdit} onDelete={onDelete} />)

    expect(screen.getByRole('heading', { name: 'Groceries' })).toBeInTheDocument()
    expect(screen.getByText('Food')).toBeInTheDocument()
    expect(screen.getByText('Qty: 3')).toBeInTheDocument()
    expect(screen.getByText('Buy fresh produce')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Groceries' })).toHaveAttribute(
      'src',
      item.image,
    )

    await user.click(screen.getByRole('button', { name: 'Edit' }))
    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(onEdit).toHaveBeenCalledWith('item-1')
    expect(onDelete).toHaveBeenCalledWith('item-1')
  })

  it('does not render optional image or notes when they are absent', () => {
    const { container } = render(
      <ShoppingListCard
        shoppingList={{ ...item, image: undefined, notes: undefined }}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    )

    expect(container.querySelector('img')).not.toBeInTheDocument()
    expect(screen.queryByText('Buy fresh produce')).not.toBeInTheDocument()
  })
})
