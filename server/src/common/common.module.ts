/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UtilService } from './util.service';

@Module({
  exports: [UtilService],
  providers: [UtilService],
})
export class CommonModule {}
