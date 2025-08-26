import { PartialType } from '@nestjs/mapped-types';
import { CreateCurriculumDto } from './create-curriculum.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCurriculumDto extends CreateCurriculumDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    createdAt: Date;
    
}
