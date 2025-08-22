import { create } from 'zustand'

type FlashMessageType = 'info' | 'success' | 'warning'

type useFlashMessageStore = {
  flashMessage: string,
  flashMessageType: FlashMessageType,
  setFlashMessage: (newMessage: string) => void,
  setFlashMessageType: (newType: FlashMessageType) => void
}

export const useFlashMessageStore = create<useFlashMessageStore>((set) => ({
  flashMessage: '',
  flashMessageType: 'info',
  setFlashMessage: (newMessage) => set({ flashMessage: newMessage }),
  setFlashMessageType: (newType) => set({ flashMessageType: newType })
}))