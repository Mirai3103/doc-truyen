import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DATABASE_URI ||
        'mongodb+srv://hoagxxll:FVNzXi4LoiXZp1EN@doctruyendb.h7u8it7.mongodb.net',
      {
        dbName: process.env.MONGO_DBNAME || 'comicDb',
      },
    ),
  ],
  providers: [],
})
export class DatabaseModule {}
