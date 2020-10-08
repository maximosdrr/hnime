import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.login(username, password);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      accessLevel: user.accessLevel,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUser(user: User): Promise<User> {
    user.accessLevel = 1;
    return this.userService.insert(user);
  }

  async createAdmin(user: User): Promise<User> {
    user.accessLevel = 0;
    return this.userService.insert(user);
  }
}
