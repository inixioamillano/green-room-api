import { PartialType } from '@nestjs/mapped-types';
import { CreateContestantDto } from './create-contestant.dto';

export class UpdateContestantDto extends PartialType(CreateContestantDto) {}
