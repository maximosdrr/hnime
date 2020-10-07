import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { MovieLink } from 'src/entities/movie-link.entity';
import { Movie } from 'src/entities/movie.entity';
import { DeleteResult } from 'src/interfaces/delete-result';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('insert')
  insert(@Body() movie: Movie): Promise<Movie> {
    return this.movieService.insert(movie);
  }

  @Post('find')
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Body() body,
  ): Promise<Movie[]> {
    return this.movieService.findAll(body.where, body.order, limit, page);
  }

  @Get('find-by-id')
  findOneById(@Query('id') id: string) {
    return this.movieService.findOneById(id);
  }

  @Put('update')
  update(@Body() movie: Movie): Promise<Movie> {
    return this.movieService.update(movie);
  }

  @Delete('delete')
  delete(@Query('id') id: string): Promise<DeleteResult> {
    return this.movieService.delete(id);
  }

  @Post('link/insert')
  insertLink(@Body() link: MovieLink): Promise<MovieLink> {
    return this.movieService.insertLink(link);
  }

  @Put('link/update')
  updateLink(@Body() link: MovieLink): Promise<MovieLink> {
    return this.movieService.updateLink(link);
  }

  @Delete('link/delete')
  deleteLink(@Query('id') id: string): Promise<DeleteResult> {
    return this.movieService.deleteLink(id);
  }

  @Put('put-category')
  insertCategory(
    @Query('animeId') id: string,
    @Body() category: Category,
  ): Promise<Movie> {
    return this.movieService.putCategory(id, category);
  }

  @Put('delete-category')
  deleteCategory(
    @Query('animeId') id: string,
    @Body() category: Category,
  ): Promise<Movie> {
    return this.movieService.deleteCategory(id, category);
  }

  @Get('find-by-category')
  findByCategory(
    @Query('category') category: string,
    @Query('order') order: string,
  ): Promise<Movie[]> {
    return this.movieService.findByCategory(category, order);
  }
}
