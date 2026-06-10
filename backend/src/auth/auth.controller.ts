import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtRefreshGuard } from './jwt-refresh.guard';
import { Roles } from './roles.decorator';
import { JwtPayload } from './jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('test')
  test() {
    return 'Auth Jalan';
  }

  @Get('users')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getUsers() {
    return this.authService.getUsers();
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('create-admin')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  createAdmin(@Body() RegisterDto: RegisterDto) {
    return this.authService.CreateAdmin(RegisterDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Request() req: { user: JwtPayload }) {
    return this.authService.logout(req.user.id);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Request() req: { user: JwtPayload }) {
    return this.authService.refresh(
      req.user.id,
      req.user.email,
      req.user.fullName,
      req.user.role,
    );
  }
}
