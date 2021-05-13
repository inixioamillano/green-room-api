import { Contestant } from "../../contestant/entities/contestant.entity";

export class CreateVoteDto {
    userId: string;
    votes: Contestant[];
}
