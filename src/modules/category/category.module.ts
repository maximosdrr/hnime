import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { CategoryRepo } from './repositories/category/repository';

@Module({
  providers: [CategoryService, CategoryRepo],
  controllers: [CategoryController],
  imports: [TypeOrmModule.forFeature([Category])],
})
export class CategoryModule {}
