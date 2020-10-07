import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Anime } from 'src/entities/anime.entity';
import { Category } from 'src/entities/category.entity';
import { DeleteResult } from 'src/interfaces/delete-result';
import { AnimeService } from './anime.service';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post('insert')
  insert(@Body() anime: Anime): Promise<Anime> {
    return this.animeService.insert(anime);
  }

  @Post('find')
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Body() body,
  ): Promise<Anime[]> {
    return this.animeService.findAll(limit, page, body.where, body.order);
  }

  @Get('find-by-id')
  findOneById(@Query('id') id: string): Promise<Anime> {
    return this.animeService.findOneById(id);
  }

  @Delete('delete')
  delete(@Query('id') id: string): Promise<DeleteResult> {
    return this.animeService.delete(id);
  }

  @Put('update')
  update(@Body() anime: Anime): Promise<Anime> {
    return this.animeService.update(anime);
  }

  @Put('update-number-of-episodes')
  updateNumberOfEpisodes(
    @Query('id') id: string,
    @Query('decrement') decrement: boolean,
  ): Promise<Anime> {
    return this.animeService.updateNumberOfEps(id, decrement);
  }

  @Put('update-number-of-movies')
  updateNumberOfMovies(
    @Query('id') id: string,
    @Query('decrement') decrement: boolean,
  ): Promise<Anime> {
    return this.animeService.updateNumberOfMovies(id, decrement);
  }

  @Put('put-category')
  insertCategory(
    @Query('animeId') id: string,
    @Body() category: Category,
  ): Promise<Anime> {
    return this.animeService.putCategory(id, category);
  }

  @Put('delete-category')
  deleteCategory(
    @Query('animeId') id: string,
    @Body() category: Category,
  ): Promise<Anime> {
    return this.animeService.deleteCategory(id, category);
  }

  @Get('find-by-category')
  findByCategory(
    @Query('category') category: string,
    @Query('order') order: string,
  ): Promise<Anime[]> {
    return this.animeService.findByCategory(category, order);
  }
}
