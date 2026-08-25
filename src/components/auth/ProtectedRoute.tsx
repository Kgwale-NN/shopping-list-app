import React from 'react'
import RouteGuard from './RouteGuard'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => (
  <RouteGuard requireAuth redirectTo="/login">
    {children}
  </RouteGuard>
)

export default ProtectedRoute
