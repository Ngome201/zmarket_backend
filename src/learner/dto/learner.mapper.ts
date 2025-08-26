import { CreateLearnerDto } from './create-learner.dto';
import { Learner } from '../entities/learner.entity';
import { UpdateLearnerDto } from './update-learner.dto';
import { SuperMapper } from 'src/helper/super.mapper';

export class LearnerMapper extends SuperMapper<UpdateLearnerDto, Learner> {
    toEntity(d: UpdateLearnerDto): Learner {
        
        throw new Error('Method not implemented.');
    }
    toDto(e: Learner): UpdateLearnerDto {

        throw new Error('Method not implemented.');
    }
    
    /**
     * Maps a CreateLearnerDto to a Learner entity.
     * @param createLearnerDto - The DTO to map.
     * @returns A new Learner entity.
     */
    
}