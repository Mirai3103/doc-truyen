import { CloudinaryModule } from '@/file/cloudinary/cloudinary.module';
import { CloudinaryService } from '@/file/cloudinary/cloudinary.service';
import { Test, TestingModule } from '@nestjs/testing';
import assert from 'assert';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';

describe('upload file test', () => {
  let module: TestingModule;
  let cloudinaryService: CloudinaryService;
  beforeAll(async () => {
    const parentPath = path.resolve(path.resolve(), '..');
    dotenv.config({
      path: `${parentPath}${path.sep}dev.env`,
      override: true,
    });
    module = await Test.createTestingModule({
      imports: [CloudinaryModule],
    }).compile();
    cloudinaryService = await module.get(CloudinaryService);
  }, 100000);
  it('should be not throw errors', async () => {
    async function uploadFromBase64(base64: string) {
      const filename = await cloudinaryService.uploadFromBase64(base64);
      console.log(filename);
    }
    assert.doesNotThrow(() => {
      const file = readFileSync('/home/laffy/Pictures/Screenshots/a.png', {
        encoding: 'base64',
      });
      uploadFromBase64(file);
    });
  });
});
