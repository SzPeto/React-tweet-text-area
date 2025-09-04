import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LoginStore = {
  currentUser: {
    userId: string, 
    userName: string,
    accessToken: string | null,
    email: string,
    picturePath: string
  },
  isLoggedIn: boolean,
  accessToken: () => string | null,
  setAccessToken: (newToken: string) => void,
  loginUserFe: (userId: string, userName: string, email: string, picturePath: string) => void,
  logoutUserFe: () => void
}

export const useLoginStore = create<LoginStore>()(persist((set, get) => ({
      currentUser: {
        userId: '',
        userName: '',
        accessToken: null,
        email: '',
        picturePath: ''
      },
      isLoggedIn: false,
      accessToken: () => get().currentUser.accessToken,
      setAccessToken: (newToken) => set((s) => ({ currentUser: { ...s.currentUser, accessToken: newToken } })),
      loginUserFe: (userId, userName, email, picturePath) => set((s) => ({ currentUser: {
        ...s.currentUser,
        userId: userId,
        userName: userName,
        email: email,
        picturePath: picturePath
      }, isLoggedIn: true })),
      logoutUserFe: () => set({ currentUser: {
        userId: '',
        userName: '',
        accessToken: null,
        email: '',
        picturePath: ''
      }, isLoggedIn: false })
    }),
    {
      name: 'login-storage',
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }) // ✅ only persist isLoggedIn to avoid flow issues on refresh
    }
  )
)