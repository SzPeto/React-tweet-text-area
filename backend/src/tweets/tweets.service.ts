import { Injectable } from "@nestjs/common";
import { Tweet } from "./entities/tweet.entity";
import { CreateTweetDto } from "./dto/create-tweet.dto";

@Injectable()
export class TweetsService {

    private tweets: Tweet[] = [];


    /*
    ============================================================================================================================
                                                 Functions for GET requests
    ============================================================================================================================
    */

    getAllTweets(): Tweet[] {
        return this.tweets;
    }

    getTweetById(id: number): Tweet {
        for(let i = 0; i < this.tweets.length; i++){
            if(this.tweets[i].id == id){
                return this.tweets[i];
            }
        }
        const notFoundTweet = new Tweet();
        notFoundTweet.id = -1;
        notFoundTweet.content = "Tweet not found";
        return notFoundTweet;
    }

    /*
    ============================================================================================================================
                                                 Functions for POST requests
    ============================================================================================================================
    */

    addTweet(createTweetDto: CreateTweetDto): Tweet{
        const tweet = new Tweet();
        tweet.id = createTweetDto.id;
        tweet.content = createTweetDto.content;
        this.tweets.push(tweet);
        return tweet;
    }


    /*
    ============================================================================================================================
                                                 Functions for PUT requests
    ============================================================================================================================
    */


    /*
    ============================================================================================================================
                                                 Functions for DELETE requests
    ============================================================================================================================
    */

    deleteAllTweets(): object{
        this.tweets.splice(0);
        return {message: "All tweets were deleted"};
    }

    deleteTweetById(id: number): object{
        for(let i = 0; i < this.tweets.length; i++){
            if(this.tweets[i].id == id){
                this.tweets.splice(i, 1); // Second argument : how many elements to delete beginning from given index
                return { message: `Tweet with ID : ${id} deleted successfully` };
            }
        }
        
        return { message: `Tweet with ID : ${id} not found!` };
    }

}
