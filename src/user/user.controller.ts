import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private configService: ConfigService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    user.votes = user.votes.sort((v1, v2) => v1.points > v2.points ? -1 : 1);
    const votesOpen = (await this.configService.getConfig()).votesOpen;
    return { user, votesOpen }
  }

}
