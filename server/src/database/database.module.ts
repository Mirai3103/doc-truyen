import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017',
      {
        dbName: process.env.MONGO_DBNAME || 'DocTruyen',
      },
    ),
  ],
  providers: [],
})
export class DatabaseModule {}
