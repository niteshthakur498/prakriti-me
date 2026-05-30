import type { UseAuthReturn } from '@/types'

// V2 stub — will handle user sessions for saved Prakriti profiles
export function useAuth(): UseAuthReturn {
  return {
    user: null,
    isAuthenticated: false,
    login: () => undefined,
    logout: () => undefined,
  }
}
