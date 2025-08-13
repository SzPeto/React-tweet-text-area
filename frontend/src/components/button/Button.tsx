import './Button.css'

type ButtonProps = {
  text?: string, // ? means optional
  onClick: (...args: any[]) => any,
  type?: 'submit' | 'info' | 'get'
}

//{ text='Push me', onClick, type='submit' }

const Button = (props: ButtonProps) => {

  return (
    <button 
      onClick={ (e) => props.onClick(e) } 
      className={`base-button-${ props.type ?? "submit" }`} 
      type='button' 
      id={ props.type ?? "submit" } >
      
      { props.text ?? "Push me" }
    </button>
  )
}

export default Button