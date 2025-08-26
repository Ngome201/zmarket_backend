import { ApiProperty } from "@nestjs/swagger";

export class CreateLabDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    mdFileUrl: string;
    @ApiProperty()
    durationUnit: string;
    @ApiProperty()
    objectives: string[];
    @ApiProperty()
    prerequisites : string[]; // This property doesn't belong to an entity
    @ApiProperty()
    technologies : string[];
    @ApiProperty()
    duration: number;
    @ApiProperty()  
    score: number;
    @ApiProperty()
    level: string;
    @ApiProperty()
    disponibility: string;
    @ApiProperty()
    competencesId: string[]// join attributes
    @ApiProperty()
    categoryId: string// join attributes

    

}
