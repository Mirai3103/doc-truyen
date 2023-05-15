import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { CloudinaryResponse } from './cloudinary-response';

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result as any);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
  async uploadFiles(
    files: Array<Express.Multer.File>,
  ): Promise<CloudinaryResponse[]> {
    const promises = files.map((file) => this.uploadFile(file));
    return await Promise.all(promises);
  }
}
