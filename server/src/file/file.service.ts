/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import fs from 'fs';
import { join } from 'path';

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
  public async saveFiles(files: Array<Express.Multer.File>): Promise<string[]> {
    const newFiles: string[] = [];
    files.forEach((file) => {
      const { mimetype } = file;
      const ext = mimetype.split('/')[1];
      const newFilename = `${randomUUID()}.${ext}`;
      this.saveFileToDisk(file, newFilename);
      newFiles.push(newFilename);
    });
    return newFiles;
  }
  public async getImage(filename: string) {
    const dir = process.env.UPLOAD_PATH || 'uploads';
    const filePath = `${dir}/${filename}`;
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException("File doesn't exist");
    }

    const file = fs.createReadStream(filePath);
    return file;
  }
}
