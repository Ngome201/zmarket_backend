import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';

@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Post()
  async create(@Body() createCurriculumDto: CreateCurriculumDto) {
    return await this.curriculumService.create(createCurriculumDto);
  }

  @Get()
  async findAll() {
    return await this.curriculumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.curriculumService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCurriculumDto: UpdateCurriculumDto) {
    return await this.curriculumService.update(id, updateCurriculumDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.curriculumService.remove(id);
  }
}
