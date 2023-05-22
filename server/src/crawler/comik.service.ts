import { Comic, ComicDocument } from '@/comic/schema/comic.schema';
import { UtilService } from '@/common/util.service';
import { Tag, TagDocument, TagType } from '@/tag/schema/tag.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { load } from 'cheerio';
import { distance } from 'fastest-levenshtein';
import Humanoid from 'humanoid-js';
import { Model } from 'mongoose';
// https://api.comick.app/v1.0/search?q=blue+box&t=true
@Injectable()
export class ComikService {
  private readonly humanoid: Humanoid;
  constructor(
    @InjectModel(Comic.name) private mangaModel: Model<ComicDocument>,
    private readonly utilsService: UtilService,
    @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
  ) {
    this.humanoid = new Humanoid();
  }

  public async getBestMatch(name: string[]) {
    let list = await Promise.all(name.map((item) => this.searchByName(item)));
    list = list.filter((item) => item !== null);
    if (list.length === 0) {
      console.log(name, 'not found');
      return null;
    }
    const bestMatch = list.reduce((prev, curr) => {
      return prev!.distance < curr!.distance ? prev : curr;
    });
    return bestMatch?.result;
  }

  private async searchByName(name: string) {
    const url = `https://api.comick.app/v1.0/search?q=${encodeURIComponent(
      name,
    )}&limit=1&page=1`.replace(' ', '%20');

    try {
      const response: any = await new Promise((resolve, reject) => {
        this.humanoid
          .get(url)
          .then((res) => JSON.parse(res.body))
          .then(resolve)
          .catch((e) => resolve([{}]));
      });
      const { title, slug, id } = response[0];

      if (!title) return null;

      return {
        name,
        distance: distance(name.toLowerCase(), title.toLowerCase()),
        result: {
          title,
          slug,
          id,
        },
      };
    } catch (e) {
      return null;
    }
  }
  public async crawlNewManga() {
    const newComics = this.mangaModel.find({
      $or: [{ genres: { $size: 0 } }, { genres: { $exists: false } }],
    });
    const listCrawled = [];
    let i = 0;
    for await (const comic of newComics) {
      if (comic.genres.length > 0) continue;

      const rs = await this.getBestMatch([...comic.otherNames, comic.title]);
      if (!rs) {
        continue;
      }
      const { title, slug, id } = rs;
      listCrawled.push({
        comikId: id,
        slug,
        comikTitle: title,
        comic: comic,
      });
      console.log(++i + ' doned');
    }
    i = 0;
    for await (const item of listCrawled) {
      try {
        console.log('start crawl', ++i);
        const obj = await this.getData(item.slug);

        let category = await this.createIfTagNotFound(obj.origination);
        if (!category) {
          category = await this.createIfTagNotFound('manga');
        }
        category!.type = TagType.Category;
        category?.save({
          timestamps: false,
        });
        if (category) item.comic.category = category;
        const tags = await Promise.all(
          obj.listSpanGenres.map((tag) => this.createIfTagNotFound(tag)),
        );
        item.comic.genres = [];
        tags.forEach((tag) => {
          if (tag) item.comic.genres.push(tag);
        });
        await item.comic.save({
          timestamps: false,
        });
      } catch (e) {
        console.error(item.comic.id, item.comikId, e);
      }
    }
    console.log('done');
  }

  public async crawlTagAndAuthor() {
    const comics = await this.mangaModel.find();
    const listCrawled = [];
    let i = 0;
    for await (const comic of comics) {
      if (comic.genres.length > 0) continue;
      // const asciiName = comic.otherNames.find((name) => !this.hasUnicode(name));
      // if (!asciiName) {
      //   notFound.push(comic.otherNames);
      //   continue;
      // }
      const rs = await this.getBestMatch([...comic.otherNames, comic.title]);
      if (!rs) {
        continue;
      }
      const { title, slug, id } = rs;
      listCrawled.push({
        comikId: id,
        slug,
        comikTitle: title,
        comic: comic,
      });
      console.log(++i + ' doned');
    }
    i = 0;
    for await (const item of listCrawled) {
      try {
        console.log('start crawl', ++i);
        const obj = await this.getData(item.slug);

        let category = await this.createIfTagNotFound(obj.origination);
        if (!category) {
          category = await this.createIfTagNotFound('manga');
        }
        category!.type = TagType.Category;
        category?.save({
          timestamps: false,
        });
        if (category) item.comic.category = category;
        const tags = await Promise.all(
          obj.listSpanGenres.map((tag) => this.createIfTagNotFound(tag)),
        );
        item.comic.genres = [];
        tags.forEach((tag) => {
          if (tag) item.comic.genres.push(tag);
        });
        await item.comic.save({
          timestamps: false,
        });
      } catch (e) {
        console.error(item.comic.id, item.comikId, e);
      }
    }
    console.log('done');
  }
  private async createIfTagNotFound(tag: string) {
    if (tag === '') return null;

    const slug = this.utilsService.slugfy(tag);
    const existed = await this.tagModel.findOne({ slug });
    if (existed) return existed;
    const newTag = new this.tagModel({
      name: tag,
      slug,
      description: null,
    });
    return await newTag.save({
      timestamps: false,
    });
  }
  private hasUnicode(str: string) {
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 255) {
        return true;
      }
    }
    return false;
  }
  private async getData(slug: string) {
    const url = `https://comick.app/comic/${slug}`;
    const response = await new Promise((resolve, reject) => {
      this.humanoid
        .get(url)
        .then((res) => resolve(res))
        .catch((e) => resolve({ body: '' }));
    });

    const $ = load((response as any).body);
    const origination = $('.text-gray-500:contains("Origination:")')
      .first()
      .next()
      .text()
      .trim();
    const listSpanGenres = $('.text-gray-500.flex-shrink-0:contains("Genres:")')
      .first()
      .next()
      .text()
      .split(',')
      .map((item) => item.trim());
    return {
      listSpanGenres,
      origination,
    };
  }
}
