import { create } from 'zustand'

type LoginStore = {
  currentUser: {
    userName: string,
    accessToken: string | null,
    email: string,
    picturePath: string
  },
  isLoggedIn: boolean,
  loginUser: (userName: string, accessToken: string, email: string, picturePath: string) => void,
  logoutUser: () => void
}

export const useLoginStore = create<LoginStore>((set) => ({
  currentUser: {
    userName: '',
    accessToken: null,
    email: '',
    picturePath: ''
  },
  isLoggedIn: false,
  loginUser: (userName, accessToken, email, picturePath) => set({ currentUser: { 
    userName: userName, 
    accessToken: accessToken,
    email: email,
    picturePath: picturePath
  }, isLoggedIn: true }),
  logoutUser: () => set({ currentUser: { 
    userName: '', 
    accessToken: null,
    email: '',
    picturePath: ''
  }, isLoggedIn: false })
}))