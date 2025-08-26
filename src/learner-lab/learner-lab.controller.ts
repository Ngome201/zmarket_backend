import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LearnerLabService } from './learner-lab.service';
import { CreateLearnerLabDto } from './dto/create-learner-lab.dto';
import { UpdateLearnerLabDto } from './dto/update-learner-lab.dto';

@Controller('learner-lab')
export class LearnerLabController {
  constructor(private readonly learnerLabService: LearnerLabService) {}

  @Post()
  async create(@Body() createLearnerLabDto: CreateLearnerLabDto) {
    return await this.learnerLabService.registerToLab(createLearnerLabDto);
  }

  @Put('/start-lab/:id')
  async startLab(@Param('id') id: string) {
    return await this.learnerLabService.startLab(id);
  }

  @Put('/payback-token/:id')
  async payBackToken(@Param('id') id: string) {
    return await this.learnerLabService.payBackToken(id);
  }
  @Put('/rate-lab')
  async rateLab(@Body() updateLearnerLabDto: UpdateLearnerLabDto) {
    return await this.learnerLabService.rateLab(updateLearnerLabDto);
  }
  @Put('/toggle-lab-to-favorite/:learnerId')
  async toggleLabToFavorite(@Param('learnerId') learnerId: string) {
    return await this.learnerLabService.toggleLabToFavorite(learnerId);
  }

  @Get('/get-labs/:learnerId')
  async findAllLabByLearnerId(@Param('learnerId') learnerId: string) {
    return await this.learnerLabService.findAllByLearnerId(learnerId);
  }

  @Get('/sponsorable/:learnerId')
  async getSponsorableStatus(@Param('learnerId') learnerId: string) {
    return await this.learnerLabService.isSponsorEligibleToBenefit(learnerId);
  }

  @Put('/set-sponsor-benefit/:sponsorId')
  async setSponsorBenefit(@Param('sponsorId') sponsorId: string) {
    return await this.learnerLabService.setSponsorBenefit(sponsorId);
  }

  @Get()
  async findAll(){
    return await this.learnerLabService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.learnerLabService.remove(id);
  }
}
