import { Injectable, ConflictException } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: RegisterDto) {
    // Cek apakah email sudah terdaftar
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('Email sudah terdaftar');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: hashedPassword,
        role: 'user',
      },
    });
    delete (user as any).password;
    return user;
  }

  async CreateAdmin(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: hashedPassword,
        role: 'admin', // role defaultnya admin
      },
    });
    delete (user as any).password;
    return user;
  }

  async GetAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // 1. Update hash refresh token di database (atau menghapusnya jika null)
  async updateRefreshToken(userId: number, refreshToken: string | null) {
    let hashedToken: string | null = null;
    
    if (refreshToken) {
      hashedToken = await bcrypt.hash(refreshToken, 10);
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedToken },
    });
  }

  // 2. Bandingkan refresh token plain text vs hash yang disimpan di DB
  async compareRefreshToken(userId: number, refreshToken: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.refreshToken) {
      return false;
    }

    return bcrypt.compare(refreshToken, user.refreshToken);
  }
}
