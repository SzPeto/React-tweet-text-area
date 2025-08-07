import { Injectable } from "@nestjs/common";
import { Tweet } from "./entities/tweet.entity";

@Injectable()
export class TweetsService {

    private tweets: Tweet[] = [];

    getAllTweets(){
        return this.tweets;
    }

    addTweet(){

    }

}
