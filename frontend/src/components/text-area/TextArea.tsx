import "./TextArea.css";

function TextArea({value="Type as you wish", onChange}: TextAreaProps){
    
    return (
        <textarea className="text-area"
            value={ value }
            onChange={ (e) => onChange(e) }
            rows={ 7 }
        />
    );
}

type TextAreaProps = {
    value?: string,
    onChange: (...args: any[]) => any
};

export default TextArea;