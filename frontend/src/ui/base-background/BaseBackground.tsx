import type { ReactNode } from 'react'
import './BaseBackground.css'

type BaseBackgroundProps = {
  children: ReactNode,
  className?: string
}

const BaseBackground = (props: BaseBackgroundProps) => {

  return (
    <div className={ `base-background-container ${ props.className }` }>
      { props.children }
    </div>
  )
}

export default BaseBackground