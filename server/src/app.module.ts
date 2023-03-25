import { CrawlerModule } from './crawler/crawler.module';
import { ChapterModule } from './chapter/chapter.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { AuthorModule } from './author/author.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TeamModule } from './team/team.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';
import { ComicModule } from './comic/comic.module';

@Module({
  imports: [
    CrawlerModule,
    ChapterModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UserModule,
    CommonModule,
    DatabaseModule,
    AuthorModule,
    TeamModule,
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
    CrawlerModule,
  ],
})
export class AppModule {}
