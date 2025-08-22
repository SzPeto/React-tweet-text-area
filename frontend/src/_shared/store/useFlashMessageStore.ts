import { create } from 'zustand'

type useFlashMessageStore = {
  flashMessage: string,
  setFlashMessage: (newMessage: string) => void
}

export const useFlashMessageStore = create<useFlashMessageStore>((set) => ({
  flashMessage: '',
  setFlashMessage: (newMessage) => set({ flashMessage: newMessage })
}))