import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContestantController } from './contestant.controller';
import { ContestantService } from './contestant.service';
import { Contestant } from './entities/contestant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contestant]),
  ],
  controllers: [ContestantController],
  providers: [ContestantService],
  exports: [ContestantService]
})
export class ContestantModule {
  constructor(service: ContestantService) {
    service.populate();
  }
}
