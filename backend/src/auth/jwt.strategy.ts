import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // mengambil token dari header authorizen (Bareer token)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // ini yang harus sama dengan yang ada di AuthModule
    });
  }

  validate(payload: any) {
    return {
      email: payload.email,
      fullName: payload.fullName, // Pastikan N-nya besar sesuai payload di AuthService
      role: payload.role,
    };
  }
}
