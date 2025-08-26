import { ApiProperty } from "@nestjs/swagger";

export class CreateLearnerDto {
    @ApiProperty()
    sub : string;
    @ApiProperty()
    preferences : string [];
    

}
