/*
https://docs.nestjs.com/modules
*/

import { Chapter, ChapterSchema } from '@/chapter/schema/chapter.schema';
import { View, ViewSchema } from '@/view/schema/view.schema';
import { ViewService } from '@/view/view.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederService } from './seeder.service';
import { ViewModule } from '@/view/view.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Chapter.name,
        schema: ChapterSchema,
      },
    ]),
    ViewModule,
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
