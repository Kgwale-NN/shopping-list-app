import { useEffect, useRef, useState } from 'react'

const DEFAULT_DURATION = 3000

/**
 * Message state that clears itself after `duration` milliseconds.
 */
export const useTransientMessage = (duration: number = DEFAULT_DURATION) => {
  const [message, setMessage] = useState('')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const showMessage = (value: string) => {
    setMessage(value)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => setMessage(''), duration)
  }

  return { message, showMessage }
}
