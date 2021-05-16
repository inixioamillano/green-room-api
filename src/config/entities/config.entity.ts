import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Config {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({default: true})
    votesOpen: boolean;

}
