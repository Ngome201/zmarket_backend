import { ApiProperty } from "@nestjs/swagger";

export class CreateCompetenceDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    
}
