import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TweetsController } from './tweets.controller'
import { TweetsService } from './tweets.service'
import { Tweet, TweetSchema } from './schemas/tweet.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tweet.name,
        schema: TweetSchema
      }
    ])
  ],
  controllers: [TweetsController],
  providers: [TweetsService]
})
export class TweetsModule {}
