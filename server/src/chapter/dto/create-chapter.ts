import { Field, InputType } from '@nestjs/graphql';
import { Page } from '../schema/chapter.schema';

@InputType()
export default class CreateChapterDto {
  @Field({ nullable: true })
  name?: string;
  @Field()
  chapterNumber: string;
  @Field()
  comicId: string;
  @Field(() => [Page])
  pages: Page[];
  userId: string;
}
