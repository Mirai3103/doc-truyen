/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { View, ViewSchema } from './schema/view.schema';
import { ViewService } from './view.service';
import { Chapter, ChapterSchema } from '@/chapter/schema/chapter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: View.name,
        schema: ViewSchema,
      },
      {
        name: Chapter.name,
        schema: ChapterSchema,
      },
    ]),
  ],
  providers: [ViewService],
  exports: [ViewService],
})
export class ViewModule {}
