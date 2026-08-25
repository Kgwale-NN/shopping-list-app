import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'

interface RouteGuardProps {
  children: React.ReactNode
  requireAuth: boolean
  redirectTo: string
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, requireAuth, redirectTo }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  if (isAuthenticated !== requireAuth) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}

export default RouteGuard
