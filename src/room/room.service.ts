import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContestantService } from '../contestant/contestant.service';
import { UserService } from '../user/user.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetRoomDto } from './dto/get-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {

  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    private userService: UserService,
    private contestantService: ContestantService) {}

  async create(createRoomDto: CreateRoomDto) {
    const user = await this.userService.findOneById(createRoomDto.userId);
    const room = this.roomRepository.create();
    room.name = createRoomDto.name;
    room.users = [user];
    return this.roomRepository.save(room);
  }

  async findByUserId(userId: string) {
    const rooms = await this.roomRepository.find();
    const user = await this.userService.findOneById(userId);
    return rooms.filter(r => r.users.find(u => u.id === userId));
  }

  async findOne(id: string, userId: string) {
    const roomEntity = await this.roomRepository.findOne({id});
    if (!roomEntity.users.find(u => u.id === userId)) {
      const user = await this.userService.findOneById(userId);
      if (user) {
        roomEntity.users.push(user);
      }
      return this.roomToGetRoomDto(await this.roomRepository.save(roomEntity));
    }
    return this.roomToGetRoomDto(roomEntity);
  }

  async joinRoom(id: string, userId: string) {
    const room = await this.roomRepository.findOne(id);
    const user = await this.userService.findOneById(userId);
    if (!room.users.includes(user)) {
      room.users.push(user);
    }
    await this.roomRepository.save(room);
    return room;
  }

  private async roomToGetRoomDto(room: Room) {
    const contestants = await this.contestantService.findAll();
    return new GetRoomDto(room, contestants);
  }
}
