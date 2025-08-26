import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty()
    id : string
    @ApiProperty()
    userComment : string
    @ApiProperty()
    learnerLabId : string
}
