import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  findOneById(id: string) {
    return this.usersRepository.findOne({id})
  }

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ){}

  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create();
    user.username = createUserDto.username;
    return this.usersRepository.save(user);
  }

  findOne(id: string) {
    return this.usersRepository.findOne({id});
  }
  
}
