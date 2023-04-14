import { MongooseModule } from '@nestjs/mongoose';
import { ReadingHistoryService } from './reading-history.service';
/*
https://docs.nestjs.com/modules
*/

import { ChapterModule } from '@/chapter/chapter.module';
import { ComicModule } from '@/comic/comic.module';
import { User, UserSchema } from '@/user/schema/user.schema';
import { Module, forwardRef } from '@nestjs/common';
import { ReadingHistoryResolver } from './reading-history.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    forwardRef(() => ChapterModule),
    forwardRef(() => ComicModule),
  ],
  controllers: [],
  exports: [ReadingHistoryService],
  providers: [ReadingHistoryService, ReadingHistoryResolver],
})
export class ReadingHistoryModule {}
