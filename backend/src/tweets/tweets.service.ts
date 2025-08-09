import { Injectable } from "@nestjs/common";
import { Tweet } from "./entities/tweet.entity";

@Injectable()
export class TweetsService {

    private tweets: Tweet[] = [new Tweet(1, "First"), new Tweet(2, "Second"), new Tweet(3, "Third")];


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
        return new Tweet(-1, "Tweet not found");
    }

    /*
    ============================================================================================================================
                                                 Functions for POST requests
    ============================================================================================================================
    */

    addTweet(tweet: Tweet){
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
