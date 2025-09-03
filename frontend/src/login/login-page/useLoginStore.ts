import { create } from 'zustand'

type LoginStore = {
  currentUser: {
    userName: string,
    accessToken: string | null,
    email: string,
    picturePath: string
  },
  isLoggedIn: boolean,
  accessToken: () => string | null,
  setAccessToken: (newToken: string) => void,
  loginUserFe: (userName: string, email: string, picturePath: string) => void,
  logoutUserFe: () => void
}

export const useLoginStore = create<LoginStore>((set,get) => ({
  currentUser: {
    userName: '',
    accessToken: null,
    email: '',
    picturePath: ''
  },
  isLoggedIn: false,
  accessToken: () => get().currentUser.accessToken,
  setAccessToken: (newToken) => set((s) => ({ currentUser: { ...s.currentUser, accessToken: newToken } })),
  loginUserFe: (userName, email, picturePath) => set((s) => ({ currentUser: {
    ...s.currentUser, 
    userName: userName,
    email: email,
    picturePath: picturePath
  }, isLoggedIn: true })),
  logoutUserFe: () => set({ currentUser: { 
    userName: '', 
    accessToken: null,
    email: '',
    picturePath: ''
  }, isLoggedIn: false })
}))