import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { Config } from '../config/entities/config.entity';
import { ContestantModule } from '../contestant/contestant.module';
import { Contestant } from '../contestant/entities/contestant.entity';
import { Room } from '../room/entities/room.entity';
import { RoomModule } from '../room/room.module';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { Vote } from '../vote/entities/vote.entity';
import { VoteModule } from '../vote/vote.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'greenroom',
      entities: [Contestant, User, Vote, Room, Config],
      synchronize: true,
    }),
    ContestantModule,
    UserModule,
    VoteModule,
    RoomModule,
    ConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
