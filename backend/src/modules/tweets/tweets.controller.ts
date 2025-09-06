import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common'
import { TweetsService } from './tweets.service'
import { CreateTweetDto } from './dto/create-tweet.dto'
import { UpdateTweetDto } from './dto/update-tweet.dto'
import { TweetDocument } from './schemas/tweet.schema'

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Get()
  async getAllTweets(): Promise<TweetDocument[]> {
    return await this.tweetsService.getAllTweets()
  }

  @Post()
  async addTweet(@Body() createTweetDto: CreateTweetDto): Promise<TweetDocument> {
    return await this.tweetsService.addTweet(createTweetDto)
  }

  @Patch(':id')
  async updateTweetById(
    @Param('id') id: string, 
    @Body() updateTweetDto: UpdateTweetDto
  ): Promise<TweetDocument> {
    return await this.tweetsService.replaceTweetById(id, updateTweetDto)
  }

  @Delete(':id')
  async deleteTweetById(@Param('id') id: string): Promise<object> {
    const response = await this.tweetsService.deleteTweetById(id)
    return { success: response.acknowledged, deletedCount: response.deletedCount }
  }
}
