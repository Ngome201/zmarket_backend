import { Column } from "typeorm";
import { SharedProperty } from "./sharedProperty";

export abstract class BaseModel extends SharedProperty{
    @Column()
    name : string;
    @Column({nullable:true})
    description : string;
}