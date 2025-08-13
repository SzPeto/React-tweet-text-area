import Button from '@/components/button/Button.tsx'
import TextArea from '@/components/text-area/TextArea.tsx'
import './TweetInput.css'

type TweetInputProps = {
  value: string
  onChange: (...args: any[]) => any,
  onClick: (...args: any[]) => any
}

const TweetInput = (props: TweetInputProps) => {

  return (
    <div className='tweet-container'>
      <div className="upper-container">
        <TextArea value={ props.value } onChange={ props.onChange } />
      </div>
      <div className="lower-container">
        <Button text='Submit' type='submit' onClick={ props.onClick } />
        <Button text='Clear text' type='info' onClick={ props.onClick } />
      </div>
    </div>
  )
}

export default TweetInput