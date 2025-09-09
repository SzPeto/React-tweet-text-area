import FlashMessage from '@/ui/flash/FlashMessage'
import { useFlashMessagesStore } from './useFlashMessageStore'

const FlashMessagesStack = () => {
  const flashMessages = useFlashMessagesStore((s) => s.flashMessages)

  return (
    <div className='messages-container'>
      {
        flashMessages.map((msg, index) => (
          <FlashMessage 
            key={ index } 
            value={ msg.message } 
            type={ msg.type } 
            offset={ index }
          />
        ))
      }
    </div>
  )
}

export default FlashMessagesStack