import { create } from 'zustand'

type FlashMessageType = 'info' | 'success' | 'warning'

type useFlashMessageStore = {
  flashMessage: {
    message: string, 
    type: FlashMessageType
  },
  setFlashMessage: (newMessage: string, newType: FlashMessageType, duration?: number) => void,
}

export const useFlashMessageStore = create<useFlashMessageStore>((set) => ({
  flashMessage: {
    message: '',
    type: 'info'
  },
  setFlashMessage: (newMessage, newType, duration=5000) => {
    set({ flashMessage: {
      message: newMessage, 
      type: newType
    } })
  
    if (newMessage) {
      setTimeout(() => {
        set({ flashMessage: {
          message: '',
          type: 'info'
        } })
      }, duration)
    }
  }
}))