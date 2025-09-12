import { ApiProperty } from '@nestjs/swagger'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { User } from 'src/users/schemas/users.schema'

export type TweetDocument = HydratedDocument<Tweet>

@Schema({ timestamps: true })
export class Tweet {
  @ApiProperty() 
  _id: string

  @ApiProperty()
  @Prop({ required: true, trim: true })
  content: string

  @ApiProperty() 
  createdAt: string

  @ApiProperty() 
  updatedAt: string

  // means in MongoDB, this field is stored as an ObjectId (basically just the user’s _id).
  @ApiProperty({ type: () => User }) // Tell Swagger it's a User
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User
}

export const TweetSchema = SchemaFactory.createForClass(Tweet)