import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
import PublicRoute from '../PublicRoute'
import { createTestStore } from '../../../test/testUtils'

const renderRoutes = (
  routeElement: React.ReactElement,
  isAuthenticated: boolean,
) => {
  const store = createTestStore({
    auth: {
      user: null,
      isAuthenticated,
      token: isAuthenticated ? 'token-123' : '',
    },
  })

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/current']}>
        <Routes>
          <Route path="/current" element={routeElement} />
          <Route path="/login" element={<div>Login target</div>} />
          <Route path="/home" element={<div>Home target</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  )
}

describe('ProtectedRoute', () => {
  it('redirects unauthenticated users to login without rendering children', () => {
    renderRoutes(
      <ProtectedRoute>
        <div>Protected content</div>
      </ProtectedRoute>,
      false,
    )

    expect(screen.getByText('Login target')).toBeInTheDocument()
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument()
  })

  it('renders children for authenticated users', () => {
    renderRoutes(
      <ProtectedRoute>
        <div>Protected content</div>
      </ProtectedRoute>,
      true,
    )

    expect(screen.getByText('Protected content')).toBeInTheDocument()
    expect(screen.queryByText('Login target')).not.toBeInTheDocument()
  })
})

describe('PublicRoute', () => {
  it('redirects authenticated users to home without rendering children', () => {
    renderRoutes(
      <PublicRoute>
        <div>Public content</div>
      </PublicRoute>,
      true,
    )

    expect(screen.getByText('Home target')).toBeInTheDocument()
    expect(screen.queryByText('Public content')).not.toBeInTheDocument()
  })

  it('renders children for unauthenticated users', () => {
    renderRoutes(
      <PublicRoute>
        <div>Public content</div>
      </PublicRoute>,
      false,
    )

    expect(screen.getByText('Public content')).toBeInTheDocument()
    expect(screen.queryByText('Home target')).not.toBeInTheDocument()
  })
})
