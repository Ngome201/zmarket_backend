import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { categoryProviders } from 'src/helper/repository.providers';
import { databaseProviders } from 'src/db/database.providers';

@Module({
  controllers: [CategoryController],
  providers: [...categoryProviders,...databaseProviders,CategoryService],
  
})
export class CategoryModule {}
