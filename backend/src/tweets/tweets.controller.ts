import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TweetsService } from "./tweets.service";
import { Tweet } from "./entities/tweet.entity"

@Controller('tweets')
export class TweetsController {

    // NestJS automatic DI via constructor
    private readonly tweetService: TweetsService; // Readonly is like const, but for instances

    constructor(tweetsService: TweetsService){
        this.tweetService = tweetsService;        
    }


    /*
    ============================================================================================================================
                                                 GET mappings
    ============================================================================================================================
    */

    @Get()
    getAllTweets(){
        return this.tweetService.getAllTweets();
    }

    @Get(":id") // api/tweets/1
    getTweetById(@Param("id") id: string): Tweet { // Param - request path variable
        const numId = parseInt(id, 10); // 10 means we want a decimal values
        return this.tweetService.getTweetById(numId);
    }


    /*
    ============================================================================================================================
                                                 POST mapping
    ============================================================================================================================
    */

    @Post()
    addTweet(@Body() tweet: Tweet){
        return this.tweetService.addTweet(tweet);
    }


    /*
    ============================================================================================================================
                                                 PUT mapping
    ============================================================================================================================
    */

    @Put()
    updateTweet(){
    }


    /*
    ============================================================================================================================
                                                 DELETE mappings
    ============================================================================================================================
    */

    @Delete(":id")
    deleteById(@Param("id") id: string): object{
        const numId: number = parseInt(id, 10);
        return this.tweetService.deleteTweetById(numId);
    }

    @Delete()
    deleteAll(): object{

        return this.tweetService.deleteAllTweets();
    }

}
