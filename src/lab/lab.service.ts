import { Inject, Injectable } from '@nestjs/common';
import { CreateLabDto } from './dto/create-lab.dto';
import { UpdateLabDto } from './dto/update-lab.dto';
import { In, Repository } from 'typeorm';
import { Lab } from './entities/lab.entity';
import { LabMapper } from './dto/lab.mapper';
import { Category } from 'src/category/entities/category.entity';
import { Competence } from 'src/competence/entities/competence.entity';

@Injectable()
export class LabService {
   labMapper = new LabMapper();
  constructor(
    @Inject('LAB_REPOSITORY')
    private labRepository: Repository<Lab>,
    @Inject('COMPETENCE_REPOSITORY')
    private competenceRepository: Repository<Competence>,
  ) {}

  async create(createLabDto: CreateLabDto) {
    try {
      const lab = new Lab();
      lab.name = createLabDto.name;
      lab.description = createLabDto.description;
      lab.mdFileUrl = createLabDto.mdFileUrl;
      lab.durationUnit = createLabDto.durationUnit;
      lab.duration = createLabDto.duration;
      lab.objectives = createLabDto.objectives;
      lab.prerequisites = createLabDto.prerequisites;
      lab.technologies = createLabDto.technologies;
      lab.score = createLabDto.score;
      lab.level = createLabDto.level;
      lab.disponibility = createLabDto.disponibility;
      lab.categoryId = createLabDto.categoryId;
      // lab.competences = await this.competenceRepository.find({ where : {id: In(createLabDto.competencesId) }});

      return this.labMapper.toDto(await this.labRepository.save(lab));
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    const list = await this.labRepository.find({
      where: { isDeleted: false },
      relations: {
        // competences: true,
        // category: true,
      },
    });

    return this.labMapper.toDtos(list);
  }

  async findOne(id: string) {
    const lab = await this.labRepository.findOne({
      where: { id },
      relations: {
        // competences: true,
        // category: true,
      },
    });
    if (!lab || lab.isDeleted) throw new Error('Lab not found or deleted');
    return this.labMapper.toDto(lab);

  }

  async update(id: string, updateLabDto: UpdateLabDto) {
    const lab = await this.labRepository.findOne({
      where: { id },
      relations: {
        // competences: true,
      },
    });
    if (!lab) throw new Error('Lab not found');
    
    // lab.competences = await this.competenceRepository.findBy({ id: In(updateLabDto.competencesId) });
    lab.categoryId = updateLabDto.categoryId;
    const updatedLab = await this.labRepository.update(id, lab);
    return updatedLab ? await this.findOne(id) : 'Error updating lab';
  }

  async remove(id: string) {
    await this.findOne(id);
    const isDeleted = await this.labRepository.update(id, { isDeleted: true, deletedAt: new Date(Date.now()) });
    return isDeleted ? 'Lab deleted successfully' : 'Error deleting lab';
    
  }
}
