import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { load } from 'cheerio';
import Humanoid from 'humanoid-js';
@Injectable()
export class CrawlService {
  private readonly logger = new Logger(CrawlService.name);
  private readonly humanoid = new Humanoid();
  public async crawl() {
    const res = await this.humanoid.get(
      'https://nhattruyento.com/the-loai/manga-241?page=1',
    );
    const $ = load(res.body);
    console.log(res.body);
  }
}
