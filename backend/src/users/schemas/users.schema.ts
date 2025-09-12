import { ApiProperty } from '@nestjs/swagger'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  @ApiProperty() 
  _id: string

  @ApiProperty() 
  @Prop({ required: true, unique: true, trim: true })
  userName: string

  @ApiProperty() 
  @Prop({ required: true, unique:true, trim: true })
  email: string

  @Prop({ required: true })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)