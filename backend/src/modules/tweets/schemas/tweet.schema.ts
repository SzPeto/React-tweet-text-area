import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TweetDocument = HydratedDocument<Tweet>;

@Schema({ timestamps: true })
export class Tweet{
  @Prop({ required: true, trim: true })
  content: string

  @Prop({ requiured: true })
  dateSubmitted: string
}

export const TweetSchema = SchemaFactory.createForClass(Tweet)