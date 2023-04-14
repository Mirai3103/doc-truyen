import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChapterOrder {
  @Field()
  id: string;
  @Field()
  order: number;
}
@InputType()
export default class UpdateChaptersOrderInput {
  @Field(() => [ChapterOrder])
  chapters: ChapterOrder[];
}
