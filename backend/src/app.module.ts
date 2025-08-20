import { Module } from '@nestjs/common'
import { TweetsModule } from './modules/tweets/tweets.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    TweetsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/tweetsdb')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
