import reducer, {
  logout,
  setAuthenticated,
  setToken,
  setUser,
} from '../authSlice'

const user = {
  id: 'user-1',
  email: 'alex@example.com',
  name: 'Alex',
  surname: 'Smith',
  cellNumber: '555-0100',
}

describe('authSlice', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      user: null,
      isAuthenticated: false,
      token: '',
    })
  })

  it('sets the user, token, and authentication status', () => {
    let state = reducer(undefined, setUser(user))
    state = reducer(state, setToken('token-123'))
    state = reducer(state, setAuthenticated(true))

    expect(state).toEqual({
      user,
      isAuthenticated: true,
      token: 'token-123',
    })
  })

  it.each([true, false])('sets authenticated to %s', (isAuthenticated) => {
    expect(reducer(undefined, setAuthenticated(isAuthenticated)).isAuthenticated).toBe(
      isAuthenticated,
    )
  })

  it('logout resets a populated state', () => {
    const populatedState = {
      user,
      isAuthenticated: true,
      token: 'token-123',
    }

    expect(reducer(populatedState, logout())).toEqual({
      user: null,
      isAuthenticated: false,
      token: '',
    })
  })
})
