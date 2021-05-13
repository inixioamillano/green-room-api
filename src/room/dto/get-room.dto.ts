import { GetContestantDto } from "../../contestant/dto/get-contestant.dto";
import { User } from "../../user/entities/user.entity";
import { Room } from "../entities/room.entity";

export class GetRoomDto {
    id: string;
    name: string;
    users: User[];
    contestants: GetContestantDto[];

    constructor(room: Room, contestants: GetContestantDto[]) {
        this.id = room.id;
        this.name = room.name;
        this.users = room.users;
        this.contestants = contestants.map(c => {
            let votes = 0;
            room.users.forEach(u => {
                if (u) {
                    const vote = u.votes.find(v => v.contestant.id === c.id);
                    if (vote) {
                        votes += vote.points;
                    }
                }
            });
            c.votes = votes;
            return c;
        })
    }

}