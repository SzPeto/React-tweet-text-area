import FlashMessage from '@/ui/flash/FlashMessage'

type FlashMessageStackProps = {
  messages: any[]
}

const FlashMessagesStack = (props: FlashMessageStackProps) => {
  return (
    <div className="messages-container">
      {
        props.messages.map((msg, index) => (
          <FlashMessage 
            key={ msg.id } 
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