import { Injectable, NotFoundException } from '@nestjs/common'
import { Tweet } from './entities/tweet.entity'
import { CreateTweetDto } from './dto/create-tweet.dto'

@Injectable()
export class TweetsService {

  private tweets: Tweet[] = []
  private counter: number = 1


  /*
  ============================================================================================================================
                                                Functions for GET requests
  ============================================================================================================================
  */

  getAllTweets(): Tweet[] {
    return this.tweets
  }

  getTweetById(id: number): Tweet {
    let tweet: Tweet | undefined
    for(let i = 0; i < this.tweets.length; i++){
      if(this.tweets[i].id == id){
          tweet = this.tweets[i]
      }
    }
    if(!tweet){
      throw new NotFoundException(`Tweet with id : ${id} not found!`)
    }
    
    return tweet
  }

  /*
  ============================================================================================================================
                                                Functions for POST requests
  ============================================================================================================================
  */

  addTweet(createTweetDto: CreateTweetDto): Tweet{
    const tweet = new Tweet()
    tweet.id = this.counter
    tweet.content = createTweetDto.content
    tweet.dateSubmitted = createTweetDto.dateSubmitted
    this.tweets.push(tweet)
    this.counter ++
    return tweet
  }


  /*
  ============================================================================================================================
                                                Functions for PUT requests
  ============================================================================================================================
  */


  replaceTweetById(id: number, createTweetDto: CreateTweetDto): Tweet{
    let tweet: Tweet | undefined

    for(let i = 0; i < this.tweets.length; i++){
      if(this.tweets[i].id === id){
        tweet = this.tweets[i]
        tweet.content = createTweetDto.content
        break
      }
    }

    if(!tweet) {
      throw new NotFoundException(`Tweet with id : ${id} not found, replacement unsuccessful!`)
    }
    return tweet
  }

  /*
  ============================================================================================================================
                                                Functions for DELETE requests
  ============================================================================================================================
  */

  deleteAllTweets(): object{
    this.tweets.splice(0)
    return {message: 'All tweets were deleted'}
  }

  deleteTweetById(id: number): object{
    for(let i = 0; i < this.tweets.length; i++){
      if(this.tweets[i].id == id){
        this.tweets.splice(i, 1) // Second argument : how many elements to delete beginning from given index
        return { message: `Tweet with ID : ${id} deleted successfully` }
      }
    }
    
    return { message: `Tweet with ID : ${id} not found!` }
  }
}
