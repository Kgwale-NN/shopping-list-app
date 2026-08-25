import reducer, {
  setError,
  setLoading,
  setProfile,
  setUpdateProfile,
} from '../profileSlice'

const profile = {
  id: 'profile-1',
  email: 'alex@example.com',
  name: 'Alex',
  surname: 'Smith',
  cellNumber: '555-0100',
}

describe('profileSlice', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      data: null,
      loading: false,
      error: '',
    })
  })

  it('sets a profile and updates loading and error state', () => {
    let state = reducer(undefined, setProfile(profile))
    state = reducer(state, setLoading(true))
    state = reducer(state, setError('Unable to save profile'))

    expect(state).toEqual({
      data: profile,
      loading: true,
      error: 'Unable to save profile',
    })
  })

  it('merges updates into an existing profile', () => {
    const state = reducer({ data: profile, loading: false, error: '' }, setUpdateProfile({
      ...profile,
      name: 'Taylor',
    }))

    expect(state.data).toEqual({
      ...profile,
      name: 'Taylor',
    })
  })

  it('does nothing when updating without an existing profile', () => {
    const state = reducer(undefined, setUpdateProfile(profile))

    expect(state).toEqual({
      data: null,
      loading: false,
      error: '',
    })
  })

  it('does not expose the internal clearProfile action', () => {
    expect({
      setProfile,
      setUpdateProfile,
      setLoading,
      setError,
    }).not.toHaveProperty('clearProfile')

    expect(reducer({
      data: profile,
      loading: true,
      error: 'Unable to save profile',
    }, { type: 'profile/clearProfile' })).toEqual({
      data: null,
      loading: false,
      error: '',
    })
  })
})
