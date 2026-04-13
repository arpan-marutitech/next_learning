import { render, screen } from '@testing-library/react'
import HomePage from './page'

jest.mock('./components/AuthPanel', () => function MockAuthPanel() {
  return <div data-testid="auth-panel" />
})

describe('HomePage', () => {
  it('renders Home Page text', () => {
    render(<HomePage />)
    expect(screen.getByText('Home Page')).toBeInTheDocument()
  })
})
