import { render, screen } from '@testing-library/react'
import HomePage from './page'

describe('HomePage', () => {
  it('renders Home Page text', () => {
    render(<HomePage />)
    expect(screen.getByText('Home Page')).toBeInTheDocument()
  })
})
