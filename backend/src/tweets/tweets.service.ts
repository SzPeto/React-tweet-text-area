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
    return await this.tweetModel.find().populate('user').exec()
  }

  async getTweetById(id: string): Promise<TweetDocument> {
    // Ensure to throw NotFoundException if the id isn't valid
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException(`Invalid Tweet ID : ${id}`)
    const tweet = await this.tweetModel.findById(id)
    if (!tweet) throw new NotFoundException(`Tweet with ID : ${id} not found!`)
    return tweet
  }

  async addTweet(createTweetDto: CreateTweetDto, userId: string): Promise<TweetDocument> {
    const tweet = new this.tweetModel({
      content: createTweetDto.content,
      user: new Types.ObjectId(userId)
    })
    return await tweet.save()
  }

  async updateTweetById(id: string, updateTweetDto: UpdateTweetDto): Promise<TweetDocument> {
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
