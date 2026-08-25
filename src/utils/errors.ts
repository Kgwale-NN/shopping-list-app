// Helpers for turning unknown thrown values into something usable.

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    return error.message
  }

  if (typeof error === 'string' && error) {
    return error
  }

  return 'An unexpected error occurred'
}

// Logs the error with context and returns a message suitable for the UI.
export const reportError = (context: string, error: unknown, fallback: string): string => {
  console.error(`${context}:`, error)
  return error === undefined || error === null ? fallback : getErrorMessage(error)
}
