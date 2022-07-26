import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import * as bcrypt from 'bcryptjs';
import { FindOptions } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private readonly users: typeof Users) {}

  async createUser(userData) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userData.password, salt);

    const whereCondition = {
      email: userData.email,
    };
    const findOneOptions: FindOptions = {
      where: whereCondition,
    };

    const userItem = await this.users.findOne(findOneOptions);
    if (userItem) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'USER_WITH_THIS_EMAIL_ALREADY_EXIST',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const userPlan = {
        email: userData.email,
        userAge: userData.userAge,
        password: hash,
      };
      return await this.users.create(userPlan);
    }
  }

  async findByEmail(email: string) {
    return await this.users.findOne({
      where: {
        email: email,
      },
    });
  }
}
