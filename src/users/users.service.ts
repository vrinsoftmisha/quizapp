import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private readonly users: typeof Users) {}

  async createUser(userData) {
    try {
      const userPlan = {
        userName: userData.userName,
        email: userData.email,
        userAge: userData.userAge,
      };
      console.log('userData', userPlan);
      return await this.users.create(userPlan);
    } catch (error) {}
  }
}
