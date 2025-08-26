import { SharedProperty } from "src/db/sharedProperty";
import { LearnerLab } from "src/learner-lab/entities/learner-lab.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Learner {
    @PrimaryGeneratedColumn("uuid")
    id : string;
    @Column()
    name : string;
    @Column({nullable:true})
    description : string;
    @CreateDateColumn()
    createdAt : Date;
    @Column({nullable:true})
    deletedAt : Date;
    @UpdateDateColumn()
    updatedAt : Date;
    @Column({default:false})
    isDeleted : boolean;
    @Column({nullable:true})
    sponsorId : string;
    @Column({nullable:true})
    sponsorCode : string;
    @Column({nullable:true})
    tokens : number;
    @Column('simple-array',{nullable:true})
    preferences : string [];
    @Column('simple-array',{nullable:true})
    blockedReason : string [];
    @Column({default:false})
    isSponsored : boolean;
    @Column({default:false})
    isBlocked : boolean;
    @Column({default:false})
    isPublic : boolean;
    
    @OneToMany(()=>LearnerLab,(learnerLab)=>learnerLab.lab)
    learnerLabs: LearnerLab[];






}
