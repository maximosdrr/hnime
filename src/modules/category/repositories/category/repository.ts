import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { NotFoundException } from 'src/features/exceptions/not-found.exception';
import { SqlException } from 'src/features/exceptions/sql.exception';
import { DeleteResult } from 'src/interfaces/delete-result';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepo {
  constructor(
    @InjectRepository(Category) private readonly db: Repository<Category>,
  ) {}

  async insert(category: Category): Promise<Category> {
    try {
      const insertResult = await this.db.insert(category);
      category.id = insertResult.identifiers[0].id;
      return category;
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async findAll(limit: number, page: number): Promise<Category[]> {
    try {
      const categories = await this.db.find({
        take: limit,
        skip: page,
      });
      return categories;
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async update(category: Category): Promise<Category> {
    try {
      let categoryToUpdate = await this.db.findOne(category.id);
      if (!categoryToUpdate) throw new NotFoundException('Categoria');

      const currentId = categoryToUpdate.id;
      categoryToUpdate = category;
      categoryToUpdate.id = currentId;

      const updateResult = await this.db.save(categoryToUpdate);

      return updateResult;
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      const categoryToDelete = await this.db.findOne(id);
      if (!categoryToDelete) throw new NotFoundException('Categoria');

      const deleteResult = await this.db.delete(id);

      if (!deleteResult.affected) return { deleted: false };
      return { deleted: true };
    } catch (e) {
      throw new SqlException(e);
    }
  }
}
