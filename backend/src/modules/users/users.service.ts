import { ConflictException, Injectable } from '@nestjs/common'
import { User, UserDocument } from './schemas/users.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto) {
    const userExist = await this.userModel.findOne({ userName: createUserDto.userName })
    if (userExist) throw new ConflictException(`User with name ${ createUserDto.userName } already exists!`)
    const hashedPw = bcrypt
  }

}