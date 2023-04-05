import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import fs from 'fs';
import { Buffer } from 'buffer';
import https from 'https';
import axios from 'axios';
import { PageClass } from './dto/pagination.dto';
@Injectable()
export class UtilService {
  slugfy(str: string, separator = '-') {
    str = str
      .toLowerCase()
      .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/\s+/g, '-')
      .replace(/[^A-Za-z0-9_-]/g, '')
      .replace(/-+/g, '-');
    return str.replace(/-/g, separator);
  }
  async hash(text: string): Promise<string> {
    return await bcrypt.hash(text, Number(process.env.SALT_ROUNDS) || 10);
  }
  async compare(text: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(text, hashed);
  }
  async saveFile(base64: string): Promise<string> {
    const imageFolder = process.env.UPLOAD_FOLDER;
    const UPLOAD_URL = process.env.UPLOAD_URL;
    if (imageFolder) {
      return await this.saveUseFolder(base64);
    } else if (UPLOAD_URL) {
      return await this.saveUseUpload(base64);
    } else {
      throw new Error('Server not config upload');
    }
  }
  async downloadFile(url: string): Promise<string> {
    const imageFolder = process.env.UPLOAD_FOLDER!;
    const fileName = randomUUID() + '.' + url.split('.').pop();
    // https.get(url, (res) => {
    //   // Image will be stored at this path
    //   const filePath = fs.createWriteStream(`${imageFolder}/${fileName}`);
    //   res.pipe(filePath);
    //   filePath.on('finish', () => {
    //     filePath.close();
    //   });
    //   filePath.on('error', (e) => {
    //     console.log(e);
    //   });
    // });
    return fileName;
  }
  private async saveUseFolder(base64: string): Promise<string> {
    const imageFolder = process.env.UPLOAD_FOLDER;
    const fileName = randomUUID() + '.' + base64.split(';')[0].split('/')[1];
    const filePath = `${imageFolder}/${fileName}`;
    const base64Data = base64.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFile(filePath, buffer, 'binary', (e) => {
      console.log(e);
    });

    return fileName;
  }
  private async saveUseUpload(base64: string): Promise<string> {
    const UPLOAD_URL = process.env.UPLOAD_URL!;
    const res = await axios.post(UPLOAD_URL, {
      imageBase64: base64,
    });
    if (res.data) {
      return res.data.filename;
    }
    return '';
  }
  async withPagination<T>(
    query: any,
    limit = 10,
    page = 1,
  ): Promise<PageClass<T>> {
    const skip = (page - 1) * limit;
    const total = await query.countDocuments();
    const data = await query.skip(skip).limit(limit);
    return {
      data,
      totalPages: Math.ceil(total / limit),
    };
  }
}
