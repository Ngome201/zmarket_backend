import { ApiProperty } from "@nestjs/swagger";

export class CreateLearnerLabDto {
    @ApiProperty()
    learnerId : string;
    @ApiProperty()
    labId : string;   
}
