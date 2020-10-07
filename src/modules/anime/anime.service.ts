import { Injectable } from '@nestjs/common';
import { Anime } from 'src/entities/anime.entity';
import { Category } from 'src/entities/category.entity';
import { pageCalculation } from 'src/features/calculations/page-calculation';
import { DeleteResult } from 'src/interfaces/delete-result';
import { OrderByCondition, WhereExpression } from 'typeorm';
import { AnimeRepo } from './repositories/anime/anime.repository';

@Injectable()
export class AnimeService {
  constructor(private readonly animeRepo: AnimeRepo) {}

  async insert(anime: Anime): Promise<Anime> {
    return await this.animeRepo.insert(anime);
  }

  async findAll(
    limit: number,
    skip: number,
    where: WhereExpression,
    order: OrderByCondition,
  ): Promise<Anime[]> {
    const page = pageCalculation(limit, skip);
    return await this.animeRepo.findAll(limit || 10, page || 0, where, order);
  }

  async findOneById(id: string): Promise<Anime> {
    return await this.animeRepo.findOneById(id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.animeRepo.delete(id);
  }

  async update(anime: Anime): Promise<Anime> {
    return await this.animeRepo.update(anime);
  }

  async updateNumberOfEps(id: string, decrement: boolean): Promise<Anime> {
    const value = !decrement ? 1 : -1;
    return this.animeRepo.updateNumberOfEpisodes(id, value);
  }

  async updateNumberOfMovies(id: string, decrement: boolean): Promise<Anime> {
    const value = !decrement ? 1 : -1;
    return this.animeRepo.updateNumberOfMovies(id, value);
  }

  async putCategory(id: string, category: Category): Promise<Anime> {
    const animeToAddCategory = await this.findOneById(id);
    animeToAddCategory.categories.push(category);
    return this.animeRepo.update(animeToAddCategory);
  }

  async deleteCategory(id: string, category: Category): Promise<Anime> {
    const animeToDeleteCategory = await this.findOneById(id);
    animeToDeleteCategory.categories = animeToDeleteCategory.categories.filter(
      value => category.id != value.id,
    );
    return this.animeRepo.update(animeToDeleteCategory);
  }

  async findByCategory(category: string, order: string): Promise<Anime[]> {
    return this.animeRepo.findByCategory(category, order || 'anime.name');
  }
}
