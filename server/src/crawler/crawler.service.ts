/*
https://docs.nestjs.com/providers#services
*/

import { AuthorService } from '@/author/author.service';
import { Author, AuthorDocument } from '@/author/schema/author.schema';
import { Chapter, ChapterDocument } from '@/chapter/schema/chapter.schema';
import { Comic, ComicDocument, Status } from '@/comic/schema/comic.schema';
import { UtilService } from '@/common/util.service';
import { Team, TeamDocument } from '@/team/schema/team.schema';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { writeFile } from 'fs';
import { ObjectId } from 'mongodb';
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
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Comic.name) private mangaModel: Model<ComicDocument>,
    @InjectModel(Chapter.name) private chapterModel: Model<ChapterDocument>,
    private readonly authorService: AuthorService,
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
    private readonly utilsService: UtilService,
  ) {}
  private bindUrl: any[] = [];
  private async getIds() {
    const ids: number[] = [];
    for (let i = 1; i <= 1; i++) {
      const url = `https://kakarot.cuutruyen.net/api/v2/mangas/recently_updated?page=${i}&per_page=${50}`;
      const response: any = await axios.get(url);
      const data = response.data.data as IPreviewManga[];
      data.forEach((item) => {
        ids.push(item.id);
      });
    }
    return ids;
  }
  async crawlData() {
    const ids: number[] = await this.getIds();
    let count = 0;
    for await (const id of ids) {
      await this.crawlManga(id);
      count++;
      console.log('đã xong: ', count);
      if (count == 50) break;
    }
    writeFile('bindUrl.json', JSON.stringify(this.bindUrl), (err) => {
      if (err) {
        console.log(err);
      }
    });
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
      return;
    }

    const author = await this.authorService.createIfNotExist(
      manga.author.name || 'unknown',
    );
    const team = await this.createTeamIfNotExist(manga.team);
    const newMangaObj = {
      createdAt: new Date(manga.created_at),
      updatedAt: new Date(manga.updated_at),
      name: manga.name,
      slug: this.utilsService.slugfy(manga.name),
      followCount: manga.views_count,
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
      team: team,
    };
    const newManga = new this.mangaModel(newMangaObj);
    const mangaSaved = await newManga.save();
    await this.crawlChapter(id, mangaSaved);
  }
  private async createTeamIfNotExist(iteam: ITeam): Promise<TeamDocument> {
    const nameSlug = this.utilsService.slugfy(iteam.name);
    const team = await this.teamModel.findOne({
      slug: nameSlug,
    });
    if (team) {
      return team;
    }
    const newTeamObj = {
      name: iteam.name,
      slug: nameSlug,
      createdAt: new Date(iteam.created_at),
      updatedAt: new Date(iteam.updated_at),
      description: iteam.description,
      officialUrl: iteam.facebook_address,
    };
    const newTeam = new this.teamModel(newTeamObj);
    return await newTeam.save();
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
      //https://kakarot.cuutruyen.net/api/v2/chapters/14962
      const res: any = await axios.get(
        `https://kakarot.cuutruyen.net/api/v2/chapters/${chapter.id}`,
      );
      const chapterDetail: IChapter = res.data.data;
      const pages = [];
      for (let i = 0; i < chapterDetail.pages.length; i++) {
        const page = chapterDetail.pages[i];
        const localName = await this.utilsService.downloadFile(page.image_url);
        this.bindUrl.push({
          url: page.image_url,
          localName: localName,
        });
        pages.push({
          url: localName,
          order: page.order,
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
      await newChapter.save();
      console.log('done', chapterDetail.number);
    } catch (e) {
      console.log('error', e);
      throw e;
    }
  }
}
