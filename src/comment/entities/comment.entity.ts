import { SharedProperty } from "src/db/sharedProperty";
import { LearnerLab } from "src/learner-lab/entities/learner-lab.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class LabComment{
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
    @Column()
    userComment : string
    @Column({nullable:true})
    learnerLabId : string 

    @ManyToOne(()=>LearnerLab,(learnerLab)=>learnerLab.comments)
    learnerLab : LearnerLab
}
