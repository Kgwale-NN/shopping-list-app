import { act, renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setAuthenticated } from '../authSlice'
import { useAppDispatch, useAppSelector } from '../hooks'
import { createTestStore } from '../../test/testUtils'

describe('redux hooks', () => {
  it('selects state and dispatches actions through a Provider', () => {
    const store = createTestStore()
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(
      () => ({
        isAuthenticated: useAppSelector((state) => state.auth.isAuthenticated),
        dispatch: useAppDispatch(),
      }),
      { wrapper },
    )

    expect(result.current.isAuthenticated).toBe(false)
    act(() => {
      result.current.dispatch(setAuthenticated(true))
    })

    expect(store.getState().auth.isAuthenticated).toBe(true)
  })
})
