import { TeamService } from '../src/team/team.service';
import { UserService } from '@/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '@/user/schema/user.schema';
import { Team } from '@/team/schema/team.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { UtilService } from '@/common/util.service';
import assert from 'assert';
import { CrawlerService } from '@/crawler/crawler.service';
//https://kakarot.cuutruyen.net/api/v2/mangas/recently_updated?page=1&per_page=30
describe('crawData', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });
  it('should crawl data', async () => {
    const crawlerService = module.get(CrawlerService);
    //should not throw error
    assert.doesNotThrow(async () => {
      await crawlerService.crawlData();
    });
  });
});
