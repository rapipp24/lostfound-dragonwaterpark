import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    if (email === 'admin@gmail.com' && password === '123456') {
      return {
        success: true,
        token: 'backend-dummy-token',
      };
    }

    return {
      success: false,
      message: 'Email atau password salah',
    };
  }
}