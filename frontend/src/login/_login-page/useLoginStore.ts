import { create } from 'zustand'

type LoginStore = {
  currentUser: {
    userName: string,
    accessToken: string
  },
  isLoggedIn: boolean,
  loginUser: (userName: string, accessToken: string) => void,
  logoutUser: () => void
}

export const useLoginStore = create<LoginStore>((set) => ({
  currentUser: {
    userName: '',
    accessToken: ''
  },
  isLoggedIn: false,
  loginUser: (userName, accessToken) => set({ currentUser: { 
    userName: userName, 
    accessToken: accessToken 
  }, isLoggedIn: true }),
  logoutUser: () => set({ currentUser: { 
    userName: '', 
    accessToken: '' 
  }, isLoggedIn: false })
}))