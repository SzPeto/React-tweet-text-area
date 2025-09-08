import { useState } from 'react'

type FlashMessage = {
  id: string
  message: string
  type: 'success' | 'info' | 'warning'
}

export const useLocalFlashMessages = () => {
  const [ flashMessages, setFlashMessages ] = useState<FlashMessage[]>([])

  const addFlashMessage = (message: string, type: 'success' | 'info' | 'warning') => {
    const id = Date.now().toString()
    const newMessage = { 
      id: id, 
      message: message, 
      type: type 
    }
    
    setFlashMessages(prev => [newMessage, ...prev].slice(0, 3))
    
    setTimeout(() => {
      setFlashMessages(prev => prev.filter(msg => msg.id !== id))
    }, 8000)
  }

  return { flashMessages, addFlashMessage }
}