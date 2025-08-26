import './TextArea.css'

type TextAreaProps = {
  value?: string,
  onChange: (...args: any[]) => any
  placeholder: string
}

const TextArea = (props: TextAreaProps) => {
    
  return (
    <textarea className='text-area-l1'
      value={ props.value }
      onChange={ props.onChange }
      rows={ 4 }
      placeholder={ props.placeholder }
    />
  )
}

export default TextArea