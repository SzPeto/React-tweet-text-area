import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log('Hello from UsersController/createUser')
    await this.usersService.createUser(createUserDto)
  }

  // Only for testing purposes
  @Get(':userName')
  async findUserByName(@Param('userName') userName: string) {
    return this.usersService.findUserByName(userName)
  }

}