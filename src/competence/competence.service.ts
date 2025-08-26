import { Inject, Injectable } from '@nestjs/common';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { Competence } from './entities/competence.entity';
import { Repository } from 'typeorm';
import { CompetenceMapper } from './dto/competence.mapper';
import { UpdateCompetenceDto } from './dto/update-competence.dto';

@Injectable()
export class CompetenceService {
  competenceMapper = new CompetenceMapper();
  constructor(
      @Inject('COMPETENCE_REPOSITORY')
      private competenceRepository: Repository<Competence>,
    ) {}
  async create(createCompetenceDto: CreateCompetenceDto) {
    try {
      const competence = new Competence();
      competence.name = createCompetenceDto.name;
      competence.description = createCompetenceDto.description;
      return this.competenceMapper.toDto(await this.competenceRepository.save(competence));
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    const list = await this.competenceRepository.find({where:{isDeleted:false}});
    return this.competenceMapper.toDtos(list);
  }

  async findOne(id: string) {
    const competence = await this.competenceRepository.findOne({where:{id}});
    if (!competence || competence.isDeleted) throw new Error('Competence not found or deleted');
    return this.competenceMapper.toDto(competence);
  }

  async update(id: string, updateCompetenceDto: UpdateCompetenceDto) {
    await this.findOne(id);
    const updatedCompetence = await this.competenceRepository.update(id, this.competenceMapper.toEntity(updateCompetenceDto));
    return updatedCompetence ? await this.findOne(id) : "Error updating competence";
  }

  async remove(id: string) {
    await this.findOne(id);
    const isDeleted = await this.competenceRepository.update(id, {isDeleted:true,deletedAt:new Date()});
    return isDeleted ? "Competence deleted successfully" : "Error deleting competence";
  }
}
