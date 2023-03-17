/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/createAuthor.dto';

@Controller('authors')
export class AuthorController {
  constructor(
    @Inject(AuthorService) private readonly authorService: AuthorService,
  ) {}
  @Get()
  async findAll() {
    return await this.authorService.findAll();
  }
  @Post()
  async create(@Body() author: CreateAuthorDto) {
    return await this.authorService.create(author);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.authorService.findOne(id);
  }
}
