import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/create')
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get('/myrooms/:userId')
  find(@Param('userId') userId) {
    return this.roomService.findByUserId(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('userId') userId: string) {
    return await this.roomService.findOne(id, userId);
  }

}
