import type { ReactNode } from 'react'
import './Card.css'

type CardProps = {
  children: ReactNode,
  className?: string
}

const Card = (props: CardProps) => {

  return (
    <div className={ `card-container ${ props.className }` }>
      { props.children }
    </div>
  )
}

export default Card