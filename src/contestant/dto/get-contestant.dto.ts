import { Vote } from "../../vote/entities/vote.entity";
import { Contestant } from "../entities/contestant.entity";

export class GetContestantDto {
    id: string;
    countryCode: string;
    countryName: string;
    songTitle: string;
    singer: string;
    eliminated: boolean;
    votes: number;

    constructor(contestant: Contestant, votes?: Vote[]) {
        const ranking = votes ? votes: contestant.votes;
        this.id = contestant.id;
        this.countryCode = contestant.countryCode;
        this.countryName = contestant.countryName;
        this.songTitle = contestant.songTitle;
        this.singer = contestant.singer;
        this.eliminated = contestant.eliminated;
        this.votes = ranking.reduce((prev, vote) => prev += vote.points, 0);
    }

}