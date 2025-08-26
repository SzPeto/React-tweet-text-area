import MuiButton from '@/ui/mui-button/MuiButton'
import TextArea from '@/ui/text-area/TextArea'
import './TweetInput.css'
import { useState } from 'react'

type TweetInputProps = {
  value: string
  onChange: (...args: any[]) => any,
  onClick: (...args: any[]) => any,
  placeholder: string
}

const TweetAdd = (props: TweetInputProps) => {

  const handleClick = (e: any) => {
    
  }

  const [ isActiveSubmit, setIsActiveSubmit ] = useState(false)

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
        {
          isActiveSubmit ? (
            <MuiButton text='Submit' type='submit' onClick={ handleClick } />
          ) : (
            <MuiButton text='Submit' type='disabled' onClick={ () => {} } />
          )
        }
        <MuiButton text='Clear text' type='info' onClick={ handleClick } />
        <MuiButton 
          text='Delete all tweets' 
          type='delete-all' 
          onClick={ (e) => { if (window.confirm('Are you sure you want to delete all tweets?')) handleClick(e) } 
          } 
        />
      </div>
    </div>
  )
}

export default TweetAdd