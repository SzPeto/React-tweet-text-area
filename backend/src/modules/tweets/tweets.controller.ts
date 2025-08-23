import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common'
import { TweetsService } from './tweets.service'
import { CreateTweetDto } from './dto/create-tweet.dto'
import { UpdateTweetDto } from './dto/update-tweet.dto'
import { TweetDocument } from './schemas/tweet.schema'

@Controller('tweets')
export class TweetsController {

  // NestJS automatic DI via constructor, readonly is like const, but for instances
  constructor(private readonly tweetsService: TweetsService) {}


  /*
  ============================================================================================================================
                                                GET mappings
  ============================================================================================================================
  */

  @Get()
  async getAllTweets(): Promise<TweetDocument[]> {
    return await this.tweetsService.getAllTweets()
  }

  @Get(':id')
  async getTweetById(@Param('id') id: string): Promise<TweetDocument> {
    return await this.tweetsService.getTweetById(id)
  }


  /*
  ============================================================================================================================
                                                POST mapping
  ============================================================================================================================
  */

  @Post()
  async addTweet(@Body() createTweetDto: CreateTweetDto): Promise<TweetDocument> {
    return await this.tweetsService.addTweet(createTweetDto)
  }


  /*
  ============================================================================================================================
                                                PATCH mapping
  ============================================================================================================================
  */

  @Patch(':id')
  async replaceTweetById(
    @Param('id') id: string, 
    @Body() updateTweetDto: UpdateTweetDto
  ): Promise<TweetDocument> {
    return await this.tweetsService.replaceTweetById(id, updateTweetDto)
  }


  /*
  ============================================================================================================================
                                                DELETE mappings
  ============================================================================================================================
  */

  @Delete()
  async deleteAll(): Promise<object> {
    const response = await this.tweetsService.deleteAllTweets()
    return { success: response.acknowledged, deletedCount: response.deletedCount }
  }

  @Delete(':id')
  async deleteTweetById(@Param('id') id: string): Promise<object> {
    const response = await this.tweetsService.deleteTweetById(id)
    return { success: response.acknowledged, deletedCount: response.deletedCount }
  }
}
