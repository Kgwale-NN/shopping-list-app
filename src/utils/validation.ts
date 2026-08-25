export const MIN_PASSWORD_LENGTH = 6

export const isValidEmail = (email: string): boolean =>
  email.includes('@') && email.includes('.')

export const hasEmptyField = (fields: string[]): boolean =>
  fields.some((field) => !field)

/**
 * Returns the first validation error for a set of credentials, or '' when valid.
 */
export const validateCredentials = (fields: {
  email?: string
  password?: string
  required?: string[]
}): string => {
  const { email, password, required = [] } = fields

  if (hasEmptyField(required)) {
    return 'Please fill in all fields'
  }

  if (email !== undefined && !isValidEmail(email)) {
    return 'Please enter a valid email address'
  }

  if (password !== undefined && password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
  }

  return ''
}

export const validatePasswordChange = (
  newPassword: string,
  confirmPassword: string,
): string => {
  if (newPassword !== confirmPassword) {
    return 'Passwords do not match'
  }

  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
  }

  return ''
}
