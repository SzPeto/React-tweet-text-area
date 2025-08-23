import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
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
    const hashedPw = await bcrypt.hash(createUserDto.password, 10)
    const user = new this.userModel({ 
      userName: createUserDto.userName, 
      email: createUserDto.email, 
      password: hashedPw 
    })
    return user.save()
  }

  async findUserByName(userName: string) {
    const user = await this.userModel.findOne({ userName: userName })
    if (!user) throw new NotFoundException(`User with name : ${ userName } doesn't exist`)
    return user
  }

}