import { Injectable, NotFoundException } from "@nestjs/common";
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
        let tweet: Tweet | undefined;
        for(let i = 0; i < this.tweets.length; i++){
            if(this.tweets[i].id == id){
                tweet = this.tweets[i];
            }
        }
        if(!tweet){
            throw new NotFoundException(`Tweet with id : ${id} not found!`);
        }
        
        return tweet;
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
