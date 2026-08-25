import { render, screen } from '@testing-library/react'
import { text } from '../text'

describe('text', () => {
  it('renders the text content', () => {
    render(text())

    expect(screen.getByText('text')).toBeInTheDocument()
  })
})
