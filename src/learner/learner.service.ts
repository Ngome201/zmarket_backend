import { Inject, Injectable } from '@nestjs/common';
import { CreateLearnerDto } from './dto/create-learner.dto';
import { UpdateLearnerDto } from './dto/update-learner.dto';
import { Learner } from './entities/learner.entity';
import { Repository } from 'typeorm';
import { LearnerMapper } from './dto/learner.mapper';
import {  ListUsersCommand,  CognitoIdentityProviderClient, UserStatusType, AdminGetUserCommand} from "@aws-sdk/client-cognito-identity-provider";
import { userIdentityDto } from './dto/user-identity.dto';
import { LabMapper } from 'src/lab/dto/lab.mapper';

@Injectable()
export class LearnerService {
  
  private client : CognitoIdentityProviderClient;
  private learnerMapper = new LearnerMapper();

  constructor(
      @Inject('LEARNER_REPOSITORY')
      private learnerRepository: Repository<Learner>,
    ) {
    this.client = new CognitoIdentityProviderClient({
      region: String(process.env.AWS_REGION),
      credentials: {
        accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
        secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
      }});
    }
  
  async postSignUp(sub: string) {
    const learner  = new Learner();
    learner.id = sub
    let learnerSaved = await this.learnerRepository.save(learner);
    return learnerSaved;
  }

  async postSignUpWithSponsorCode(sub: string, sponsorCode: string) {
    const learner  = new Learner();
    const sponsor = await this.learnerRepository.findOneOrFail({where:{sponsorCode:sponsorCode}})
    learner.id = sub
    learner.sponsorId = sponsor.id
    learner.isSponsored = true
    let learnerSaved = await this.learnerRepository.save(learner);
    return learnerSaved;
  }

  async create(createLearnerDto: CreateLearnerDto) {
    const learner  = new Learner();
    learner.id = createLearnerDto.sub
    learner.preferences = createLearnerDto.preferences
    let savedLearner = await this.learnerRepository.save(this.learnerMapper.toEntity(createLearnerDto));
    return savedLearner;
  }

  async findAllSponsorById(learnerId : string){
    const list = await this.learnerRepository.find({where:{sponsorId:learnerId}})
    return this.learnerMapper.toDtos(list)
  }

  async findAllLearnersByProfileDetails() {
    const command = new ListUsersCommand({
      UserPoolId: String(process.env.AWS_COGNITO_USER_POOL_ID),
    });
    const response = await this.client.send(command);
    return response.Users?.map(user => new userIdentityDto(user) )
  }

  async find (){
    const list = await this.learnerRepository.find();
    return this.learnerMapper.toDtos(list)
  }
  
  async findOneLearnerByProfileDetails(username: string) {
    const command = new AdminGetUserCommand({
        UserPoolId: String(process.env.AWS_COGNITO_USER_POOL_ID),
        Username : username
      });
    const response = await this.client.send(command);
    return new userIdentityDto(response);
  }

  async generateSponsorCode(id : string){
    const learner = await this.learnerRepository.findOneOrFail({ where: { id:id, isDeleted:false} });
    learner.sponsorCode = this.createRandomString(process.env.SPONSOR_CODE_LENGTH)
    await this.learnerRepository.update(id,learner)
    return await this.findOne(id)
  }

  async findOne(id: string) {
    const learner = await this.learnerRepository.findOne({ where: { id:id } });
    if (!learner||learner.isDeleted||learner.isBlocked) throw new Error('Learner not found');
    return this.learnerMapper.toDto(learner);
  }

  async update(id: string, updateLearnerDto: UpdateLearnerDto) {
    await this.findOne(id)
    const updatedLearner = await this.learnerRepository.update(id,this.learnerMapper.toEntity(updateLearnerDto))
    return updatedLearner? await this.findOne(id):`Error updating learner #${id}`;
  }

  async remove(id: string) {
    await this.findOne(id)
    const isDeleted = await this.learnerRepository.update(id, {isDeleted:true,deletedAt:new Date()});
    return isDeleted ? "learner deleted successfully" : "Error deleting competence";

  }
  createRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const randomArray = new Uint8Array(length);
    crypto.getRandomValues(randomArray);
    randomArray.forEach((number) => {
      result += chars[number % chars.length];
    });
    return result;
}

}
