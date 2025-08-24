import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto)
  }

  // TODO - Only for testing purposes, remove in production
  @Get(':userName')
  async findUserByName(@Param('userName') userName: string) {
    return this.usersService.findUserByName(userName)
  }

}