import { useState } from 'react'
import './FlashMessage.css'

type FlashMessageProps = {
  value: string,
  type: 'success' | 'info' | 'warning',
  offset: number
}

const FlashMessage = (props: FlashMessageProps) => {
  const [ isVisible, setIsVisible ] = useState(true)
  const topOffsetPx = (props.offset ?? 0) * 56

  return (
    <div 
      className={ `flash-main-container ${ props.type }` } 
      onClick={ () => setIsVisible(false) }
      style={ isVisible ? { top: topOffsetPx } : { display: 'none' } }
    >
      <p>{ props.value }</p>
    </div>
  )
}

export default FlashMessage