import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { User } from 'src/modules/users/schemas/users.schema'

export type TweetDocument = HydratedDocument<Tweet>

@Schema({ timestamps: true })
export class Tweet {
  @Prop({ required: true, trim: true })
  content: string

  // means in MongoDB, this field is stored as an ObjectId (basically just the user’s _id).
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User
}

export const TweetSchema = SchemaFactory.createForClass(Tweet)