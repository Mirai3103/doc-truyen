import { IsString, MinLength, ValidateIf, MaxLength } from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
export class CreateAuthorDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;
  @IsString()
  @ValidateIf((o) => o.description !== undefined)
  @MaxLength(100)
  description: string;
}

export const createAuthorDtoResolver = classValidatorResolver(CreateAuthorDto);

export class UpdateAuthorDto extends CreateAuthorDto {}

export const updateAuthorDtoResolver = classValidatorResolver(UpdateAuthorDto);
