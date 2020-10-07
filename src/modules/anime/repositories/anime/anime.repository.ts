import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anime } from 'src/entities/anime.entity';
import { NotFoundException } from 'src/features/exceptions/not-found.exception';
import { SqlException } from 'src/features/exceptions/sql.exception';
import { DeleteResult } from 'src/interfaces/delete-result';
import { OrderByCondition, Repository, WhereExpression } from 'typeorm';

@Injectable()
export class AnimeRepo {
  constructor(
    @InjectRepository(Anime) private readonly db: Repository<Anime>,
  ) {}
  async insert(anime: Anime): Promise<Anime> {
    try {
      const result = await this.db.insert(anime);
      anime.id = result.identifiers[0].id;
      return anime;
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async findAll(
    limit: number,
    page: number,
    whereOptions: WhereExpression,
    orderOptions: OrderByCondition,
  ): Promise<Anime[]> {
    try {
      const animes = await this.db.find({
        take: limit,
        skip: page,
        where: whereOptions,
        order: orderOptions,
        join: {
          alias: 'a',
          leftJoinAndSelect: {
            categories: 'a.categories',
          },
        },
      });
      return animes;
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async findOneById(id: string): Promise<Anime> {
    try {
      const anime = await this.db.findOne(id, {
        join: {
          alias: 'a',
          leftJoinAndSelect: {
            categories: 'a.categories',
          },
        },
      });
      if (!anime) throw new NotFoundException('anime');
      return anime;
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      const animeToDelete = await this.db.findOne(id);
      if (!animeToDelete) throw new NotFoundException('anime');
      const deleteQueryResult = await this.db.delete(id);
      if (deleteQueryResult.affected) return { deleted: true };
      return { deleted: false };
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async update(anime: Anime): Promise<Anime> {
    try {
      let animeToUpdate = await this.db.findOne(anime.id);

      if (!animeToUpdate) throw new NotFoundException('anime');
      const currentId = anime.id;
      animeToUpdate = anime;
      animeToUpdate.id = currentId;
      return await this.db.save(animeToUpdate);
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async updateNumberOfEpisodes(id: string, value: number): Promise<Anime> {
    try {
      const animeToUpdate = await this.db.findOne(id);
      if (!animeToUpdate) throw new NotFoundException('anime');
      animeToUpdate.numberOfEps = animeToUpdate.numberOfEps + value;
      return await this.db.save(animeToUpdate);
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async updateNumberOfMovies(id: string, value: number): Promise<Anime> {
    try {
      const animeToUpdate = await this.db.findOne(id);
      if (!animeToUpdate) throw new NotFoundException('anime');
      animeToUpdate.numberOfMovies = animeToUpdate.numberOfMovies + value;
      return await this.db.save(animeToUpdate);
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async findByCategory(category: string, order: string): Promise<Anime[]> {
    try {
      const animes: Anime[] = await this.db
        .createQueryBuilder('anime')
        .leftJoinAndSelect('anime.categories', 'c')
        .where('c.id=:category', { category })
        .orderBy(order, 'ASC')
        .getMany();
      return animes;
    } catch (e) {
      throw new SqlException(e);
    }
  }
}
