
function TextArea({value, onChange}){
    
    return (
        <textarea 
            value={ value }
            onChange={ (e) => { onChange(e.target.value) } }
            rows={ 4 }
        />
    );
}

export default TextArea;