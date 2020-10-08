import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService } from '../admin-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AdminAuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const admin = await this.authService.validateUser(username, password);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}
