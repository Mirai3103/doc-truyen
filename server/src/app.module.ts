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
import { ArtistModule } from './artist/artist.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';
import { ComicModule } from './comic/comic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UserModule,
    CommonModule,
    DatabaseModule,
    AuthorModule,
    TeamModule,
    ArtistModule,
    TagModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      sortSchema: true,
      playground: true,
    }),

    AuthModule,
    ComicModule,
  ],
})
export class AppModule {}
