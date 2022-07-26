import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

// import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
// import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: any) {
    const user = await this.validateUser(authLoginDto);

    const payload = {
      userId: user.id,
    };

    return {
      userId: user.id,
      access_token: this.jwtService.sign(payload),
    };
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

  async validateUser(authLoginDto: any): Promise<any> {
    const { email, password } = authLoginDto;

    const error = this.loginValidation(email, password);
    if (error !== true) {
      console.error('error', error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'USER_NOT_FOUND',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const matchPassword = bcrypt.compareSync(password, user.password);
    if (!matchPassword) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'PASSWORD_IS_INCORRECT',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
