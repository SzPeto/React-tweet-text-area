import { Injectable } from '@nestjs/common';

@Injectable()
export class TweetsService {

    private tweets: [];

    getAllTweets(){
        return this.tweets;
    }

}
