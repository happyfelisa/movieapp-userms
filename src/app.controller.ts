import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserDTO } from './user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({cmd: 'new_user'})
  newUser(user: UserDTO) {
  const result = this.appService.newUser(user);
    if(!result) {
        return "User already exists"
    } else {
        return result;
    }
  }

  @MessagePattern({cmd: 'get_user'})
  getUser(username: string) {
    return this.appService.getUserByName(username)
  }

  @MessagePattern({cmd: 'get_users'})
  getUsers() {
    return this.appService.getAllUsers()
  }
}
