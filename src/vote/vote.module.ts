import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { Config } from '../config/entities/config.entity';
import { ContestantModule } from '../contestant/contestant.module';
import { Contestant } from '../contestant/entities/contestant.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { Vote } from './entities/vote.entity';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

@Module({
  imports: [
    UserModule,
    ContestantModule,
    ConfigModule,
    TypeOrmModule.forFeature([Vote, User, Contestant, Config])
  ],
  controllers: [VoteController],
  providers: [VoteService]
})
export class VoteModule {}
