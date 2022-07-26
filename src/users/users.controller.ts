import { Body, Controller, Request, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Post('/create')
  async create(@Body() userData): Promise<any> {
    try {
      return this.users.createUser(userData);
    } catch (error) {}
  }
}
