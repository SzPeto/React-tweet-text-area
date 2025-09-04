import { create } from 'zustand'

type FlashMessageType = 'info' | 'success' | 'warning'
type FlashMessage = { message: string, type: FlashMessageType }
type useFlashMessageStore = {
  flashMessage: FlashMessage,
  setFlashMessage: (newMessage: string, newType: FlashMessageType, duration?: number) => void,
}

export const useFlashMessageStore = create<useFlashMessageStore>((set) => ({
  flashMessage: { message: '', type: 'info' },
  setFlashMessage: (newMessage, newType, duration=11000) => {
    const newFlash = { message: newMessage, type: newType }

    set({ flashMessage: newFlash }) // Set always sets the zustand store variable, so the inner scope here is ignored
    setTimeout(() => { 
      set({ flashMessage: { message: '', type: 'info' } })
    }, duration)
  }
}))