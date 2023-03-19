import { UtilService } from '@/common/util.service';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { FindUserDto } from './dto/findUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(UtilService) private utilService: UtilService,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel({
      ...createUserDto,
      rawPassword: undefined,
      hashPassword: await this.utilService.hash(createUserDto.rawPassword),
    });
    return newUser.save();
  }
  public async update(
    id: string | mongoose.Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    let avatarUrl: string | undefined;
    if (updateUserDto.base64Avatar) {
      avatarUrl = await this.utilService.saveFile(updateUserDto.base64Avatar);
    }

    return this.userModel.findByIdAndUpdate(id, {
      ...updateUserDto,
      avatarUrl,
      base64Avatar: undefined,
    });
  }
  public async findUser(findUserDto: FindUserDto): Promise<User | null> {
    return await this.userModel.findOne({
      ...findUserDto,
    });
  }

  public async findByUniqueField(
    userIdentification: string,
  ): Promise<User | null> {
    //check if is mongoose.Types.ObjectId
    let user: User | null = null;
    if (userIdentification.match(/^[0-9a-fA-F]{24}$/)) {
      user = await this.userModel.findById(userIdentification);
      return user;
    }
    user = await this.userModel.findOne({
      $or: [{ username: userIdentification }, { email: userIdentification }],
    });
    return user;
  }
}
