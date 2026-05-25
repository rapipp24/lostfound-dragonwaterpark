import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET || 'DRAGON_REFRESH_SECRET',
      passReqToCallback: true, // Mengizinkan akses ke request object
    });
  }

  async validate(req: Request, payload: any) {
    // Ekstrak token mentah dari Header
    const authHeader = req.get('authorization');
    if (!authHeader) {
      throw new UnauthorizedException('Token tidak ditemukan');
    }
    const refreshToken = authHeader.replace('Bearer ', '').trim();

    // Bandingkan dengan hash di database
    const isTokenMatch = await this.usersService.compareRefreshToken(
      payload.id,
      refreshToken,
    );

    if (!isTokenMatch) {
      throw new UnauthorizedException('Sesi refresh token tidak valid atau telah berakhir');
    }

    return {
      id: payload.id,
      email: payload.email,
      fullName: payload.fullName,
      role: payload.role,
    };
  }
}
