/*
https://docs.nestjs.com/controllers#controllers
*/

import { WithRoleGuard } from '@/auth/guard/roles.guard';
import { Role } from '@/user/schema/user.schema';
import {
  Controller,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(new WithRoleGuard(Role.CREATOR))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinaryService.uploadFile(file);
    return {
      url: result.secure_url,
    };
  }
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files'))
  // @UseGuards(new WithRoleGuard(Role.CREATOR))
  public async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    // const result = await this.fileService.saveFiles(files);
    const result = await this.cloudinaryService.uploadFiles(files);

    return result.map((item) => ({
      url: item.secure_url,
    }));
  }
  public async getFile(
    @Param('filename') filename: string,
    @Res() res: Response,
    @Query('width') width?: number,
    @Query('height') height?: number,
  ) {
    const image = await this.fileService.getImage(filename, width, height);
    res.setHeader('Content-Type', 'image/jpeg'); // 'image/png
    image.pipe(res as any);
  }
}
