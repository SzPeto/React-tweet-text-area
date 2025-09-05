import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LoginStore = {
  currentUser: {
    _id: string,
    userName: string,
    accessToken: string | null,
    email: string,
    picturePath: string,
    isAdmin: boolean
  },
  isLoggedIn: boolean,
  accessToken: () => string | null,
  setAccessToken: (newToken: string) => void,
  loginUserFe: (_id: string, userName: string, email: string, picturePath: string, isAdmin: boolean) => void,
  logoutUserFe: () => void
}

export const useLoginStore = create<LoginStore>()(persist((set, get) => ({
      currentUser: {
        _id: '',
        userName: '',
        accessToken: null,
        email: '',
        picturePath: '',
        isAdmin: false
      },
      isLoggedIn: false,
      accessToken: () => get().currentUser.accessToken,
      setAccessToken: (newToken) => set((s) => ({ currentUser: { ...s.currentUser, accessToken: newToken } })),
      loginUserFe: (_id, userName, email, picturePath, isAdmin) => set((s) => ({ currentUser: {
        ...s.currentUser,
        _id: _id,
        userName: userName,
        email: email,
        picturePath: picturePath,
        isAdmin: isAdmin
      }, isLoggedIn: true })),
      logoutUserFe: () => set({ currentUser: {
        _id: '',
        userName: '',
        accessToken: null,
        email: '',
        picturePath: '',
        isAdmin: false
      }, isLoggedIn: false })
    }),
    {
      name: 'login-storage',
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }) // ✅ only persist isLoggedIn to avoid flow issues on refresh
    }
  )
)