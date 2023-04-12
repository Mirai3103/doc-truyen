/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import fs from 'fs';
import sharp from 'sharp';

export interface FilesUploadMapResult {
  [key: string]: string;
}
@Injectable()
export class FileService {
  public async saveFile(file: Express.Multer.File): Promise<string> {
    const { mimetype } = file;
    const ext = mimetype.split('/')[1];
    const newFilename = `${randomUUID()}.${ext}`;
    this.saveFileToDisk(file, newFilename);
    return newFilename;
  }
  private async saveFileToDisk(file: Express.Multer.File, newFilename: string) {
    const { filename, destination } = file;
    const dir = process.env.UPLOAD_PATH || 'uploads';
    const filePath = `${destination}/${filename}`;
    const newFilePath = `${dir}/${newFilename}`;
    return new Promise((resolve, reject) => {
      fs.rename(filePath, newFilePath, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(newFilename);
      });
    });
  }
  public async saveFiles(
    files: Array<Express.Multer.File>,
  ): Promise<FilesUploadMapResult> {
    const result: FilesUploadMapResult = {};
    files.forEach((file) => {
      const { filename } = file;
      result[file.fieldname] = filename;
    });
    return result;
  }
  public async getImage(filename: string, width?: number, height?: number) {
    const dir = process.env.UPLOAD_PATH || 'uploads';
    const filePath = `${dir}/${filename}`;
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException("File doesn't exist");
    }
    let pipeline = sharp(filePath);
    if (width && height) {
      pipeline = pipeline.resize(Number(width), Number(height), {
        fit: 'fill',
        withoutEnlargement: true,
      });
    }
    return pipeline;
  }
}
