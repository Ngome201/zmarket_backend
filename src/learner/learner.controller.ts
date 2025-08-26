import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LearnerService } from './learner.service';
import { CreateLearnerDto } from './dto/create-learner.dto';
import { UpdateLearnerDto } from './dto/update-learner.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('learner')
export class LearnerController {
  constructor(private readonly learnerService: LearnerService) {}

  @Post("/register-user")
  async create(@Body() createLearnerDto: CreateLearnerDto) {
    console.log("Enter in controller");
    return await this.learnerService.create(createLearnerDto);
  }

  @Post('/post-sign-up/:cognitoSub')
  async postSignUp(@Param('cognitoSub')cognitoSub:string){
    return await this.learnerService.postSignUp(cognitoSub)
  }

  @Post('/post-sign-up')
  async postSignUpWithSposorCode(@Body() signUpDto:SignUpDto){
    return await this.learnerService.postSignUpWithSponsorCode(signUpDto.sub,signUpDto.sponsorCode);
  }

  @Get()
  async findAll() {
    return await this.learnerService.find();
  }

  @Get('/all-learner-by-profile-details')
  async findAllByProfileDetails() {
    return await this.learnerService.findAllLearnersByProfileDetails();
  }

  @Get('/get-one-by-profile-details/:id')
  findOneByProfileDetails(@Param('id') id: string) {
    return this.learnerService.findOneLearnerByProfileDetails(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learnerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLearnerDto: UpdateLearnerDto) {
    return this.learnerService.update(id, updateLearnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learnerService.remove(id);
  }
}
type SignUpDto ={
  sub:string,
  sponsorCode:string

}
