import './Button.css'

type ButtonProps = {
  text?: string, // ? means optional
  onClick: (...args: any[]) => any,
  type?: 'submit' | 'info' | 'get' | 'delete-all' | 'delete-one' | 'update',
  data?: string
  hidden?: boolean
}

//{ text='Push me', onClick, type='submit' }

const Button = (props: ButtonProps) => {

  return (
    <button 
      onClick={ props.onClick } 
      className={`base-button-${ props.type ?? 'submit' }`} 
      type='button' 
      id={ props.type ?? 'submit' } 
      data-id={ props.data ?? '' }
      hidden={ props.hidden ?? false }
    >
      { props.text ?? 'Push me' }
    </button>
  )
}

export default Button