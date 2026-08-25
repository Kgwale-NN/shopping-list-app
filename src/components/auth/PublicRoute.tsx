import React from 'react'
import RouteGuard from './RouteGuard'

interface PublicRouteProps {
  children: React.ReactNode
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => (
  <RouteGuard requireAuth={false} redirectTo="/home">
    {children}
  </RouteGuard>
)

export default PublicRoute
