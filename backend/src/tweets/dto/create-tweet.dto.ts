import { IsInt, IsPositive, IsString, IsNotEmpty } from 'class-validator'

export class CreateTweetDto{
    @IsString()
    @IsNotEmpty()
    content: string
}