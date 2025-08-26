import { LabComment } from "src/comment/entities/comment.entity";
import { SharedProperty } from "src/db/sharedProperty";
import { Lab } from "src/lab/entities/lab.entity";
import { Learner } from "src/learner/entities/learner.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class LearnerLab {
    
    @PrimaryGeneratedColumn("uuid")
    id : string;
    @CreateDateColumn()
    createdAt : Date;
    @Column({nullable:true})
    deletedAt : Date;
    @UpdateDateColumn()
    updatedAt : Date;
    @Column({default:false})
    isDeleted : boolean;
    @Column({nullable:true})
    statedAt:Date;
    @Column({nullable:true})
    score : number;
    @Column({default:false})
    isFavorite : boolean;
    @Column({default:false})
    isCompleted : boolean;
    @Column({nullable:true})
    unRegisteredAt : Date;
    @Column({nullable:true})
    learnerId : string;
    @Column({nullable:true})
    labId : string;
    
    @ManyToOne(()=>Learner,(learner)=>learner.learnerLabs)
    learner : Learner;
    @ManyToOne(()=>Lab,(lab)=>lab.learnerLabs)
    lab : Lab;

    @OneToMany(()=>LabComment, (comment)=>comment.learnerLab)
    comments : LabComment[]
}
