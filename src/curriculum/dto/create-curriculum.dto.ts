import { ApiProperty } from "@nestjs/swagger";

export class CreateCurriculumDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
}
