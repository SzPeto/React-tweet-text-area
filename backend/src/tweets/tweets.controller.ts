import { Controller } from '@nestjs/common';
import { TweetsService } from './tweets.service';

@Controller('tweets')
export class TweetsController {

    private readonly tweetService: TweetsService; // Readonly is like const, but for instances

    constructor(tweetsService: TweetsService){
        this.tweetService = tweetsService;        
    }

}
