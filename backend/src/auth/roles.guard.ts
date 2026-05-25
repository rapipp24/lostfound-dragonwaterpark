import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    // ambil peran yang di deklarasikan di dekorator @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    //jika tidak memiliki dekorator @Roles(), semua user yang sudah terautentikasi boleh akses
    if (!requiredRoles) {
      return true;
    }

    // ambil request dan user yang sudah disuntik oleh AuthGuard
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // jika bukan admin = error 403 forbidden
    if (!user) {
      throw new ForbiddenException(
        'Akses ditolak! Sesi pengguna tidak ditemukan. ',
      );
    }

    // cek apakah role user cocok dengan role yang di deklarasikan di dekorator @Roles()
    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException(
        'Akses ditolak! Fitur ini khusus untuk peran tertetu.',
      );
    }
    return true;
  }
}
