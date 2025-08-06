
function TextArea({text, onChange}){
    
    return (
        <textarea 
            value={ text }
            onChange={ (e) => { onChange(e.target.value) } }
            rows={ 4 }
        />
    );
}

export default TextArea;