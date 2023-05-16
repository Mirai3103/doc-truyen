import { WithRoleGuard } from '@/auth/guard/roles.guard';
import { Role } from '@/user/schema/user.schema';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { QueryAuthorsDTO } from './dto/queryAuthor.dto';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';
import { Author } from './schema/author.schema';

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
  @UseGuards(new WithRoleGuard(Role.CREATOR))
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
  @Query(() => QueryAuthorsDTO)
  async searchAuthor(
    @Args('keyword', { defaultValue: '', nullable: true }) keyword: string,
    @Args('page', { defaultValue: 1, nullable: true }) page: number,
    @Args('limit', { defaultValue: 25, nullable: true }) limit: number,
  ) {
    const result = await this.authorService.findAllPaginated(
      page,
      limit,
      keyword,
    );
    return result;
  }
  @Mutation(() => Boolean)
  async deleteAuthor(@Args('id') id: string) {
    await this.authorService.delete(id);
    return true;
  }
}
