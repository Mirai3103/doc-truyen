import { AuthorService } from '@/author/author.service';
import { Chapter, ChapterDocument } from '@/chapter/schema/chapter.schema';
import { Comic, ComicDocument, Status } from '@/comic/schema/comic.schema';
import { UtilService } from '@/common/util.service';
import { Team, TeamDocument } from '@/team/schema/team.schema';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { load } from 'cheerio';
import { writeFile, writeFileSync } from 'fs';
import { Model } from 'mongoose';
// https://api.comick.app/v1.0/search?q=blue+box&t=true
@Injectable()
export class ComikService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Comic.name) private mangaModel: Model<ComicDocument>,
    @InjectModel(Chapter.name) private chapterModel: Model<ChapterDocument>,
    private readonly authorService: AuthorService,
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
    private readonly utilsService: UtilService,
  ) {}
  private async searchByName(name: string) {
    const url = `https://api.comick.app/v1.0/search?q=${name}&t=true`;
    const response = await axios.get(url);
    const { title, slug, id } = response.data[0];
    if (!title) return null;
    if (
      !this.utilsService
        .slugfy(title)
        .replace(/-/g, '')
        .startsWith(this.utilsService.slugfy(name).replace(/-/g, ''))
    )
      return null;
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
    for (const comic of comics) {
      const asciiName = comic.otherNames.find((name) => !this.hasUnicode(name));
      if (!asciiName) {
        notFound.push(comic.otherNames);
        continue;
      }
      const rs = await this.searchByName(asciiName);
      if (!rs) {
        notFound.push(asciiName);
        continue;
      }
      const { title, slug, id } = rs;
      console.log('done id' + id);
      listCrawled.push({
        comikId: id,
        slug,
        comikTitle: title,
        name: asciiName,
        _id: comic._id,
      });
    }
    writeFileSync('comik.json', JSON.stringify(listCrawled, null, 2));
    writeFileSync('notfound.json', JSON.stringify(notFound, null, 2));
  }
  private hasUnicode(str: string) {
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 255) {
        return true;
      }
    }
    return false;
  }
  private async getData(slug: string): Promise<IPageProps> {
    //https://comick.app/comic/
    const url = `https://comick.app/comic/${slug}`;
    const response = await axios.get(url);
    const $ = load(response.data);
    const jsonStr = $('script#__NEXT_DATA__').text();
    const regex = /Origination:<!-- -->\s+<\/span><span>(.*)<\/span>/;
    const origination = regex.exec(response.data)![1];

    const json = JSON.parse(jsonStr) as IRoot;
    json.props.pageProps.origination = origination;
    return json.props.pageProps;
  }
}
interface IRoot {
  props: IProps;
}

interface IProps {
  pageProps: IPageProps;
}

interface IPageProps {
  comic: Comic;
  artists: IArtist[];
  authors: IAuthor[];
  genres: IGenre[];
  origination: string;
}

interface IComic {
  hentai: boolean;
  slug: string;
  year: number;
  md_comic_md_genres: MdComicMdGenre[];
}

interface MdComicMdGenre {
  md_genres: MdGenres;
}

interface MdGenres {
  name: string;
  type?: string;
  slug: string;
  group: string;
}

interface IArtist {
  name: string;
  slug: string;
}

interface IAuthor {
  name: string;
  slug: string;
}

interface IGenre {
  slug: string;
  name: string;
}
