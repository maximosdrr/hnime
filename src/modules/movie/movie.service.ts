import { Injectable } from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { MovieLink } from 'src/entities/movie-link.entity';
import { Movie } from 'src/entities/movie.entity';
import { pageCalculation } from 'src/features/calculations/page-calculation';
import { DeleteResult } from 'src/interfaces/delete-result';
import { OrderByCondition, WhereExpression } from 'typeorm';
import { MovieLinkRepo } from './repositories/movie-link/repository';
import { MovieRepo } from './repositories/movie/repository';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepo: MovieRepo,
    private readonly movieLinkRepo: MovieLinkRepo,
  ) {}

  insert(movie: Movie): Promise<Movie> {
    return this.movieRepo.insert(movie);
  }

  findAll(
    where: WhereExpression,
    order: OrderByCondition,
    limit: number,
    skip: number,
  ): Promise<Movie[]> {
    const page = pageCalculation(limit, skip);
    return this.movieRepo.findAll(where, order, limit || 10, page || 0);
  }

  findOneById(id: string): Promise<Movie> {
    return this.movieRepo.findOneById(id);
  }

  update(movie: Movie): Promise<Movie> {
    return this.movieRepo.update(movie);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.movieRepo.delete(id);
  }

  insertLink(link: MovieLink): Promise<MovieLink> {
    return this.movieLinkRepo.insert(link);
  }

  updateLink(link: MovieLink): Promise<MovieLink> {
    return this.movieLinkRepo.update(link);
  }

  deleteLink(id: string): Promise<DeleteResult> {
    return this.movieLinkRepo.delete(id);
  }

  async putCategory(id: string, category: Category): Promise<Movie> {
    const movieToAddCategory = await this.findOneById(id);
    movieToAddCategory.categories.push(category);
    return this.movieRepo.update(movieToAddCategory);
  }

  async deleteCategory(id: string, category: Category): Promise<Movie> {
    const movieToDeleteCategory = await this.findOneById(id);
    movieToDeleteCategory.categories = movieToDeleteCategory.categories.filter(
      value => category.id != value.id,
    );
    return this.movieRepo.update(movieToDeleteCategory);
  }

  findByCategory(category: string, order: string): Promise<Movie[]> {
    return this.movieRepo.findByCategory(category, order || 'movie.title');
  }
}
