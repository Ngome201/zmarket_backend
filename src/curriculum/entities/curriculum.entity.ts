import { BaseModel } from "src/db/baseModel";
import { Lab } from "src/lab/entities/lab.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Curriculum {
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
    @ManyToMany(()=>Lab)
    @JoinTable()
    labs : Lab[]

    

}
