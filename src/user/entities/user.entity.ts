import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vote } from "../../vote/entities/vote.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @OneToMany(() => Vote, vote => vote.user, {eager: true})
    votes: Vote[];

}
