import { create } from 'zustand'

type FlashMessageType = 'info' | 'success' | 'warning'
type FlashMessage = { message: string, type: FlashMessageType }
type useFlashMessageStore = {
  flashMessage: FlashMessage,
  queue: FlashMessage[],
  setFlashMessage: (newMessage: string, newType: FlashMessageType, duration?: number) => void,
}

export const useFlashMessageStore = create<useFlashMessageStore>((set, get) => ({
  flashMessage: { message: '', type: 'info' },
  queue: [],
  setFlashMessage: (newMessage, newType, duration=5000) => {

    const { flashMessage, queue } = get() // Getting a copy of the current state
    const newFlash = { message: newMessage, type: newType }

    if (!flashMessage.message) {

      set({ flashMessage: newFlash }) // Set always sets the zustand store variable, so the inner scope here is ignored
      setTimeout(() => { 
        set({ flashMessage: { message: '', type: 'info' } })
        const next = get().queue[0]
        if (next) {
          set({ queue: get().queue.slice(1) })
          get().setFlashMessage(next.message, next.type, duration)
        }
      }, duration)

    } else {
      // Here the first queue refers to the Zustand store variable, the ...queue to this inner local scope
      set({ queue: [...queue, newFlash] })
    }
  }
}))