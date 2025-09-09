import { create } from 'zustand'

type FlashType = 'success' | 'info' | 'warning'

type FlashMessage = {
  id: string,
  message: string,
  type: FlashType
}

type FlashMessagesStore = {
  flashMessages: FlashMessage[],
  addFlashMessage: (message: string, type: FlashType) => void
}

export const useFlashMessagesStore = create<FlashMessagesStore>((set) => ({
  flashMessages: [],
  addFlashMessage: (message, type) => {
    const id = crypto.randomUUID() // Ensure the id is really unique
    const newMessage: FlashMessage = { 
      id: id, 
      message: message, 
      type: type 
    }

    set((s) => ({ flashMessages: [newMessage, ...s.flashMessages].slice(0, 3) }))

    setTimeout(() => {
      set((s) => ({
        flashMessages: s.flashMessages.filter((msg) => msg.id !== id),
      }))
    }, 8000)
  }
}))