import {  Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async newUser(user: UserDTO) {
    const newUser = this.userRepository.create();
    newUser.username = user.username;
    newUser.password = await bcrypt.hash(user.password, 10);
    return this.userRepository.save(user);
  }

  async getUserByName(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async getAllUsers() {
    return this.userRepository.find();
  }
}
