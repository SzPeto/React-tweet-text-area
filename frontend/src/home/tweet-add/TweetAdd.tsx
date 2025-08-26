import MuiButton from '@/ui/mui-button/MuiButton'
import TextArea from '@/ui/text-area/TextArea'
import './TweetInput.css'
import { useActiveSubmitStore } from '@/tweets/_store/useActiveSubmitStore'

type TweetInputProps = {
  value: string
  onChange: (...args: any[]) => any,
  onClick: (...args: any[]) => any,
  placeholder: string
}

const TweetAdd = (props: TweetInputProps) => {

  const isActiveSubmit = useActiveSubmitStore((s) => s.isActiveSubmit)

  return (
    <div className='tweet-input-container-l2'>
      <div className="upper-container">
        <TextArea 
          value={ props.value } 
          onChange={ props.onChange } 
          placeholder={ props.placeholder } 
        />
      </div>
      <div className="lower-container">
        { /* Disabling the submit button while submitting isn't done to prevent accidentally submitting the same tweet
             multiple times */ }
        {
          isActiveSubmit ? (
            <MuiButton text='Submit' type='submit' onClick={ props.onClick } />
          ) : (
            <MuiButton text='Submit' type='disabled' onClick={ () => {} } />
          )
        }
        <MuiButton text='Clear text' type='info' onClick={ props.onClick } />
        <MuiButton 
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

export default TweetAdd