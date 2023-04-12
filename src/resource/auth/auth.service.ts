import { sign } from 'jsonwebtoken';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({
      where: { username },
    });
    console.log(user);
    let token;
    if ((await bcrypt.compare(password, user.password)) == true) {
      token = sign({ id: user.id }, 'secret', {
        expiresIn: '1h',
      });
      console.log(token);
      return {
        username: user.username,
        token: token,
      };
    }
    throw new HttpException('USER_NOT_FOUND', 403);
  }

  async register(
    username: string,
    phone: string,
    email: string,
    password: string,
  ) {
    const usernameTaken = await this.userModel.findOne({
      where: { username: username },
    });
    if (usernameTaken) {
      throw new HttpException('Username already taken', HttpStatus.BAD_REQUEST);
    }
    const phoneTaken = await this.userModel.findOne({
      where: { phone: phone },
    });
    if (phoneTaken) {
      throw new HttpException(
        'Phone number already taken',
        HttpStatus.BAD_REQUEST,
      );
    }
    const emailTaken = await this.userModel.findOne({
      where: { email: email },
    });
    if (emailTaken) {
      throw new HttpException('Email already taken', HttpStatus.BAD_REQUEST);
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const id = uuidv4();
    const newUser = this.userModel.create({
      id,
      username,
      phone,
      email,
      password,
    });
    return newUser;
  }

  async getMe(id: string) {
    const response = await this.userModel.findOne({ where: { id: id } });
    return response;
  }
}
