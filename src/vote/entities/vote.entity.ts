import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contestant } from "../../contestant/entities/contestant.entity";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Vote {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    points: number;

    @ManyToOne(() => User, user => user.id)
    user: User;

    @ManyToOne(() => Contestant, contestant => contestant.countryCode, {eager: true})
    contestant: Contestant;

}
