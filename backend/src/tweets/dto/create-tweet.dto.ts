import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateTweetDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string
}