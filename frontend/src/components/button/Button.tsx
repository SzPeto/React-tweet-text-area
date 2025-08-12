import './Button.css'

type ButtonProps = {
    text?: string, // ? means optional
    onClick: (...args: any[]) => any,
    type?: 'submit' | 'info' | 'get'
}

function Button({ text='Push me', 
                  onClick, 
                  type='submit' }: ButtonProps) {

    return (
        <button 
            onClick={ (e) => onClick(e) } 
            className={`base-button-${ type }`} 
            type='button' 
            id={ type } >
            
            { text }
        </button>
    )
}

export default Button