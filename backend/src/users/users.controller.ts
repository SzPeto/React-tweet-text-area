import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './schemas/users.schema'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: User })
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto)
  }

  @ApiOkResponse({ type: User, isArray: true })
  @Get()
  async getAllUsers(): Promise<UserDocument[]> {
    return await this.usersService.getAllUsers()
  }
}