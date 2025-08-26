import { CreateLearnerLabDto } from './create-learner-lab.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLearnerLabDto extends CreateLearnerLabDto {

    @ApiProperty()
    id:string;
    @ApiProperty()
    statedAt:Date;
    @ApiProperty()
    score : number;
    @ApiProperty()
    isFavorite : boolean;
    @ApiProperty()
    isCompleted : boolean;
    @ApiProperty()
    unRegisteredAt : Date;
}
