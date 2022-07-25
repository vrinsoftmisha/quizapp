import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private readonly users: typeof Users) {}

  async createUser(userData) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(userData.password, salt);

      const userPlan = {
        userName: userData.userName,
        email: userData.email,
        userAge: userData.userAge,
        password: hash,
      };
      console.log('userData', userPlan);
      return await this.users.create(userPlan);
    } catch (error) {}
  }

  loginValidation(email, password) {
    let error;
    if (!email) {
      error = 'Email is Required';
    }
    if (!password) {
      error = 'Password is Required';
    }
    if (error) {
      return new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

  async loginUser(userData) {
    const error = this.loginValidation(userData.email, userData.password);
    if (error !== true) {
      console.error('error', error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    const user = await this.users.findOne({ where: { email: userData.email } });
    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.UNAUTHORIZED);
    }
    const matchPassword = bcrypt.compareSync(userData.password, user.password);
    if (!matchPassword) {
      throw new HttpException('PASSWORD_IS_INCORRECT', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
