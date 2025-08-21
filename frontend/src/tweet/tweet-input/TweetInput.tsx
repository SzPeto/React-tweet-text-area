import Button from '@/ui/button/Button'
import TextArea from '@/ui/text-area/TextArea'
import './TweetInput.css'
import { useActiveSubmitStore } from '@/store/useActiveSubmitStore'

type TweetInputProps = {
  value: string
  onChange: (...args: any[]) => any,
  onClick: (...args: any[]) => any
}

const TweetInput = (props: TweetInputProps) => {

  const isActiveSubmit = useActiveSubmitStore((s) => s.isActiveSubmit)

  return (
    <div className='tweet-input-container-l2'>
      <div className="upper-container">
        <TextArea value={ props.value } onChange={ props.onChange } />
      </div>
      <div className="lower-container">
        {
          isActiveSubmit ? (
            <Button text='Submit' type='submit' onClick={ props.onClick } />
          ) : (
            <Button text='Submit' type='disabled' onClick={ () => {} } />
          )
        }
        <Button text='Clear text' type='info' onClick={ props.onClick } />
        <Button 
          text='Delete all tweets' 
          type='delete-all' 
          onClick={ 
            (e) => {
              if (window.confirm('Are you sure you want to delete all tweets?')) props.onClick(e)
            } 
          } 
        />
      </div>
    </div>
  )
}

export default TweetInput