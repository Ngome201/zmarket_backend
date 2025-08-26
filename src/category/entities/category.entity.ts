import { BaseModel } from "src/db/baseModel";
import { SharedProperty } from "src/db/sharedProperty";
import { Lab } from "src/lab/entities/lab.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {
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
    @OneToMany(()=>Lab, (lab)=>lab.category)
    labs : Lab[];
}
