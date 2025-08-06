import "./Button.css";

function Button({text="Push me", onClick, type="submit"}){
    
    function handleClick(e){
        console.log(e);
        e.target.textContent = "New button text";
    }

    return (
        <button onClick={ (e) => onClick?.(e) } className={`base-button-${ type }`} type="button" >{ text }</button>
    );
}

export default Button;