import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '../common/common.module';
import { DatabaseModule } from '../database/database.module';
import { Tag, TagSchema } from './schema/tag.schema';
import { TagResolver } from './tag.resolver';
import { TagService } from './tag.service';

@Module({
  imports: [
    DatabaseModule,
    CommonModule,
    MongooseModule.forFeature([
      {
        name: Tag.name,
        schema: TagSchema,
      },
    ]),
  ],
  exports: [TagService],
  providers: [TagService, TagResolver],
})
export class TagModule {}
