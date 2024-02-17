/* eslint-disable @typescript-eslint/ban-types */
import { Document } from 'mongoose';
import { Comic } from '../schema/comic.schema';

// all properties of the payload is coming from the comic schema without methods

type ComicCreatedPayload = Omit<
  {
    [field in keyof Comic]: Comic[field] extends Function
      ? never
      : Comic[field];
  },
  keyof Document
>;
export class ComicCreatedEvent {
  constructor(public comicId: string, public payload: ComicCreatedPayload) {}
}
type ComicDeletedPayload = Omit<
  {
    [field in keyof Comic]: Comic[field] extends Function
      ? never
      : Comic[field];
  },
  keyof Document
>;

export class ComicDeletedEvent {
  constructor(public comicId: string, public payload: ComicDeletedPayload) {}
}
