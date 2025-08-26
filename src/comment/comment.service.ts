import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DataSource, Repository } from 'typeorm';
import { LabComment } from './entities/comment.entity';
import { CommentMapper } from './dto/comment.mapper';

@Injectable()
export class CommentService {
  private commentMapper = new CommentMapper()
  constructor(
      @Inject('COMMENT_REPOSITORY')
      private commentRepository: Repository<LabComment>,
      @Inject('DATA_SOURCE')
      private datasource:DataSource
    ) {}
  async create(createCommentDto: CreateCommentDto) {

    try {
      const comment = new LabComment()
      comment.userComment = createCommentDto.userComment
      comment.learnerLabId = createCommentDto.learnerLabId
      return this.commentMapper.toDto(await this.commentRepository.save(comment))
    
    } catch (error) {
      return `Error While saving comment ==>${error}`
    }
  }
  async findAllByLearnerLab(learnerLabId : string){

    try {
      const comments = await this.commentRepository.find({where:{learnerLabId:learnerLabId,isDeleted:false}})
      return this.commentMapper.toDtos(comments)
    } catch (error) {
      return error;
    }
  }
  //Need to be completed
  async findAllCommentsGroupByLab(){
    const comments = await this
                           .commentRepository
                           .createQueryBuilder('comment')
                           .innerJoinAndSelect('comment.learnerLab','learnerLab')
                           .groupBy('learnerLab.labID')
                           .getMany()
    return comments;

  }
  findAll() {
    return `This action returns all comment`;
  }


  async findOne(id: string) {
    try {
      return this.commentMapper.toDto(await this.commentRepository.findOneOrFail({where : {id:id, isDeleted:false}}))
    } catch (error) {
      
    }
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
