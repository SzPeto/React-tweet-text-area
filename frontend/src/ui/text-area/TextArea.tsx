import './TextArea.css'

type TextAreaProps = {
  value?: string,
  onChange: (...args: any[]) => any,
  placeholder?: string,
  className?: string
}

const TextArea = (props: TextAreaProps) => {
    
  return (
    <textarea className={ `text-area-l1 ${ props.className }` }
      value={ props.value }
      onChange={ props.onChange }
      rows={ 4 }
      placeholder={ props.placeholder ?? 'Type your text here' }
    />
  )
}

export default TextArea