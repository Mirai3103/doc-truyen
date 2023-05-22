import { ComicModule } from '@/comic/comic.module';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '../common/common.module';
import { DatabaseModule } from '../database/database.module';
import { AuthorController } from './author.controller';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';
import { Author, AuthorSchema } from './schema/author.schema';

@Module({
  imports: [
    DatabaseModule,
    CommonModule,
    MongooseModule.forFeature([
      {
        name: Author.name,
        schema: AuthorSchema,
      },
    ]),
    forwardRef(() => ComicModule),
  ],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorResolver],
  exports: [AuthorService],
})
export class AuthorModule {}
