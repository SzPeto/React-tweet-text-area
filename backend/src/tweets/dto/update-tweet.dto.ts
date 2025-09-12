import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class UpdateTweetDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string
}