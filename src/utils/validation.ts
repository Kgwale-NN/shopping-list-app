// Shared input validation used by the auth, profile and shopping list forms.

export const MAX_TEXT_LENGTH = 100
export const MAX_NOTES_LENGTH = 500
export const MAX_QUANTITY = 9999
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const CELL_NUMBER_PATTERN = /^\+?[0-9]{7,15}$/

export const validateEmail = (email: string): string | null => {
  const value = email.trim()
  if (!value) return 'Email is required'
  if (value.length > MAX_TEXT_LENGTH) return `Email must be at most ${MAX_TEXT_LENGTH} characters`
  if (!EMAIL_PATTERN.test(value)) return 'Please enter a valid email address'
  return null
}

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required'
  if (password.length < 8) return 'Password must be at least 8 characters'
  if (password.length > 128) return 'Password must be at most 128 characters'
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return 'Password must contain at least one letter and one number'
  }
  return null
}

export const validateName = (name: string, label: string): string | null => {
  const value = name.trim()
  if (!value) return `${label} is required`
  if (value.length > MAX_TEXT_LENGTH) return `${label} must be at most ${MAX_TEXT_LENGTH} characters`
  if (!/^[\p{L}\p{M}'\- ]+$/u.test(value)) return `${label} contains invalid characters`
  return null
}

export const validateCellNumber = (cellNumber: string): string | null => {
  const value = cellNumber.replace(/[\s()-]/g, '')
  if (!value) return 'Cell number is required'
  if (!CELL_NUMBER_PATTERN.test(value)) return 'Please enter a valid cell number'
  return null
}

export const validateQuantity = (quantity: number): string | null => {
  if (!Number.isInteger(quantity) || quantity < 1) return 'Quantity must be a whole number of at least 1'
  if (quantity > MAX_QUANTITY) return `Quantity must be at most ${MAX_QUANTITY}`
  return null
}

export const validateImageFile = (file: File): string | null => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Image must be a PNG, JPEG, WebP or GIF file'
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return `Image must be smaller than ${MAX_IMAGE_BYTES / (1024 * 1024)}MB`
  }
  return null
}
