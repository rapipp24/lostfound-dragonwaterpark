import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users: RegisterDto[] = [];

  async createUser(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = {
      ...data,
      password: hashedPassword,
    };

    this.users.push(newUser);
    return newUser;
  }

  GetAllUsers() {
    return this.users.map((user) => {
      const { password, ...result } = user;
      return result;
    });
  }

  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
