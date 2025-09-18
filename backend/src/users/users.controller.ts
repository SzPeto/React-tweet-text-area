import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { User, UserDocument } from './schemas/users.schema'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

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

  @ApiOkResponse({ type: User })
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDocument> {
    return await this.usersService.getUserById(id)
  }

  @Patch(':id')
  async updateUserById(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserDocument> {
    return await this.usersService.updateUserById(id, updateUserDto)
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<object> {
    const response = await this.usersService.deleteUserById(id)
    return { success: response.acknowledged, deletedCount: response.deletedCount }
  }
}