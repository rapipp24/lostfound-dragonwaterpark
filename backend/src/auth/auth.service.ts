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

  // buat fungsi pembantu untuk menandatangani access token dan refresh token
  async generateTokens(payload: {
    id: number;
    email: string;
    fullName: string;
    role: string;
  }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m', // Access token berumur pendek (15 Menit)
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET || 'DRAGON_REFRESH_SECRET',
        expiresIn: '7d', // Refresh token berumur panjang (7 Hari)
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
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
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };

    const tokens = await this.generateTokens(payload);

    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      message: 'Login berhasil',
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
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

  // Mengosongkan refresh token di database saat user logout
  async logout(userId: number) {
    await this.userService.updateRefreshToken(userId, null);
    return {
      message: 'Logout berhasil, sesi refresh token telah dihapus',
    };
  }

  // Menghasilkan sepasang token baru jika refresh token valid
  async refresh(userId: number, email: string, fullName: string, role: string) {
    const payload = { id: userId, email, fullName, role };
    const tokens = await this.generateTokens(payload);
    
    // Perbarui hash refresh token baru di database
    await this.userService.updateRefreshToken(userId, tokens.refreshToken);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }
}
