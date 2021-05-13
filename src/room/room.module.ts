import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContestantModule } from '../contestant/contestant.module';
import { UserModule } from '../user/user.module';
import { Room } from './entities/room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    UserModule,
    ContestantModule
  ],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService]
})
export class RoomModule {}
