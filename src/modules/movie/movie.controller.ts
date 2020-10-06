import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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
}
