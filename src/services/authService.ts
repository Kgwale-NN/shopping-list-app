import type { LoginCredentials, RegisterData, User } from '../types/types'

export interface AuthSession {
  user: User
  token: string
}

// No authentication backend exists yet, so credentials cannot be verified here.
// Sign in/up therefore fail closed outside development builds instead of handing
// out a session to anyone who submits the form.
const assertAuthConfigured = () => {
  if (!import.meta.env.DEV) {
    throw new Error('Authentication is not configured. Please try again later.')
  }
}

const createDevToken = () => `dev.${crypto.randomUUID()}`

export const signIn = async ({ email }: LoginCredentials): Promise<AuthSession> => {
  assertAuthConfigured()

  return {
    user: {
      id: '1',
      email: email.trim(),
      name: 'Test',
      surname: 'User',
      cellNumber: '1234567890',
    },
    token: createDevToken(),
  }
}

export const signUp = async (data: RegisterData): Promise<AuthSession> => {
  assertAuthConfigured()

  return {
    user: {
      id: crypto.randomUUID(),
      email: data.email.trim(),
      name: data.name.trim(),
      surname: data.surname.trim(),
      cellNumber: data.cellNumber.trim(),
    },
    token: createDevToken(),
  }
}
