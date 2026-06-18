import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider, useAuth } from '../authContext'

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

const TestConsumer = () => {
  const { user, token, isAuthenticated, setAuth, logout } = useAuth()
  return (
    <div>
      <span data-testid="user">{user ? user.name : 'none'}</span>
      <span data-testid="token">{token ?? 'none'}</span>
      <span data-testid="authenticated">{isAuthenticated ? 'yes' : 'no'}</span>
      <button onClick={() => setAuth({ id: '1', name: 'Admin', userId: 'admin1' }, 'tok123')}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  it('provides null user and token by default', () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    )
    expect(screen.getByTestId('user')).toHaveTextContent('none')
    expect(screen.getByTestId('token')).toHaveTextContent('none')
    expect(screen.getByTestId('authenticated')).toHaveTextContent('no')
  })

  it('setAuth updates user, token, and localStorage', async () => {
    const user = userEvent.setup()
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    )

    await user.click(screen.getByText('Login'))

    expect(screen.getByTestId('user')).toHaveTextContent('Admin')
    expect(screen.getByTestId('token')).toHaveTextContent('tok123')
    expect(screen.getByTestId('authenticated')).toHaveTextContent('yes')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'tok123')
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify({ id: '1', name: 'Admin', userId: 'admin1' }),
    )
  })

  it('logout clears user, token, and localStorage', async () => {
    const user = userEvent.setup()
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    )

    await user.click(screen.getByText('Login'))
    expect(screen.getByTestId('authenticated')).toHaveTextContent('yes')

    await user.click(screen.getByText('Logout'))
    expect(screen.getByTestId('user')).toHaveTextContent('none')
    expect(screen.getByTestId('token')).toHaveTextContent('none')
    expect(screen.getByTestId('authenticated')).toHaveTextContent('no')
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('token')
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user')
  })

  it('restores auth state from localStorage on mount', () => {
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === 'token') return 'stored-token'
      if (key === 'user') return JSON.stringify({ id: '2', name: 'Stored User', userId: 'user2' })
      return null
    })

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    )

    expect(screen.getByTestId('user')).toHaveTextContent('Stored User')
    expect(screen.getByTestId('token')).toHaveTextContent('stored-token')
    expect(screen.getByTestId('authenticated')).toHaveTextContent('yes')
  })

  it('throws if useAuth is used outside AuthProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<TestConsumer />)).toThrow(
      'useAuth must be used within AuthProvider',
    )
    spy.mockRestore()
  })
})
