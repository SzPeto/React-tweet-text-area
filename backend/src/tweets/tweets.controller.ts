import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TweetsService } from "./tweets.service";

@Controller('tweets')
export class TweetsController {

    // NestJS automatic DI via constructor
    private readonly tweetService: TweetsService; // Readonly is like const, but for instances

    constructor(tweetsService: TweetsService){
        this.tweetService = tweetsService;        
    }

    @Get()
    getAllTweets(){
        return this.tweetService.getAllTweets();
    }

    @Get(":id") // api/tweets/1
    getTweetById(@Param("id") id: string){ // Param - request path variable
        const numId = parseInt(id, 10) // 10 means we want a decimal values
    }

    @Post()
    addTweet(){

    }

    @Put()
    updateTweet(){
        
    }

    @Delete()
    deleteById(){

    }

    @Delete()
    deleteAll(){

    }

}
