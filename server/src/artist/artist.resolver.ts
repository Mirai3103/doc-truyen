import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ArtistService } from './artist.service';
import { Artist } from './schema/artist.schema';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Resolver(() => Artist)
export class ArtistResolver {
  constructor(private readonly artistService: ArtistService) {}
  @Query(() => Artist)
  async artist(@Args('id') id: string) {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException(id);
    }
    return artist;
  }
  @Query(() => [Artist])
  async artists() {
    return await this.artistService.findAll();
  }
  @Mutation(() => Artist)
  async createArtist(
    @Args('createArtistInput') createArtistDto: CreateArtistDto,
  ) {
    return await this.artistService.create(createArtistDto);
  }
  @Mutation(() => Artist)
  async updateArtist(
    @Args('id') id: string,
    @Args('updateArtistInput') updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistService.update(id, updateArtistDto);
    if (!artist) {
      throw new NotFoundException(id);
    }
    return artist;
  }
}
