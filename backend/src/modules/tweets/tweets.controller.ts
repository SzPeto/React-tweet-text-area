import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common'
import { TweetsService } from './tweets.service'
import { CreateTweetDto } from './dto/create-tweet.dto'

@Controller('tweets')
export class TweetsController {

  // NestJS automatic DI via constructor, readonly is like const, but for instances
  constructor(private readonly tweetsService: TweetsService){}


  /*
  ============================================================================================================================
                                                GET mappings
  ============================================================================================================================
  */

  @Get()
  async getAllTweets() {
    return await this.tweetsService.getAllTweets()
  }

  @Get(':id')
  async getTweetById(@Param('id') id: string){
    return await this.tweetsService.getTweetById(id)
  }


  /*
  ============================================================================================================================
                                                POST mapping
  ============================================================================================================================
  */

  @Post()
  async addTweet(@Body() createTweetDto: CreateTweetDto){
    return await this.tweetsService.addTweet(createTweetDto)
  }


  /*
  ============================================================================================================================
                                                PUT mapping
  ============================================================================================================================
  */

  @Put(':id')
  replaceTweetById(@Param('id') id: string, 
                    @Body() createTweetDto: CreateTweetDto){
    const numId = parseInt(id, 10)
    return this.tweetsService.replaceTweetById(numId, createTweetDto)
  }


  /*
  ============================================================================================================================
                                                DELETE mappings
  ============================================================================================================================
  */

  @Delete()
  deleteAll(): object{
    return this.tweetsService.deleteAllTweets()
  }
}
