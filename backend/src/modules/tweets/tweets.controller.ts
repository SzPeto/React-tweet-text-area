import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common'
import { TweetsService } from './tweets.service'
import { Tweet } from './schemas/tweet.schema'
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
    getAllTweets() {
      return this.tweetsService.getAllTweets()
    }

    /*
    ============================================================================================================================
                                                 POST mapping
    ============================================================================================================================
    */

    @Post()
    addTweet(@Body() createTweetDto: CreateTweetDto){
      return this.tweetsService.addTweet(createTweetDto)
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
