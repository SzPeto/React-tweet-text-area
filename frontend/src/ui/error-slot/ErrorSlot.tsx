import { useState } from 'react'
import './ErrorSlot.css'

type ErrorSlotProps = {
  message?: string
}

const ErrorSlot = (props: ErrorSlotProps) => {
  if (!props.message) {
    return null
  }

  const [ isVisible, setIsVisible ] = useState(true)

  return (
    <div 
      className='error-container' 
      style={ isVisible ? {} : { display: 'none' } }
      onClick={ () => setIsVisible(false) }
    >
      { props.message }
    </div>
  )
}

export default ErrorSlot