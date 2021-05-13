import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vote } from "../../vote/entities/vote.entity";

@Entity()
export class Contestant {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        unique: true
    })
    countryCode: string;

    @Column()
    countryName: string;

    @Column()
    songTitle: string;

    @Column()
    singer: string;

    @Column({
        default: false
    })
    eliminated: boolean;

    @OneToMany(() => Vote, vote => vote.contestant)
    votes: Vote[]

}
