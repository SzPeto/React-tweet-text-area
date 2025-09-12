import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  userName: string

  @ApiProperty()
  @IsString()
  @MinLength(6)
  email: string

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string
}