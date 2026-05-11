import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Data ini didapat dari JwtStrategy tadi
    // Jika role-nya adalah 'admin', maka boleh lewat
    if (user && user.role === 'admin') {
      return true;
    }

    // jika bukan admin = error 403 forbidden
    throw new ForbiddenException(
      'Akses ditolak! Fitur ini khusus untuk Admin. ',
    );
  }
}
