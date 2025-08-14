import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TweetsModule } from './tweets/tweets.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    TweetsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/tweetsdb')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
