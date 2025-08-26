import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CategoryMapper } from './dto/category.mapper';

@Injectable()
export class CategoryService {
  categoryMapper = new CategoryMapper();
  constructor(
      @Inject('CATEGORY_REPOSITORY')
      private categoryRepository: Repository<Category>,
    ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = new Category();
      category.name = createCategoryDto.name;
      category.description = createCategoryDto.description;
    
      return this.categoryMapper.toDto(await this.categoryRepository.save(category));
      
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    const list = await this.categoryRepository.find({where:{isDeleted:false}});
    return this.categoryMapper.toDtos(list);
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({where:{id}});
    if (!category || category.isDeleted) throw new Error('Category not found or deleted');
    return this.categoryMapper.toDto(category);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    const updatedCategory = await this.categoryRepository.update(id, this.categoryMapper.toEntity(updateCategoryDto));
    return updatedCategory? await this.findOne(id):"Error updating category";
  }

  async remove(id: string) {
    await this.findOne(id);
    const isDeleted = await this.categoryRepository.update(id, {isDeleted:true,deletedAt:new Date()});
    return isDeleted?"Category deleted successfully":"Error deleting category";
  }
}
