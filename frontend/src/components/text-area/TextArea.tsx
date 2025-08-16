import './TextArea.css'

type TextAreaProps = {
  value?: string,
  onChange: (...args: any[]) => any
}

const TextArea = (props: TextAreaProps) => {
    
  return (
    <textarea className='text-area'
      value={ props.value }
      onChange={ props.onChange }
      rows={ 4 }
    />
  )
}

export default TextArea