import { SuperMapper } from "src/helper/super.mapper";
import { CreateCommentDto } from "./create-comment.dto";
import { LabComment } from "../entities/comment.entity";

export class CommentMapper extends SuperMapper <CreateCommentDto,LabComment>{
    toEntity(d: CreateCommentDto): LabComment {
        const comment = new LabComment()
        comment.userComment = d.userComment
        comment.learnerLabId = d.learnerLabId
        return comment 
    }
    toDto(e: LabComment): CreateCommentDto {
        const commentDto = new CreateCommentDto()
        commentDto.id = e.id
        commentDto.learnerLabId = e.learnerLabId
        commentDto.userComment = e.userComment
        return commentDto
    }

}