import { Comic } from '@/comic/schema/comic.schema';
import { UtilService } from '@/common/util.service';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { FindUserDto } from './dto/findUser.dto';
import { UpdateImportantInfoDTO, UpdateUserDto } from './dto/updateUser.dto';
import { UserQueryDto } from './dto/userQuery.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(UtilService) private utilService: UtilService,
    @InjectModel(Comic.name) private comicModel: Model<UserDocument>,
  ) {}
  public async countUploadedComics(userId: string) {
    return this.comicModel
      .countDocuments({
        createdBy: {
          _id: userId,
        },
      })
      .exec();
  }
  public async getUploadedComics(
    userId: string | mongoose.Types.ObjectId,
    page = 1,
    limit = 25,
  ) {
    return this.comicModel
      .find({
        createdBy: {
          _id: userId,
        },
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }
  public async create(createUserDto: CreateUserDto): Promise<User> {
    //check if email is already taken
    const emailExists = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (emailExists) {
      throw new ConflictException('Email đã tồn tại');
    }
    const usernameExists = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (usernameExists) {
      throw new ConflictException('Tên đăng nhập đã tồn tại');
    }
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
    const avatarUrl: string | undefined = updateUserDto.base64Avatar;

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

  public async findByUniqueField(userIdentification: string) {
    //check if is mongoose.Types.ObjectId

    if (userIdentification.match(/^[0-9a-fA-F]{24}$/)) {
      return await this.userModel.findById(userIdentification);
    }
    return await this.userModel.findOne({
      $or: [{ username: userIdentification }, { email: userIdentification }],
    });
  }
  public async findByIds(ids: string[]): Promise<User[]> {
    return await this.userModel.find({
      _id: {
        $in: ids,
      },
    });
  }
  public async findAll(
    keywords: string,
    page: number,
    limit: number,
  ): Promise<UserQueryDto> {
    const skip = (page - 1) * limit;

    const query = {
      $or: [
        { username: { $regex: keywords || '', $options: 'i' } },
        { email: { $regex: keywords || '', $options: 'i' } },
        { displayName: { $regex: keywords || '', $options: 'i' } },
      ],
    };

    const [users, count] = await Promise.all([
      this.userModel.find(query).skip(skip).limit(limit),
      this.userModel.countDocuments(query),
    ]);

    return {
      users,
      count,
    };
  }
  public async updateImportantFields(
    input: UpdateImportantInfoDTO,
  ): Promise<User | null> {
    const user = await this.userModel.findById(input.id);
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    if (await this.utilService.compare(input.password, user.hashPassword)) {
      throw new ConflictException('Mật khẩu không đúng');
    }
    return this.userModel.findByIdAndUpdate(input.id, {
      email: input.email,
      password: input.newPassword
        ? await this.utilService.hash(input.newPassword)
        : undefined,
    });
  }
}
