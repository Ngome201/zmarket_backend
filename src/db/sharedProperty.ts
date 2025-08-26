import { CreateDateColumn, Column, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class SharedProperty{
    @PrimaryGeneratedColumn("uuid")
    id : string;
    // @Column()
    // name : string;
    // @Column({nullable:true})
    // description : string;
    @CreateDateColumn()
    createdAt : Date;
    @Column({nullable:true})
    deletedAt : Date;
    @UpdateDateColumn()
    updatedAt : Date;
    @Column({default:false})
    isDeleted : boolean;
}