import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { DeleteResult, Model, Types } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { User, UserDocument } from './schemas/users.schema'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  
  async createUser(createUserDto: CreateUserDto) {
    const userExist = await this.userModel.findOne({ userName: createUserDto.userName })
    let created

    if (userExist) {
      throw new ConflictException(`User with name ${ createUserDto.userName } already exists!`)
    }

    const hashedPw = await bcrypt.hash(createUserDto.password, 10)
    const user = new this.userModel({ 
      userName: createUserDto.userName, 
      email: createUserDto.email, 
      password: hashedPw 
    })
    
    try {
      created = await user.save()
    } catch(err) {
      const errorMessage = err.keyValue?.email ??
                           err.keyValue?.passowrd ?? 
                           err.keyValue?.userName ??
                           'Unknown error during registering user'
                           
      throw new ConflictException(errorMessage)
    }
    return created
  }

  async getAllUsers() {
    return await this.userModel.find().exec()
  }

  async getUserById(id: string): Promise<UserDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid User ID : ${ id }`)
    }
    const user = await this.userModel.findOne({ _id: id })
    
    if (!user) {
      throw new NotFoundException(`User with id ${ id } doesn't exist`)
    }
    return user
  }

  async getUserByName(userName: string) {
    const user = await this.userModel.findOne({ userName: userName })
    
    if (!user) {
      throw new NotFoundException(`User with name ${ userName } doesn't exist!`)
    }

    return user
  }

  async updateUserById(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid User ID : ${ id }`)
    }
    const updated = await this.userModel.findByIdAndUpdate(id, { $set: updateUserDto }, { new: true }).exec()
    if (!updated) {
      throw new NotFoundException(`Error during updating, user with ID : ${ id } not found`)
    }
    return updated
  }

  async deleteUserById(id: string): Promise<DeleteResult> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid User ID : ${ id }`)
    }
    const result = await this.userModel.deleteOne({ _id: id })
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with ID : ${ id } not found!`)
    }
    return result
  }
}