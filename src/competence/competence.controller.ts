import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CompetenceService } from './competence.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';

@Controller('competence')
export class CompetenceController {
  constructor(private readonly competenceService: CompetenceService) {}

  @Post()
  async create(@Body() createCompetenceDto: CreateCompetenceDto) {
    return this.competenceService.create(createCompetenceDto);
  }

  @Get()
  async findAll() {
    return await this.competenceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.competenceService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCompetenceDto: UpdateCompetenceDto) {
    return await this.competenceService.update(id, updateCompetenceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.competenceService.remove(id);
  }
}
