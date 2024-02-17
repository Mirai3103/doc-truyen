import { Inject, Injectable } from '@nestjs/common';
import { AuthorService } from '../author.service';
import { OnEvent } from '@nestjs/event-emitter';
import { ComicCreatedEvent } from '@/comic/events';
import { InjectModel } from '@nestjs/mongoose';
import { Author, AuthorDocument } from '../schema/author.schema';
import { Model } from 'mongoose';

@Injectable()
export class ComicEventHandlers {
  constructor(
    @InjectModel(Author.name)
    private authorModel: Model<AuthorDocument>,
  ) {}

  @OnEvent('comic.created')
  async handleComicCreatedEvent(event: ComicCreatedEvent) {
    this.authorModel.updateOne(
      { _id: event.payload.author._id },
      { $inc: { totalComics: 1 } },
    );
  }

  @OnEvent('comic.deleted')
  async handleComicDeletedEvent(event: ComicCreatedEvent) {
    this.authorModel.updateOne(
      { _id: event.payload.author._id },
      { $inc: { totalComics: -1 } },
    );
  }
}
