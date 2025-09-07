import { useFlashMessageStore } from './useFlashMessageStore'
import './FlashMessage.css'

type FlashMessageProps = {
  value: string,
  type: 'success' | 'info' | 'warning'
}

const FlashMessage = (props: FlashMessageProps) => {
  const setFlashMessage = useFlashMessageStore((s) => s.setFlashMessage)

  return (
    <div className={ `flash-main-container ${ props.type }` } onClick={ () => setFlashMessage('', 'info') }>
      <p>{ props.value }</p>
    </div>
  )
}

export default FlashMessage;