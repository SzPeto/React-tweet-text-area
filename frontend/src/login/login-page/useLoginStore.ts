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
  loginUserFe: (userName: string, accessToken: string, email: string, picturePath: string) => void,
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
  loginUserFe: (userName, accessToken, email, picturePath) => set({ currentUser: { 
    userName: userName, 
    accessToken: accessToken,
    email: email,
    picturePath: picturePath
  }, isLoggedIn: true }),
  logoutUserFe: () => set({ currentUser: { 
    userName: '', 
    accessToken: null,
    email: '',
    picturePath: ''
  }, isLoggedIn: false })
}))