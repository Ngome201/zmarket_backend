import { Category } from '../entities/category.entity'; // Adjust the path as needed
import { SuperMapper } from 'src/helper/super.mapper';
import { UpdateCategoryDto } from './update-category.dto';

export class CategoryMapper extends SuperMapper<UpdateCategoryDto, Category> {
  toEntity(createCategoryDto: UpdateCategoryDto): Category {
    const category = new Category();
    category.id = createCategoryDto.id;
    category.name = createCategoryDto.name;
    category.description = createCategoryDto.description;
    return category;
  }

  toDto(category: Category): UpdateCategoryDto {
    const createCategoryDto = new UpdateCategoryDto();
    createCategoryDto.name = category.name;
    createCategoryDto.description = category.description;
    createCategoryDto.createdAt = category.createdAt;
    createCategoryDto.id = category.id;
    return createCategoryDto;
  }
    
}