import { ApiProperty } from '@nestjs/swagger';
import { CreateLabDto } from './create-lab.dto';
import { UpdateCompetenceDto } from 'src/competence/dto/update-competence.dto';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';

export class UpdateLabDto extends CreateLabDto {
    @ApiProperty()
    id : string;
    @ApiProperty()
    createdAt : Date;
    @ApiProperty()
    competences : Array <Partial<UpdateCompetenceDto>>
    @ApiProperty()
    category : Partial<UpdateCategoryDto>
    

}
