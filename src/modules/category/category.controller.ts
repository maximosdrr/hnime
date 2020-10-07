import { Body, Controller, Delete, Post, Put, Query } from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { DeleteResult } from 'src/interfaces/delete-result';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('insert')
  insert(@Body() category: Category): Promise<Category> {
    return this.categoryService.insert(category);
  }

  @Post('find')
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Category[]> {
    return this.categoryService.findAll(limit, page);
  }

  @Put('update')
  update(@Body() category: Category): Promise<Category> {
    return this.categoryService.update(category);
  }

  @Delete('delete')
  delete(@Query('id') id: string): Promise<DeleteResult> {
    return this.categoryService.delete(id);
  }
}
