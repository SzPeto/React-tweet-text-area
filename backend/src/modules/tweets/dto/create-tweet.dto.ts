import { IsString, IsNotEmpty } from 'class-validator'

export class CreateTweetDto{
  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  @IsNotEmpty()
  user: string // Only the mongo UUID
}