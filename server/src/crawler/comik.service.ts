import { Comic, ComicDocument } from '@/comic/schema/comic.schema';
import { UtilService } from '@/common/util.service';
import { Tag, TagDocument, TagType } from '@/tag/schema/tag.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { load } from 'cheerio';
import { writeFileSync } from 'fs';
import { Model } from 'mongoose';
// https://api.comick.app/v1.0/search?q=blue+box&t=true
@Injectable()
export class ComikService {
  constructor(
    @InjectModel(Comic.name) private mangaModel: Model<ComicDocument>,
    private readonly utilsService: UtilService,
    @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
  ) {}
  private async searchByName(name: string) {
    const url = `https://api.comick.app/v1.0/search?q=${name}&t=true`;
    const response = await axios.get(url);
    const { title, slug, id } = response.data[0];
    if (!title) return null;
    const name1 = this.utilsService.slugfy(name).replace(/-/g, '');
    const name2 = this.utilsService.slugfy(title).replace(/-/g, '');
    if (!name1.includes(name2) && !name2.includes(name1)) return null;
    return {
      title,
      slug,
      id,
    };
  }
  public async generateJson() {
    const comics = await this.mangaModel.find();
    const listCrawled = [];
    const notFound = [];
    let i = 0;
    for await (const comic of comics) {
      if (comic.genres.length > 0) continue;
      const asciiName = comic.otherNames.find((name) => !this.hasUnicode(name));
      if (!asciiName) {
        notFound.push(comic.otherNames);
        continue;
      }
      const rs = await this.searchByName(asciiName);
      if (!rs) {
        notFound.push({
          asciiName,
          others: comic.otherNames,
        });
        continue;
      }
      const { title, slug, id } = rs;
      listCrawled.push({
        comikId: id,
        slug,
        comikTitle: title,
        name: asciiName,
        comic: comic,
      });
      console.log(++i + ' doned');
    }
    i = 0;
    for await (const item of listCrawled) {
      console.log('start crawl', ++i);
      const obj = await this.getData(item.slug);

      let category = await this.createIfTagNotFound(obj.origination);
      if (!category) {
        category = await this.createIfTagNotFound('manga');
      }
      category!.type = TagType.Category;
      category?.save();
      if (category) item.comic.category = category;
      const tags = await Promise.all(
        obj.listSpanGenres.map((tag) => this.createIfTagNotFound(tag)),
      );
      item.comic.genres = [];
      tags.forEach((tag) => {
        if (tag) item.comic.genres.push(tag);
      });
      await item.comic.save();
    }
    //write not found
    writeFileSync('not-found.json', JSON.stringify(notFound, null, 2), 'utf-8');

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
    return await newTag.save();
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
    const response = await axios.get(url);
    const $ = load(response.data);
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
