import { IsOptional, IsString, MinLength } from 'class-validator'

export class CreateUserDto {

  @IsString()
  @MinLength(3)
  userName: string

  @IsString()
  @MinLength(6)
  email: string

  @IsString()
  @MinLength(6)
  password: string

  @IsString()
  @IsOptional()
  picturePath: string

}