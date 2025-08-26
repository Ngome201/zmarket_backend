import { Inject, Injectable } from '@nestjs/common';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { Curriculum } from './entities/curriculum.entity';
import { Repository } from 'typeorm';
import { CurriculumMapper } from './dto/curriculum.mapper';

@Injectable()
export class CurriculumService {
  curriculumMapper = new CurriculumMapper();

  constructor(
      @Inject('CURRICULUM_REPOSITORY')
      private curriculumRepository: Repository<Curriculum>,
    ) {}
  async create(createCurriculumDto: CreateCurriculumDto) {
    try {
      const curriculum = new Curriculum();
      curriculum.name = createCurriculumDto.name;
      curriculum.description = createCurriculumDto.description;
      return this.curriculumMapper.toDto(await this.curriculumRepository.save(curriculum));

    } catch (error) {
      return error;
    }
  }

  async findAll() {
    const list = await this.curriculumRepository.find({
      where:{isDeleted:false},
      relations:{
        // labs:true
      }
    });
    return list;
  }

  async findOne(id: string) {
    const curriculum = await this.curriculumRepository.findOne({
      where:{id},
      relations:{
        // labs:true
      }
    });
    if (!curriculum || curriculum.isDeleted) throw new Error('Curriculum not found or deleted');
    return this.curriculumMapper.toDto(curriculum);
  }

  async update(id: string, updateCurriculumDto: UpdateCurriculumDto) {
    await this.findOne(id);
    const updatedCurriculum = await this.curriculumRepository.update(id, this.curriculumMapper.toEntity(updateCurriculumDto));
    return updatedCurriculum ? await this.findOne(id) : "Error updating curriculum";
  }

  async remove(id: string) {
    await this.findOne(id);
    const isDeleted = await this.curriculumRepository.update(id, {isDeleted:true,deletedAt:new Date(Date.now())});
    return isDeleted ? "Curriculum deleted successfully" : "Error deleting curriculum";
  }
}
