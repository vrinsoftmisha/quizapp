import { Body, Controller, Request, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Post('/create')
  async create(@Body() userData): Promise<any> {
    return this.users.createUser(userData);
  }

  @Post('/login')
  async login(@Request() req) {
    try {
      return this.users.loginUser(req.body);
    } catch (error) {}
  }
}
