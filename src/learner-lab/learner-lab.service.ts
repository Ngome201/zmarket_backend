import { Inject, Injectable } from '@nestjs/common';
import { CreateLearnerLabDto } from './dto/create-learner-lab.dto';
import { UpdateLearnerLabDto } from './dto/update-learner-lab.dto';
import { Learner } from 'src/learner/entities/learner.entity';
import { Repository } from 'typeorm';
import { Lab } from 'src/lab/entities/lab.entity';
import { LearnerLab } from './entities/learner-lab.entity';

@Injectable()
export class LearnerLabService {
  constructor(
      @Inject('LEARNER_LAB_REPOSITORY')
      private learnerLabRepository: Repository<LearnerLab>,
      @Inject('LEARNER_REPOSITORY')
      private learnerRepository: Repository<Learner>,
      @Inject('LAB_REPOSITORY')
      private labRepository: Repository<Lab>,
    ) {}
  
  async registerToLab(createLearnerLabDto: CreateLearnerLabDto) {
    
    try {
      const learnerLab = new LearnerLab()
      
      let learner = await this.learnerRepository.findOne({where:{id:createLearnerLabDto.learnerId,isBlocked:false,isDeleted:false}});
      if (learner==null||learner.isDeleted) return 'Learner does not exist'
      
      let lab = await this.labRepository.findOne({where:{id:createLearnerLabDto.labId,isDeleted:false}});
      
      if (lab==null||lab.isDeleted) return 'Lab does not exist'

      if (lab.disponibility=='Terminé') return 'The Lab is already Terminated'
  
      if (learner.tokens<lab.requiredTokens) return 'Insufficent tokens'
      
      learner.tokens -=lab.requiredTokens;
  
      await this.learnerRepository.update(createLearnerLabDto.learnerId,learner);
      await this.labRepository.update(createLearnerLabDto.labId,lab);
  
      // learnerLab.learner = learner
      // learnerLab.lab = lab;
      
      return await this.learnerLabRepository.save(learnerLab)
    } catch (error) {
      return error
    }
  }
  //Implement lambda function to launch the Environment
  async startLab(learnerLabId:string){
    try {
      const learnerLab = await this.learnerLabRepository.findOneOrFail({where:{id:learnerLabId, isDeleted:false, isCompleted:false}})
      learnerLab.statedAt = new Date(Date.now())
      await this.learnerLabRepository.update(learnerLabId,learnerLab);
      // verification
      const updatedLearnerLab = await this.findOne(learnerLab.id) as LearnerLab
      return `Lab started successfully at : ${updatedLearnerLab.statedAt},`

    } catch (error) {
      throw new Error(error)
    }

  }
  //delete learnerLab object => payback token to learner => save learner, learnerLab
  async payBackToken (learnerLabId : string){

      try {
        const learnerLab = await this.learnerLabRepository.findOneOrFail({where:{id:learnerLabId, isDeleted:false, isCompleted:false}})
        learnerLab.isDeleted = true
        learnerLab.deletedAt = new Date(Date.now())
  
        const learner = await this.learnerRepository.findOneOrFail({where:{id:learnerLab.learnerId}})
        const lab = await this.labRepository.findOneOrFail({where:{id:learnerLab.labId}})
        
        const oldToken = learner.tokens // just for verification
        learner.tokens += lab.requiredTokens

        await this.learnerLabRepository.update(learnerLab.id,learnerLab);
        await this.learnerRepository.update(learner.id,learner);
        
        // verification
        const updatedLearnerLab = await this.learnerLabRepository.findOneOrFail({where:{id:learnerLabId}})
        const updatedLearner = await this.learnerRepository.findOneOrFail({where:{id :learner.id}})
        return `Pay back operation is successfull. ==> ${updatedLearnerLab} \n ==> old learner  ${oldToken}, new token ${updatedLearner.tokens}`

      } catch (error) {
        console.log(`Impossible to pay back `,error)
      }

  }
  async rateLab (updateLearnerLabDto : UpdateLearnerLabDto){
    
    try {
      const learnerLab = await this.learnerLabRepository.findOneOrFail({where:{id:updateLearnerLabDto.id, isDeleted:false, isCompleted:true}})
      
      if (!learnerLab.isCompleted) return 'Complete the Lab first before rating'
      
      learnerLab.score = updateLearnerLabDto.score

      await this.learnerLabRepository.update(updateLearnerLabDto.id,learnerLab);
      
      const lab = await this.labRepository.findOneOrFail({where:{id:updateLearnerLabDto.labId}})
      lab.score += updateLearnerLabDto.score

      await this.labRepository.update(lab.id,lab);

      // verification
      const updatedLearnerLab = await this.findOne(learnerLab.id)
      const updatedLab = await this.labRepository.findOneOrFail({where:{id :lab.id}})

      return `Lab rated successfully : ${updatedLearnerLab.toString()}, previous lab score : ${lab.id} new lab score ${updatedLab.score}`
    } catch (error) {
      console.log('Error when rating the lab : ',error);
    }
  }
  async toggleLabToFavorite(learnerLabId : string){
    const learnerLab = await this.findOne(learnerLabId) as LearnerLab;
    learnerLab.isFavorite = !learnerLab.isFavorite
    await this.learnerLabRepository.update(learnerLabId,learnerLab)
    
    // verification
    const updatedLearnerLab = await this.findOne(learnerLab.id) as LearnerLab 
    return `Lab Successfully added to favorites ${updatedLearnerLab.id }==> ${updatedLearnerLab.isFavorite}`
  }

  async findAllByLearnerId (learnerId : string){
    
    try {
      return await this.learnerLabRepository.find({
        where:{learnerId:learnerId, isDeleted:false},
        relations:{
          // lab:true
        }
      })
    } catch (error) {
      console.log('Error when fetching data : ',error);
    }
  }

  async isSponsorEligibleToBenefit(learnerId:string){
    const learner = await this.learnerRepository.findOneOrFail({where:{id:learnerId}})
    const learnerLabs = await this.learnerLabRepository.find({where:{learnerId:learnerId,}})
    if (learnerLabs.length>2&&learner.isSponsored) return true

    return false;    
  }

  async setSponsorBenefit (sponsorId:string){
    const learner = await this.learnerRepository.findOneOrFail({where:{id:sponsorId}}) 
    learner.tokens += parseInt(String(process.env.SPONSOR_TOKEN_BENEFIT))
  }

  async findAll() {

    return await this.learnerLabRepository.find();
  }

  async findOne(id: string) {
    try {
      return await this.learnerLabRepository.findOneOrFail({where: {id:id, isDeleted:false}})
    } catch (error) {
      console.log('Error when fetching data : ',error);
    }

    return `This action returns a #${id} learnerLab`;
  }

  async remove(id: string) {
    await this.findOne(id)
    const isDeleted = await this.learnerLabRepository.update(id, { isDeleted: true, deletedAt: new Date(Date.now()) });
    return isDeleted ? 'Lab deleted successfully' : 'Error deleting lab';
    
  }
}
