import "./Button.css";

function Button({text="Push me", onClick, type}){
    
    return (
        <button onClick={ onClick } className={`base-button-${ type }`} type="button" >{ text }</button>
    );
}

export default Button;