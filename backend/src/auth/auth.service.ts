import { Body, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // buat constuctor
  constructor(
    private userService: UsersService,
    private jwtservice: JwtService,
  ) {}

  register(data: RegisterDto) {
    return this.userService.createUser(data);
  }

  async login(data: LoginDto) {
    const user = this.userService.findByEmail(data.email);

    if (!user) {
      return 'User tidak ditemukan';
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);

    if (!isPasswordMatch) {
      return 'Password salah';
    }

    const payload = {
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login berhasil',
      access_token: token,
    };
  }

  getUsers() {
    return this.userService.GetAllUsers();
  }
}
