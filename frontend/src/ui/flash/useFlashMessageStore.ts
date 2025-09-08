import { create } from 'zustand'

type FlashType = 'success' | 'info' | 'warning'

type FlashMessage = {
  id: string
  message: string
  type: FlashType
}

type FlashStore = {
  flashMessages: FlashMessage[]
  addFlashMessage: (message: string, type: FlashType) => void
}

export const useFlashMessagesStore = create<FlashStore>((set) => ({
  flashMessages: [],
  addFlashMessage: (message, type) => {
    const id = crypto.randomUUID() // Ensure the id is really unique
    const newMessage: FlashMessage = { 
      id: id, 
      message: message, 
      type: type 
    }

    set((state) => {
      const updated = [newMessage, ...state.flashMessages].slice(0, 3)
      return { flashMessages: updated }
    })

    setTimeout(() => {
      set((state) => ({
        flashMessages: state.flashMessages.filter((msg) => msg.id !== id),
      }))
    }, 8000)
  }
}))