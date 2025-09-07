import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '@/ui/card/Card'
import TextArea from '@/ui/text-area/TextArea'
import BaseBackground from '@/ui/base-background/BaseBackground'
import { useTweetsStore } from '../tweet-list/useTweetsStore'
import { fetchTweets } from '@/home/tweet-list/fetchTweets'
import { updateTweet } from '../tweet-edit/updateTweet'
import Button from '@/ui/button/Button'
import './TweetEdit.css'

const TweetEdit = () => {
  const [ editText, setEditText ] = useState('')
  const setTweets = useTweetsStore((s) => s.setTweets)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {(async () => {
    const res = await fetch(`/api/tweets/${ id }`)
    const json = await res.json()
    if (json.content) {
      setEditText(json.content)
    }
  })()}, [ id ])

  const handleSave = async () => {
    await updateTweet(id!, editText)
    const getJson = await fetchTweets()
    setTweets(getJson)
    navigate('/')
  }

  return (
    <>
      <BaseBackground>
        <Card >
          <p className='edit-heading'>Edit tweet</p>
          <div className='edit-container'>
            <TextArea onChange={ (e) => setEditText(e.target.value) } value={ editText } />
            <div className='edit-cancel-container'>
              <Button 
                text='Save' 
                onClick={ handleSave } 
                color='success'
                size='small'
              />
              <Button 
                text='Cancel' 
                onClick={ () => navigate('/') } 
                color='primary' 
                size='small'
              />
            </div>
          </div>
        </Card>
      </BaseBackground>  
    </>
  )
}

export default TweetEdit