import { Controller, Get } from '@nestjs/common';
import { ContestantService } from './contestant.service';

@Controller('contestant')
export class ContestantController {
  constructor(private readonly contestantService: ContestantService) {}

  @Get()
  findAll() {
    return this.contestantService.findAll();
  }

}
