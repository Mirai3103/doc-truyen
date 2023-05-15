import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => {
        return {
          dest: process.env.UPLOAD_PATH || 'uploads',
          storage: multer.memoryStorage(),
        };
      },
    }),
    CloudinaryModule,
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
