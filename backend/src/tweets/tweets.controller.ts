import { Body, Controller, Delete, Get, Param, Post, Patch, UseGuards, Req } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
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

  @UseGuards(JwtAuthGuard)
  @Post()
  async addTweet(
    @Body() createTweetDto: CreateTweetDto,
    @Req() req: any
  ): Promise<TweetDocument> {
    return await this.tweetsService.addTweet(createTweetDto, req.user._id)
  }

  @Patch(':id')
  async updateTweetById(
    @Param('id') id: string, 
    @Body() updateTweetDto: UpdateTweetDto
  ): Promise<TweetDocument> {
    
    return await this.tweetsService.updateTweetById(id, updateTweetDto)
  }

  @Delete(':id')
  async deleteTweetById(@Param('id') id: string): Promise<object> {
    const response = await this.tweetsService.deleteTweetById(id)

    return { success: response.acknowledged, deletedCount: response.deletedCount }
  }
}
