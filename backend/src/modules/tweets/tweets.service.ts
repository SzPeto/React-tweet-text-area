import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTweetDto } from './dto/create-tweet.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Tweet, TweetDocument } from './schemas/tweet.schema'

@Injectable()
export class TweetsService {

  constructor(@InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>){}

  /*
  ============================================================================================================================
                                                Functions for GET requests
  ============================================================================================================================
  */

  getAllTweets() {
    return this.tweetModel.find()
  }

  /*
  ============================================================================================================================
                                                Functions for POST requests
  ============================================================================================================================
  */

  addTweet(createTweetDto: CreateTweetDto) {
    const tweet = new this.tweetModel(createTweetDto)
    return tweet.save()
  }


  /*
  ============================================================================================================================
                                                Functions for PUT requests
  ============================================================================================================================
  */


  replaceTweetById(id: number, createTweetDto: CreateTweetDto): Tweet{
    let tweet: Tweet | undefined

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

  deleteAllTweets() {
    return this.tweetModel.deleteMany({})
  }

  deleteTweetById(id: number): object{
    return { message: `Tweet with ID : ${id} not found!` }
  }
}
