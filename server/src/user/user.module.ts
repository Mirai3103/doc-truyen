import { UserService } from './user.service';
/*
https://docs.nestjs.com/modules
*/

import { CommonModule } from '@/common/common.module';
import { DatabaseModule } from '@/database/database.module';
import { CloudinaryModule } from '@/file/cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    DatabaseModule,
    CommonModule,
    CloudinaryModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
