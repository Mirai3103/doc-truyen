import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Author } from './schema/author.schema';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}
  @Query(() => Author)
  async author(@Args('id') id: string) {
    const author = await this.authorService.findOne(id);
    if (!author) {
      throw new NotFoundException(id);
    }
    return author;
  }
  @Query(() => [Author])
  async authors() {
    return await this.authorService.findAll();
  }
  @Mutation(() => Author)
  async createAuthor(
    @Args('createAuthorInput') createAuthorDto: CreateAuthorDto,
  ) {
    return await this.authorService.create(createAuthorDto);
  }
  @Mutation(() => Author)
  async updateAuthor(
    @Args('id') id: string,
    @Args('updateAuthorInput') updateAuthorDto: UpdateAuthorDto,
  ) {
    const author = await this.authorService.update(id, updateAuthorDto);
    if (!author) {
      throw new NotFoundException(id);
    }
    return author;
  }
}
