import { BaseModel } from "src/db/baseModel";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Competence{
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

}
