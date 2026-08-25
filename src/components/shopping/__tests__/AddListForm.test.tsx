import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddListForm from '../AddListForm'

describe('AddListForm', () => {
  it('submits typed values and resets the fields', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()

    render(<AddListForm onAdd={onAdd} onCancel={vi.fn()} />)
    const nameInput = screen.getByPlaceholderText('Enter shopping list name')
    const quantityInput = screen.getByRole('spinbutton')
    const categorySelect = screen.getByRole('combobox')
    const notesInput = screen.getByPlaceholderText('Add any notes (optional)')

    await user.type(nameInput, 'Weekend shopping')
    await user.clear(quantityInput)
    await user.type(quantityInput, '4')
    await user.selectOptions(categorySelect, 'Home')
    await user.type(notesInput, 'Remember reusable bags')
    await user.click(screen.getByRole('button', { name: 'Add List' }))

    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Weekend shopping',
      quantity: 4,
      category: 'Home',
      notes: 'Remember reusable bags',
    }))
    expect(nameInput).toHaveValue('')
    expect(quantityInput).toHaveValue(1)
    expect(categorySelect).toHaveValue('Food')
    expect(notesInput).toHaveValue('')
  })

  it('alerts and does not submit when the name is empty', () => {
    const onAdd = vi.fn()
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => undefined)

    const { container } = render(<AddListForm onAdd={onAdd} onCancel={vi.fn()} />)
    fireEvent.submit(container.querySelector('form')!)

    expect(alert).toHaveBeenCalledWith('Please enter a name for the shopping list')
    expect(onAdd).not.toHaveBeenCalled()
    alert.mockRestore()
  })

  it('calls onCancel when cancel is clicked', async () => {
    const onCancel = vi.fn()
    const user = userEvent.setup()

    render(<AddListForm onAdd={vi.fn()} onCancel={onCancel} />)
    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onCancel).toHaveBeenCalledOnce()
  })

  it('shows a preview after an image is uploaded', async () => {
    const user = userEvent.setup()
    const file = new File(['image contents'], 'shopping.png', { type: 'image/png' })

    const { container } = render(<AddListForm onAdd={vi.fn()} onCancel={vi.fn()} />)
    await user.upload(container.querySelector('input[type="file"]')!, file)

    await waitFor(() => {
      expect(screen.getByRole('img', { name: 'Preview' })).toHaveAttribute(
        'src',
        expect.stringContaining('data:image/png'),
      )
    })
  })
})
