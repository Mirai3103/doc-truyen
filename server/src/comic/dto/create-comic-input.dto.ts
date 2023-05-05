import { Field, HideField, InputType } from '@nestjs/graphql';
import { IsArray, IsString, ValidateIf } from 'class-validator';
import { Status } from '../schema/comic.schema';

@InputType()
export default class CreateComicInput {
  @IsString({ message: 'Tên truyện không được để trống' })
  @Field()
  name: string;
  @IsArray()
  @Field(() => [String], { nullable: true })
  otherNames: string[];
  @IsString()
  @Field({
    defaultValue: '',
  })
  description: string;
  @IsString()
  @Field()
  imageCoverUrl: string;
  @IsString()
  @Field()
  imageThumbUrl: string;
  @IsString()
  @ValidateIf((o) => o.officeUrl)
  @Field({ nullable: true })
  officeUrl?: string;
  @Field({ defaultValue: Status.NonPublished, nullable: true })
  status: Status = Status.NonPublished;
  @IsString({
    message: 'Thể loại không được để trống',
  })
  @Field()
  categoryId: string;
  @IsString({ message: 'Tác giả không được để trống' })
  @Field()
  authorId: string;
  @IsString()
  @ValidateIf((o) => o.artistId)
  @Field({ nullable: true })
  artistId?: string;
  @IsArray()
  @Field(() => [String])
  genreIds: string[];
  @HideField()
  userId: string;
}
