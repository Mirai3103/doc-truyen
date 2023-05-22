/*
https://docs.nestjs.com/providers#services
*/

import { AuthorService } from '@/author/author.service';
import { Chapter, ChapterDocument } from '@/chapter/schema/chapter.schema';
import { ComicService } from '@/comic/comic.service';
import { Comic, ComicDocument, Status } from '@/comic/schema/comic.schema';
import { UtilService } from '@/common/util.service';
import { Role, User } from '@/user/schema/user.schema';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { readFileSync, writeFileSync } from 'fs';
import mongoose, { Model } from 'mongoose';
import {
  IChapter,
  IChapterPreview,
  IManga,
  IPreviewManga,
  ITeam,
} from './crawler.type';

@Injectable()
export class CrawlerService {
  private readonly fakePages: IPageFaker[];
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Comic.name) private mangaModel: Model<ComicDocument>,
    @InjectModel(Chapter.name) private chapterModel: Model<ChapterDocument>,
    private readonly authorService: AuthorService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly utilsService: UtilService,
    private readonly comicService: ComicService,
  ) {
    this.fakePages = JSON.parse(readFileSync('fakePages.json', 'utf-8'));
  }
  // private bindUrl: any[] = [];
  private async getIds(to = 12) {
    const ids: number[] = [];
    for (let i = 1; i <= to; i++) {
      const url = `https://kakarot.cuutruyen.net/api/v2/mangas/recently_updated?page=${i}&per_page=${50}`;
      const response: any = await axios.get(url);
      const data = response.data.data as IPreviewManga[];
      data.forEach((item) => {
        ids.push(item.id);
      });
    }
    writeFileSync('ids.json', JSON.stringify(ids));
    return ids;
  }
  async crawlData() {
    await this.mangaModel.deleteMany({}).exec();
    await this.chapterModel.deleteMany({}).exec();
    await this.userModel
      .deleteMany({
        role: Role.CREATOR,
      })
      .exec();
    const ids: number[] = await this.getIds();
    let count = 0;
    for await (const id of ids) {
      await this.crawlManga(id);
      count++;
      console.info('đã xong: ', count);
    }
  }
  private async getIdsNew() {
    // https://cuutruyen.net/api/v2/home_a
    const res = await axios.get('https://cuutruyen.net/api/v2/home_a');
    const data = res.data.data.new_chapter_mangas;
    return data.map((item: any) => item.id);
  }
  public async crawNewChapter() {
    const ids: number[] = await this.getIdsNew();
    console.log(ids);
    for await (const id of ids) {
      await this.crawlManga(id);
    }
  }
  private async crawlManga(id: number) {
    const res: any = await axios.get(
      `https://kakarot.cuutruyen.net/api/v2/mangas/${id}`,
    );
    const manga: IManga = res.data.data;
    //check if manga exist
    const mangaExist = await this.mangaModel.findOne({
      slug: this.utilsService.slugfy(manga.name),
    });
    if (mangaExist) {
      const chapters = await this.chapterModel.find({
        comic: mangaExist._id,
      });
      if (chapters.length == manga.chapters_count) {
        // throw new Error('stop');
        return;
      }
      const res: any = await axios.get(
        `https://kakarot.cuutruyen.net/api/v2/mangas/${manga.id}/chapters`,
      );
      const chaptersC: IChapterPreview[] = res.data.data;
      const ct = chaptersC
        .map((chapter) => {
          return {
            chapterNumber: chapter.number,
            ...chapter,
          };
        })
        .filter((chapter) => {
          const exist = chapters.find(
            (item) => item.chapterNumber == chapter.chapterNumber,
          );
          return exist == null;
        });

      const listPromises = ct.map((chapter) =>
        this.crawlChapterDetail(chapter, mangaExist._id),
      );

      await Promise.all(listPromises);
      await this.comicService.updateUpdatedAt(mangaExist._id + '');
      return;
    }
    console.log('crawling new manga: ', manga.name);
    const author = await this.authorService.createIfNotExist(
      manga.author.name || 'unknown',
    );
    const team = await this.createCreatorIfNotExist(manga.team);

    const newMangaObj = {
      createdAt: new Date(manga.created_at),
      updatedAt: new Date(manga.updated_at),
      name: manga.name,
      slug: this.utilsService.slugfy(manga.name),
      totalViewCount: manga.views_count,
      officeUrl: manga.official_url,
      description:
        manga.full_description == null
          ? manga.description
          : manga.full_description,
      imageCoverUrl: manga.cover_url,
      imageThumbUrl: manga.panorama_url,
      status: Status.Ongoing,
      otherNames: manga.titles.map((title) => title.name),
      author: author,
      createdBy: team,
    };
    const newManga = new this.mangaModel(newMangaObj);
    const mangaSaved = await newManga.save({
      timestamps: false,
    });
    await this.crawlChapter(id, mangaSaved);
  }
  private async createCreatorIfNotExist(iteam: ITeam) {
    const team = await this.userModel.findOne({
      displayName: iteam.name,
    });
    if (team) {
      return team;
    }
    const slug = this.utilsService.slugfy(iteam.name).replace(/-/g, '');
    const newTeamObj = {
      displayName: iteam.name,
      createdAt: new Date(iteam.created_at),
      updatedAt: new Date(iteam.updated_at),
      description:
        iteam.description + iteam.facebook_address
          ? `<br/> <a href="https://facebook.com/${iteam.facebook_address}" target="_blank">Facebook</a>`
          : '',
      email: slug + '@gmail.com',
      hashPassword: await this.utilsService.hash('123456'),
      username: slug,
      role: Role.CREATOR,
    };
    const newTeam = new this.userModel(newTeamObj);
    return await newTeam.save({
      timestamps: false,
    });
  }
  private async crawlChapter(mangaId: number, mangaDoc: ComicDocument) {
    //  https://kakarot.cuutruyen.net/api/v2/mangas/576/chapters
    const res: any = await axios.get(
      `https://kakarot.cuutruyen.net/api/v2/mangas/${mangaId}/chapters`,
    );
    const chapters: IChapterPreview[] = res.data.data;
    const listPromises = chapters.map((chapter) =>
      this.crawlChapterDetail(chapter, mangaDoc._id),
    );

    await Promise.all(listPromises);
  }
  private async crawlChapterDetail(
    chapter: IChapterPreview,
    mangaObjId: mongoose.Schema.Types.ObjectId,
  ) {
    try {
      const res: any = await axios.get(
        `https://kakarot.cuutruyen.net/api/v2/chapters/${chapter.id}`,
      );
      const chapterDetail: IChapter = res.data.data;
      const pages = [];
      for (let i = 0; i < chapterDetail.pages.length; i++) {
        const page = this.fakePages[i % this.fakePages.length];

        // pages.push({
        //   url: page.image_url,
        //   order: page.order,
        // });
        pages.push({
          url: page.url,
          order: i + 1,
        });
      }

      const newChapterObj = {
        chapterNumber: chapterDetail.number,
        createdAt: new Date(chapterDetail.created_at),
        updatedAt: new Date(chapterDetail.updated_at),
        order: chapterDetail.order,
        comic: mangaObjId,
        name: chapterDetail.name,
        pages: pages,
      };
      const newChapter = new this.chapterModel(newChapterObj);
      await newChapter.save({
        timestamps: false,
      });
    } catch (e) {
      console.error('error', e);
      throw e;
    }
  }
}

interface IPageFaker {
  url: string;
  page: number;
}
