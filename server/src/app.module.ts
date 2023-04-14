import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import { ChapterModule } from './chapter/chapter.module';
import { ComicModule } from './comic/comic.module';
import { CommonModule } from './common/common.module';
import { CrawlerModule } from './crawler/crawler.module';
import { DatabaseModule } from './database/database.module';
import { FileModule } from './file/file.module';
import { ReadingHistoryModule } from './readingHistory/reading-history.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    FileModule,
    ReadingHistoryModule,
    CrawlerModule,

    ConfigModule.forRoot({
      envFilePath: '../../dev.env',
      isGlobal: true,
    }),
    UserModule,

    CommonModule,
    DatabaseModule,
    AuthorModule,
    TagModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      sortSchema: true,
      playground: true,
      logger: console,
    }),

    AuthModule,
    ComicModule,
    ChapterModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
