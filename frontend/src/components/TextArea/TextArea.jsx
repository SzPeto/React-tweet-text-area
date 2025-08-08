import "./TextArea.css";
import PropTypes from "prop-types";

function TextArea({value, onChange}){
    
    return (
        <textarea className="text-area"
            value={ value }
            onChange={ (e) => onChange(e) }
            rows={ 7 }
        />
    );
}

TextArea.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default TextArea;