import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { UserService } from '../user/user.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Vote } from './entities/vote.entity';

@Injectable()
export class VoteService {

  constructor(
    private userService: UserService,
    private configService: ConfigService,
    @InjectRepository(Vote)
    private votesRepository: Repository<Vote>
  ) {}

  async create(createVoteDto: CreateVoteDto) {
    const config = await this.configService.getConfig();
    const user = await this.userService.findOneById(createVoteDto.userId);
    if (config.votesOpen) {
      const points = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];
      
      await this.votesRepository.delete({
        user
      })

      const toInsert: Vote[] = await Promise.all(createVoteDto.votes.map(async (contestant, i) => {
        const vote = new Vote();
        vote.points = points[i];
        vote.user = user;
        vote.contestant = contestant;
        return vote;
      }));

      return this.votesRepository.insert(toInsert);
    }
    return user.votes;
  }

  findAll() {
    return this.votesRepository.createQueryBuilder()
      .groupBy('contestant')
      .getCount();
  }

  update(id: number, updateVoteDto: UpdateVoteDto) {
    return `This action updates a #${id} vote`;
  }


}
