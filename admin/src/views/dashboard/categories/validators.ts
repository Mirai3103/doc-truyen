import { IsString, MinLength, ValidateIf, MaxLength } from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
export enum TagType {
  Category = "category",
  Genre = "genre",
}
export const TAG_TYPES = [
  {
    value: TagType.Category,
    label: "Danh mục",
  },
  {
    value: TagType.Genre,
    label: "Thể loại",
  },
];
export class CreateTagDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;
  @IsString()
  @ValidateIf((o) => o.description !== undefined)
  @MaxLength(100)
  description: string;
  @IsString()
  type: TagType;
}

export const createTagDtoResolver = classValidatorResolver(CreateTagDto);

export class UpdateTagDto extends CreateTagDto {}

export const updateTagDtoResolver = classValidatorResolver(UpdateTagDto);
