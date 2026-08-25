import { Component, type ErrorInfo, type ReactNode } from 'react'
import { getErrorMessage } from '../utils/errors'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled rendering error:', error, errorInfo.componentStack)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.error) {
      return (
        <div role="alert" style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <p>{getErrorMessage(this.state.error)}</p>
          <button onClick={this.handleReload}>Reload the app</button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
