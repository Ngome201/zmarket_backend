import { PartialType } from '@nestjs/mapped-types';
import { CreateCompetenceDto } from './create-competence.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompetenceDto extends CreateCompetenceDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    createdAt: Date;
}
