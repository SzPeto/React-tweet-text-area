import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LoginStore = {
  currentUser: {
    _id: string,
    userName: string,
    email: string,
  },
  isLoggedIn: boolean,
  loginUserFe: (_id: string, userName: string, email: string) => void,
  logoutUserFe: () => void
}

export const useLoginStore = create<LoginStore>()(persist((set) => ({
      currentUser: {
        _id: '',
        userName: '',
        email: '',
      },
      isLoggedIn: false,
      loginUserFe: (_id, userName, email) => set({ currentUser: {
        _id: _id,
        userName: userName,
        email: email,
      }, isLoggedIn: true }),
      logoutUserFe: () => set({ currentUser: {
        _id: '',
        userName: '',
        email: '',
      }, isLoggedIn: false })
    }),
    {
      name: 'login-storage',
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }) // ✅ only persist isLoggedIn to avoid flow issues on refresh
    }
  )
)