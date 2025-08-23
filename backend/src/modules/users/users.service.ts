import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "./schemas/users.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  createUser(createUserDto: CreateUserDto) {
    const userExist = this.userModel.findOne({ userName: createUserDto.userName })
  }

}