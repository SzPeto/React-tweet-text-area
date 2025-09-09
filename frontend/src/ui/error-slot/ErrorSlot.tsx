import { useEffect, useState } from 'react'
import './ErrorSlot.css'

type ErrorSlotProps = {
  message: string,
  UUID: string
}

const ErrorSlot = (props: ErrorSlotProps) => {
  const [ isVisible, setIsVisible ] = useState(true)

   // Whenever props.message changes, show it again
  useEffect(() => {
    setIsVisible(!!props.message)
  }, [props.UUID])

  if (!props.message || !isVisible) {
    return null
  }

  return (
    <div 
      className='error-container' 
      onClick={ () => setIsVisible(false) }
    >
      { props.message }
    </div>
  )
}

export default ErrorSlot