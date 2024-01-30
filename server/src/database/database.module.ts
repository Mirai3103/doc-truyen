import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: process.env.MONGO_DBNAME || 'comicDb',
      user: process.env.MONGO_USER || 'admin',
      pass: process.env.MONGO_PASS || 'admin',
    }),
  ],
  providers: [],
})
export class DatabaseModule {}
