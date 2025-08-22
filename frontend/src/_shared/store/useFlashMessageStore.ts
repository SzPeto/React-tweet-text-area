import { create } from 'zustand'

type FlashMessageType = 'info' | 'success' | 'warning'

type useFlashMessageStore = {
  flashMessage: [string, FlashMessageType],
  setFlashMessage: (newMessage: string, newType: FlashMessageType, duration?: number) => void,
}

export const useFlashMessageStore = create<useFlashMessageStore>((set) => ({
  flashMessage: ['', 'info'],
  setFlashMessage: (newMessage, newType, duration=5000) => {
    set({ flashMessage: [newMessage, newType] })
  
    if (newMessage) {
      setTimeout(() => {
        set({ flashMessage: ['', 'info'] })
      }, duration)
    }
  }
}))