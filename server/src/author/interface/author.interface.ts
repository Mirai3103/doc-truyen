import { Document } from 'mongoose';

export interface Author extends Document {
  readonly name: string;
  readonly slug: string;
  readonly description: string;
}
