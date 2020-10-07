import { Injectable } from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { CategoryRepo } from './repositories/category/repository';
import { pageCalculation } from '../../features/calculations/page-calculation';
import { DeleteResult } from 'src/interfaces/delete-result';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepo) {}

  insert(category: Category): Promise<Category> {
    return this.categoryRepo.insert(category);
  }

  findAll(limit: number, page: number): Promise<Category[]> {
    const calculatedPage = pageCalculation(limit, page);
    return this.categoryRepo.findAll(limit || 100, calculatedPage || 0);
  }

  update(category: Category): Promise<Category> {
    return this.categoryRepo.update(category);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.categoryRepo.delete(id);
  }
}
