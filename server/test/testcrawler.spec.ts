import { AppModule } from '@/app.module';
import { ComikService } from '@/crawler/comik.service';
import { Test, TestingModule } from '@nestjs/testing';
import dotenv from 'dotenv';

describe('crawler stest', () => {
  let module: TestingModule;
  let comickService: ComikService;
  dotenv.config({
    path: 'dev.env',
  });

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    comickService = await module.get(ComikService);
  }, 100000);
  it('should be not null', async () => {
    const a = await comickService.getBestMatch([
      'Shounen no Abyss',
      "Boy's Abyss",
      '少年のアビス',
      'World End Boy Meets Girl',
      '소년의 어비스',
      'केटाको रसातल',
      'Бездна подростка',
      'Юношеская бездна',
      'Oğlanın Hiçliği',
      '少年的深淵',
    ]);
  });
});
