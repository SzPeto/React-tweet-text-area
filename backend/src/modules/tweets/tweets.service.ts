import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { DeleteResult, Model, Types } from 'mongoose'
import { CreateTweetDto } from './dto/create-tweet.dto'
import { UpdateTweetDto } from './dto/update-tweet.dto'
import { Tweet, TweetDocument } from './schemas/tweet.schema'

@Injectable()
export class TweetsService {

  constructor(@InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>) {}

  async getAllTweets(): Promise<TweetDocument[]> {
    return await this.tweetModel.find()
  }

  async getTweetByUserId(userId: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException(`Invalid user ID : ${ userId }`)
    }

    const tweets = await this.tweetModel.find({ user: userId }).populate('user').exec()
    
    if (!tweets) {
      throw new NotFoundException(`User with ID : ${ userId } has no tweets!`)
    }

    return tweets
  }

  async addTweet(createTweetDto: CreateTweetDto): Promise<TweetDocument> {
    const tweet = new this.tweetModel(createTweetDto)
    return await tweet.save()
  }

  async replaceTweetById(id: string, updateTweetDto: UpdateTweetDto): Promise<TweetDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid Tweet ID : ${ id }`)
    }
    const updated = await this.tweetModel.findByIdAndUpdate(id, { $set: updateTweetDto }, { new: true }).exec()
    if (!updated) {
      throw new NotFoundException(`Error during updating, tweet with ID : ${ id } not found`)
    }
    return updated
  }

  async deleteTweetById(id: string): Promise<DeleteResult> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid Tweet ID : ${ id }`)
    }
    const result = await this.tweetModel.deleteOne({ _id: id })
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Tweet with ID : ${ id } not found!`)
    }
    return result
  }
}
