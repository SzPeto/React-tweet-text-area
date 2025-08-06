import "./Button.css";
import PropTypes from "prop-types";

function Button({text="Push me", onClick, type="submit"}){

    return (
        /* To avoid conflict between functions with and without parameters, use (e) => onClick?.(e), the system
           will choose itself, whether to pass or not the event itself */
        <button onClick={ (e) => onClick?.(e) } className={`base-button-${ type }`} type="button" >{ text }</button>
    );
}

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf(["submit", "info"])
}

export default Button;