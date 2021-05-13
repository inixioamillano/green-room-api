import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CONTESTANTS } from './data/contestants';
import { GetContestantDto } from './dto/get-contestant.dto';
import { Contestant } from './entities/contestant.entity';

@Injectable()
export class ContestantService {

  constructor(@InjectRepository(Contestant) private constestantsRepository: Repository<Contestant>) {}

  async findAll(): Promise<GetContestantDto[]> {
    const contestants = await this.constestantsRepository.find({relations: ['votes']});
    return this.contestantsToGetDto(contestants);
  }

  findOneByCountryCode(countryCode: string): Promise<Contestant> {
    return this.constestantsRepository.findOne({countryCode})
  }

  async populate() {
    for (let contestant of CONTESTANTS) {
      const found = await this.constestantsRepository.findOne({countryCode: contestant.countryCode});
      if (!found) {
        const newContestant = this.constestantsRepository.create();
        newContestant.songTitle = contestant.songTitle;
        newContestant.singer = contestant.singer;
        newContestant.countryCode = contestant.countryCode;
        newContestant.countryName = contestant.countryName;
        newContestant.votes = [];
        newContestant.eliminated = false;
        this.constestantsRepository.save(newContestant);
      }
    }
  }

  private contestantsToGetDto(contestants: Contestant[]): GetContestantDto[] {
    return contestants.map((c) => new GetContestantDto(c)).sort((c1, c2) => c1.votes > c2.votes ? -1 : 1);
  }

}
