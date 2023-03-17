import { Connection } from 'mongoose';
import { AuthorSchema } from './schema/author.schema';

export const authorProviders = [
  {
    provide: 'AUTHOR_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Author', AuthorSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
