import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { NotFoundException } from 'src/features/exceptions/not-found.exception';
import { SqlException } from 'src/features/exceptions/sql.exception';
import { DeleteResult } from 'src/interfaces/delete-result';
import { OrderByCondition, Repository, WhereExpression } from 'typeorm';

@Injectable()
export class MovieRepo {
  constructor(
    @InjectRepository(Movie) private readonly db: Repository<Movie>,
  ) {}

  async insert(movie: Movie): Promise<Movie> {
    try {
      const insertResult = await this.db.insert(movie);
      movie.id = insertResult.identifiers[0].id;
      return movie;
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async findAll(
    where: WhereExpression,
    order: OrderByCondition,
    limit: number,
    page: number,
  ): Promise<Movie[]> {
    try {
      const movies = await this.db.find({
        where: where,
        order: order,
        skip: page,
        take: limit,
        join: {
          alias: 'm',
          leftJoinAndSelect: {
            links: 'm.links',
            anime: 'm.anime',
            categories: 'm.categories',
          },
        },
      });
      return movies;
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async findOneById(id: string): Promise<Movie> {
    try {
      const movie = await this.db.findOne(id, {
        join: {
          alias: 'm',
          leftJoinAndSelect: {
            links: 'm.links',
            anime: 'm.anime',
            categories: 'm.categories',
          },
        },
      });
      if (!movie) throw new NotFoundException('Filme');
      return movie;
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async update(movie: Movie): Promise<Movie> {
    try {
      let movieToUpdate = await this.db.findOne(movie.id);
      if (!movieToUpdate) throw new NotFoundException('Filme');

      const currentId = movieToUpdate.id;
      movieToUpdate = movie;
      movieToUpdate.id = currentId;

      const updateResult = await this.db.save(movieToUpdate);
      return updateResult;
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      const movieToDelete = await this.db.findOne(id);
      if (!movieToDelete) throw new NotFoundException('Filme');
      const deleteResult = await this.db.delete(id);
      if (!deleteResult.affected) return { deleted: false };
      return { deleted: true };
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async findByCategory(category: string, order: string): Promise<Movie[]> {
    try {
      const animes: Movie[] = await this.db
        .createQueryBuilder('movie')
        .leftJoinAndSelect('movie.categories', 'c')
        .where('c.id=:category', { category })
        .orderBy(order, 'ASC')
        .getMany();
      return animes;
    } catch (e) {
      throw new SqlException(e);
    }
  }
}
