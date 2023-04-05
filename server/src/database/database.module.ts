import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URI!, {
      dbName: process.env.MONGO_DBNAME || 'comicDb',
    }),
  ],
  providers: [],
})
export class DatabaseModule {
  constructor() {
    console.log('DatabaseModule', process.env.DATABASE_URI);
  }
}
