import { Controller, Get, Post } from "@nestjs/common";
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

    @Post()
    addTweet(){

    }

}
