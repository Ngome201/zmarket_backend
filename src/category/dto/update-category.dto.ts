import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto extends CreateCategoryDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    createdAt: Date;
}
