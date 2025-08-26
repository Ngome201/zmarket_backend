import { Category } from "src/category/entities/category.entity";
import { Competence } from "src/competence/entities/competence.entity";
import { BaseModel } from "src/db/baseModel";
import { SharedProperty } from "src/db/sharedProperty";
import { LearnerLab } from "src/learner-lab/entities/learner-lab.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Lab {
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
    @Column()
    durationUnit : string;
    @Column()
    disponibility : string;
    @Column({nullable:true})
    mdFileUrl : string;
    @Column()
    duration : number;
    @Column()
    requiredTokens : number;
    @Column({nullable:true})
    score : number;
    @Column()
    level : string;
    @Column("simple-array",{nullable:true})
    objectives : string[];
    @Column("simple-array",{nullable:true})
    prerequisites : string[];
    @Column("simple-array",{nullable:true})
    technologies : string[];
    
    @Column({nullable:true})
    categoryId : string; 
    @ManyToOne(()=>Category, (category)=>category.labs)
    category : Category;

    @ManyToMany(()=>Competence)
    @JoinTable()
    competences : Competence[] 

    @OneToMany(()=>LearnerLab,(learnerLab)=>learnerLab.lab)
    learnerLabs: LearnerLab[];

}

