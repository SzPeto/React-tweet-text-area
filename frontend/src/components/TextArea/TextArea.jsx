import "./TextArea.css"

function TextArea({value, onChange}){
    
    return (
        <textarea className="text-area"
            value={ value }
            onChange={ 
                (e) => { 
                    onChange(e.target.value); 
                } 
            }
            rows={ 7 }
        />
    );
}

export default TextArea;