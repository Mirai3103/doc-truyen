/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  // @UseGuards(new WithRoleGuard(Role.CREATOR))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const result = await this.fileService.saveFile(file);
    return {
      url: result,
    };
  }
  @Post('uploads')
  // @UseGuards(new WithRoleGuard(Role.CREATOR))
  public async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    const result = await this.fileService.saveFiles(files);
    return result;
  }
  @Get('image/:filename')
  public async getFile(
    @Param('filename') filename: string,
    @Res() res: Response,
    @Query('width') width?: number,
    @Query('height') height?: number,
  ) {
    const image = await this.fileService.getImage(filename, width, height);
    image.pipe(res as any);
  }
}