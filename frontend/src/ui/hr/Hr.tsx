import './Hr.css'

type HrProps = {
  className?: string
}

const Hr = (props: HrProps) => {

  return (
    <hr className={ `horizontal-rule ${ props.className }` } />
  )
}

export default Hr