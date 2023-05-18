import { GrapqlJwtAuthGuard } from '@/auth/guard/grapql-jwt.auth.guard';
import { UserPayload } from '@/auth/interface/user-payload.jwt';
import { CurrentUser } from '@/common/decorator/graphql-user.decorator';
import {
  Inject,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/createUser.dto';
import { FindUserDto } from './dto/findUser.dto';
import { UpdateImportantInfoDTO, UpdateUserDto } from './dto/updateUser.dto';
import { UserQueryDto } from './dto/userQuery.dto';
import { Role, User } from './schema/user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Query(() => User)
  async user(
    @Args('findUserInput') findUserDto: FindUserDto,
  ): Promise<User | null> {
    const user = await this.userService.findUser(findUserDto);
    return user;
  }
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
  @Mutation(() => User)
  @UseGuards(GrapqlJwtAuthGuard)
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    console.log(currentUser, Role.ADMIN);
    if (currentUser._id !== id && currentUser.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        'Bạn không có quyền thực hiện hành động này',
      );
    }
    if (
      updateUserDto.role &&
      !(currentUser.role === Role.ADMIN) &&
      currentUser.role !== updateUserDto.role
    ) {
      throw new UnauthorizedException(
        'Bạn không có quyền thực hiện hành động này',
      );
    }
    const user = await this.userService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }
  @Query(() => UserQueryDto)
  async users(
    @Args('keywords', { nullable: true }) keywords: string,
    @Args('page', { nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { nullable: true, defaultValue: 25 }) limit: number,
  ) {
    return await this.userService.findAll(keywords, page, limit);
  }
  @Mutation(() => User)
  @UseGuards(GrapqlJwtAuthGuard)
  async updateImportantInfo(
    @Args('input') updateImportantInfoDTO: UpdateImportantInfoDTO,
    @CurrentUser() currentUser: UserPayload,
  ) {
    updateImportantInfoDTO.id = currentUser._id;
    const user = await this.userService.updateImportantFields(
      updateImportantInfoDTO,
    );

    if (!user) {
      throw new NotFoundException(currentUser._id);
    }
    return user;
  }
}
