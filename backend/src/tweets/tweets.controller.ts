import { Body, Controller, Delete, Get, Param, Post, Patch, UseGuards, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { TweetsService } from './tweets.service'
import { CreateTweetDto } from './dto/create-tweet.dto'
import { UpdateTweetDto } from './dto/update-tweet.dto'
import { Tweet, TweetDocument } from './schemas/tweet.schema'

@ApiTags('tweets')
@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @ApiOkResponse({ type: Tweet, isArray: true })
  @Get()
  async getAllTweets(): Promise<TweetDocument[]> {
    return await this.tweetsService.getAllTweets()
  }

  @ApiOkResponse({ type: Tweet })
  @Get(':id')
  async getTweetById(@Param('id') id: string): Promise<TweetDocument> {
    return await this.tweetsService.getTweetById(id)
  }

  @ApiBearerAuth('access-token')
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
