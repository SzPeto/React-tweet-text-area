import './TextArea.css'

type TextAreaProps = {
    value?: string,
    onChange: (...args: any[]) => any
}

const TextArea = ({value='Type as you wish', onChange}: TextAreaProps) => {
    
    return (
        <textarea className='text-area'
            value={ value }
            onChange={ (e) => onChange(e) }
            rows={ 7 }
        />
    )
}

export default TextArea