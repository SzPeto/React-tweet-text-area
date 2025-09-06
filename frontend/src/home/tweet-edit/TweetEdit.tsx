import { useState } from 'react'
import Card from '@/ui/card/Card'
import TextArea from '@/ui/text-area/TextArea'
import BaseBackground from '@/ui/base-background/BaseBackground'


const TweetEdit = () => {
  const [ editText, setEditText ] = useState('')

  return (
    <>
      <BaseBackground>
        <Card >
          <TextArea onChange={ (e) => setEditText(e.target.value) } value={ editText } />
        </Card>
      </BaseBackground>  
    </>
  )
}

export default TweetEdit