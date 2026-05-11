import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    return this.userService.createUser(data);
  }
  async CreateAdmin(data: RegisterDto) {
    return this.userService.CreateAdmin(data);
  }

  async login(data: LoginDto) {
    // Pastikan menggunakan await di sini
    const user = await this.userService.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('User tidak ditemukan');
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Password salah');
    }

    const payload = {
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login berhasil',
      access_token: token,
      user: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getUsers() {
    return this.userService.GetAllUsers();
  }
}
