import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ComicCreatedEvent } from '@/comic/events';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument } from '../schema/tag.schema';
import { Model } from 'mongoose';

@Injectable()
export class ComicEventHandlers {
  constructor(
    @InjectModel(Tag.name)
    private tagModel: Model<TagDocument>,
  ) {}

  @OnEvent('comic.created')
  async handleComicCreatedEvent(event: ComicCreatedEvent) {
    this.tagModel.updateOne(
      {
        _id: {
          $in: [
            ...event.payload.genres.map((tag) => tag._id),
            event.payload.category._id,
          ],
        },
      },
      { $inc: { totalComics: 1 } },
    );
  }

  @OnEvent('comic.deleted')
  async handleComicDeletedEvent(event: ComicCreatedEvent) {
    this.tagModel.updateOne(
      {
        _id: {
          $in: [
            ...event.payload.genres.map((tag) => tag._id),
            event.payload.category._id,
          ],
        },
      },
      { $inc: { totalComics: -1 } },
    );
  }
}
