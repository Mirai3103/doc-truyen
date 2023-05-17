import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { randomUUID } from 'crypto';
import fs, { writeFileSync } from 'fs';
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
  public async uploadFromBase64(base64: string): Promise<string> {
    const uploadDir = process.env.UPLOAD_PATH || 'uploads';
    //check if upload dir exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const base64Data = base64.split(';base64,').pop()!;
    const tempFilename = `${uploadDir}/${randomUUID()}.jpg`;
    writeFileSync(tempFilename, base64Data, {
      encoding: 'base64',
    });
    const promise = new Promise<CloudinaryResponse>((resolve, reject) => {
      const res = cloudinary.uploader.upload(tempFilename, (error, result) => {
        if (error) return reject(error);
        resolve(result as any);
      });
    });
    const newFileName = (await promise).secure_url;
    fs.unlink(tempFilename, (err) => {
      if (err) console.log('error deleting file');
    });
    console.log(newFileName);
    return newFileName;
  }
}
