
type FlashMessageProps = {
  value: string,
  type: 'success' | 'info' | 'warning'
}

const FlashMessage = (props: FlashMessageProps) => {

  const classTw = {
    success: 'bg-green-100 text-green-800',
    info: 'bg-blue-100 text-blue-800',
    warning: 'bg-red-100 text-red-800'
  }

  return (
    <div className={`
      flex flex-col 
      justify-center items-center 
      rounded-lg 
      shadow-xl 
      mx-auto my-4 
      w-fit 
      px-10 
      ${ classTw[props.type] }
    `}>
      <p>{ props.value }</p>
    </div>
  )
}

export default FlashMessage;